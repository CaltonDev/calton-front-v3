import { useTranslation } from 'react-i18next'
import styles from './ListingCreatePostPopper.module.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Select } from 'antd'
import { showToast } from '../../store/toast/errorToastSlice'
import LoaderChart from '../../components/CardInsights/LoaderChart/LoaderChart'
import {
    isWhiteSpaceString,
    manageLocalToastWSAndReload,
} from '../../helpers/helpers'
import {
    StyledMenu,
    StyledSelect,
} from '../../components/ListingEdit/AdditionalCategorySelect/AdditionalCategorySelectStyled'
import PostEvent from '../../components/ListingCreatePost/PostEvent/PostEvent'
import PostOffer from '../../components/ListingCreatePost/PostOffer/PostOffer'
import PostUpdate from '../../components/ListingCreatePost/PostUpdate/PostUpdate'
import ListingService from '../../services/ListingService'
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete'
import { setUploadPhotos } from '../../store/photos/photosSlice'
import PostPreview from '../../components/ListingCreatePost/PostPreview/PostPreview'
import { postTypes } from '../../constants/CustomConstants'
import RctBlockPost from '../../components/RctBlockPost/RctBlockPost'
import RctBlockPostPreview from '../../components/RctBlockPost/RctBlockPostPreview'
import { Formik, FormikProps } from 'formik'
import { Form } from 'formik-antd'
import { ListingCreatePostPopperProps } from './ListingCreatePostPopper.interface'
import { RootState } from '../../store/store'

function ListingCreatePostPopper({
    postData,
    fullWidth = false,
    reloadData,
    setShowPopper,
}: ListingCreatePostPopperProps) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const [customAutocompleteSelected, setCustomAutocompleteSelected] =
        useState<any[]>([])
    // handle multiple photos + delete single photo, check bug on change
    const [post, setPost] = useState(postData?.post ? postData?.post : {})
    const [dataReady, setDataReady] = useState(true)
    const photos = useSelector(
        (state: RootState) => state?.UploadPhotos?.photos
    )

    const allLocations = useSelector(
        (state: RootState) => state.SelectableFilters.data.allLocations
    )

    const socketMessage = useSelector(
        (state: RootState) => state?.Socket?.message
    )
    const consumeLocallySocket = useSelector(
        (state: RootState) => state?.Socket?.consumeLocally
    )

    const [openShowMore, setOpenShowMore] = useState(false)

    useEffect(() => {
        let currMsg: any = {}
        currMsg = socketMessage[0]
        try {
            if (currMsg?.type === 'updateBulk') {
                manageLocalToastWSAndReload(
                    currMsg,
                    () => reloadData(),
                    dispatch,
                    t
                )
            }
        } catch (err) {}
    }, [consumeLocallySocket])

    useEffect(() => {
        dispatch(setUploadPhotos([]))
    }, [])

    const [imagesNotUploaded, setImagesNotUploaded] = useState([])

    const [postType, setPostType] = useState(
        post?.topicType
            ? postTypes?.find((obj: any) => obj?.value === post?.topicType)
            : postTypes[0]
    )

    const handleSetPostType = (
        value: string,
        formikProps: FormikProps<any>
    ) => {
        formikProps.resetForm()
        setPostType(JSON.parse(value))
        setDataReady(false)
    }

    useEffect(() => {
        if (!dataReady) {
            setPost({})
            setTimeout(() => setDataReady(true), 500)
        }
    }, [dataReady])

    const handlePublishPost = async (actions: any) => {
        setImagesNotUploaded([])
        try {
            if (photos?.length > 0)
                dispatch(
                    showToast({
                        type: 0,
                        text: t('Caricamento immagini in corso...'),
                    })
                )
            const mediaUrlList = []
            const notUploadedImages: any = []
            for (const photo of photos) {
                const body = new FormData()
                body.append('input_name', photo?.file)
                try {
                    const result =
                        await ListingService.getMediaUrlLocalPost(body)
                    mediaUrlList.push(result?.data?.media_url)
                } catch (e) {
                    dispatch(
                        showToast({
                            type: 2,
                            text: t('Errore caricamento immagini'),
                        })
                    )
                    notUploadedImages.push(photo?.uuid)
                }
            }

            setImagesNotUploaded(notUploadedImages)

            post.topicType = postType?.value

            const mediaList: any = []
            mediaUrlList?.forEach((media) => {
                mediaList.push({
                    mediaFormat: 'PHOTO',
                    sourceUrl: media,
                    description: post?.summary,
                })
            })

            post.media = mediaList

            const tmpPost = JSON.parse(JSON.stringify(post))

            if (
                tmpPost?.callToAction?.actionType === 'ACTION_TYPE_UNSPECIFIED'
            ) {
                delete tmpPost.callToAction
            }

            const postBody = {
                listingsName: [
                    customAutocompleteSelected &&
                        customAutocompleteSelected[0]?.idAccountLocationGbp,
                ],
                localPost: tmpPost,
            }

            if (notUploadedImages?.length === 0) {
                const response = await ListingService.createLocalPost(postBody)

                if (response.data?.idTask) {
                    const message =
                        t('Caricati ') +
                        response.data?.done +
                        ' / ' +
                        response.data?.tot +
                        ' ' +
                        t('Post')
                    dispatch(
                        showToast({
                            type: 4,
                            idTask: response.data?.idTask,
                            pendingText: message,
                            position: 'bottom-right',
                            autoClose: 900000,
                        })
                    )
                }
                actions.resetForm()
                setShowPopper(false)
            }
        } catch (e) {
            console.log('E: ', e)
            dispatch(showToast({ type: 2, text: t('Impossibile creare post') }))
        }
    }

    const handleChangeLocations = (data: any) => {
        setCustomAutocompleteSelected(data)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    function validatePostFields(values: string, fieldType: string) {
        if (
            (fieldType === 'postEventTitle' ||
                fieldType === 'postDescription' ||
                fieldType === 'postBtnLink') &&
            isWhiteSpaceString(values)
        ) {
            return t('Obbligatorio')
        }

        if (fieldType === 'postDescription' && values?.length > 1500) {
            return t('Hai inserito troppi caratteri')
        }

        if (fieldType === 'postEventMedia' && values?.length === 0) {
            return t('Obbligatorio')
        }

        if (
            postType?.value === 'STANDARD' &&
            (fieldType === 'postDescription' || fieldType === 'postBtnLink') &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }

        if (
            postType?.value === 'EVENT' &&
            fieldType === 'postDescription' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }

        if (
            (postType?.value === 'OFFER' || postType?.value === 'EVENT') &&
            fieldType === 'postEventTitle' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }
        if (
            (postType?.value === 'OFFER' || postType?.value === 'EVENT') &&
            fieldType === 'postEventStartDate' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }
        if (
            (postType?.value === 'OFFER' || postType?.value === 'EVENT') &&
            fieldType === 'postEventEndDate' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }
        if (
            (postType?.value === 'OFFER' || postType?.value === 'EVENT') &&
            fieldType === 'postEventStartTime' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }
        if (
            (postType?.value === 'OFFER' || postType?.value === 'EVENT') &&
            fieldType === 'postEventEndTime' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }
        if (
            (postType?.value === 'STANDARD' || postType?.value === 'EVENT') &&
            post?.callToAction?.actionType !== 'ACTION_TYPE_UNSPECIFIED' &&
            fieldType === 'postBtnLink' &&
            values === undefined
        ) {
            return t('Obbligatorio')
        }

        return undefined
    }

    return (
        <Formik
            initialValues={{
                postDescription: post?.summary,
                postEventTitle: post?.event?.title,
                postEventStartDate: post?.event?.schedule?.startDate,
                postEventEndDate: post?.event?.schedule?.endDate,
                postEventStartTime: post?.event?.schedule?.startTime,
                postEventEndTime: post?.event?.schedule?.endTime,
                postBtnLink: post?.callToAction?.url,
                postEventMedia: post?.media ? post?.media : [],
            }}
            onSubmit={async (values, actions) => {
                await handlePublishPost(actions)
                actions.setSubmitting(false)
                //actions.resetForm();
            }}
        >
            {(formikProps) => {
                return (
                    <Form onKeyDown={handleKeyDown}>
                        <div className={styles.editInfoContainer}>
                            <div className={styles.containerInputPopper}>
                                <span className={styles.label}>
                                    {t('Tipologia post')}
                                </span>
                                <StyledSelect
                                    filterOption={false}
                                    style={
                                        fullWidth
                                            ? { width: '30%' }
                                            : { width: '100%' }
                                    }
                                    value={t(
                                        postType?.displayName
                                            ? postTypes.displayName
                                            : ''
                                    )}
                                    onChange={(value: string) =>
                                        handleSetPostType(value, formikProps)
                                    }
                                    dropdownRender={(menu) => (
                                        <StyledMenu>{menu}</StyledMenu>
                                    )}
                                >
                                    {postTypes?.map((type) => (
                                        <Select.Option
                                            key={type.displayName}
                                            value={JSON.stringify(type)}
                                            className={styles.menuItem}
                                        >
                                            {t(type.displayName)}
                                        </Select.Option>
                                    ))}
                                </StyledSelect>
                            </div>
                            <div
                                className={styles.containerInputPopper}
                                style={
                                    fullWidth
                                        ? {
                                              marginTop: '1rem',
                                              marginBottom: '1rem',
                                          }
                                        : { marginTop: '1rem' }
                                }
                            >
                                <span className={styles.label}>
                                    {t('Location')}
                                </span>
                                <div
                                    style={
                                        fullWidth
                                            ? { width: '30%' }
                                            : { width: '100%' }
                                    }
                                >
                                    <CustomAutocomplete
                                        label={
                                            customAutocompleteSelected &&
                                            customAutocompleteSelected?.length ===
                                                0
                                                ? t('Tutti i luoghi')
                                                : customAutocompleteSelected?.length +
                                                  t('luoghi')
                                        }
                                        placeholder={t(
                                            'Seleziona la location da cui prendere le informazioni'
                                        )}
                                        title={t(
                                            'Seleziona la tua location di base'
                                        )}
                                        labels={allLocations}
                                        defaultValue={
                                            customAutocompleteSelected
                                        }
                                        primary={'title'}
                                        secondary={'formatted_address'}
                                        type={'locations'}
                                        multiple={true}
                                        handleChange={handleChangeLocations}
                                        isThick={true}
                                    />
                                </div>
                            </div>
                            {fullWidth ? (
                                <div>
                                    <div className={'row myMargin'}>
                                        <div
                                            className={'col-md-7'}
                                            style={{ paddingRight: 50 }}
                                        >
                                            <RctBlockPost
                                                title={t(
                                                    postTypes?.find(
                                                        (obj) =>
                                                            obj?.value ===
                                                            postType?.value
                                                    )?.title
                                                )}
                                                subtitle={t(
                                                    postTypes?.find(
                                                        (obj) =>
                                                            obj?.value ===
                                                            postType?.value
                                                    )?.subtitle
                                                )}
                                            >
                                                {postType.value === 'OFFER' ? (
                                                    <PostOffer
                                                        validatePostFields={
                                                            validatePostFields
                                                        }
                                                        formikProps={
                                                            formikProps
                                                        }
                                                        post={post}
                                                        setPost={setPost}
                                                        showMore={openShowMore}
                                                        setShowMore={
                                                            setOpenShowMore
                                                        }
                                                    />
                                                ) : postType.value ===
                                                  'STANDARD' ? (
                                                    <PostUpdate
                                                        validatePostFields={
                                                            validatePostFields
                                                        }
                                                        formikProps={
                                                            formikProps
                                                        }
                                                        imagesWithError={
                                                            imagesNotUploaded
                                                        }
                                                        post={post}
                                                        setPost={setPost}
                                                    />
                                                ) : (
                                                    postType.value ===
                                                        'EVENT' && (
                                                        <PostEvent
                                                            validatePostFields={
                                                                validatePostFields
                                                            }
                                                            formikProps={
                                                                formikProps
                                                            }
                                                            post={post}
                                                            setPost={setPost}
                                                        />
                                                    )
                                                )}
                                            </RctBlockPost>
                                        </div>
                                        <div className={'col-md-5'}>
                                            <RctBlockPostPreview
                                                customStyle={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                title={t('Anteprima')}
                                            >
                                                <PostPreview
                                                    post={post}
                                                    type={postType.value}
                                                    isCard={false}
                                                    showMore={openShowMore}
                                                    isFromGrid={false}
                                                />
                                            </RctBlockPostPreview>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <div
                                            className={
                                                styles.editOptionContainer
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.editOptionContainer
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.accordionCollapse
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.accordionContent
                                                        }
                                                    >
                                                        {postType.value ===
                                                        'OFFER' ? (
                                                            <PostOffer
                                                                post={post}
                                                                setPost={
                                                                    setPost
                                                                }
                                                                validatePostFields={
                                                                    validatePostFields
                                                                }
                                                                formikProps={
                                                                    formikProps
                                                                }
                                                                isFromPopper={
                                                                    !fullWidth
                                                                }
                                                                showMore={
                                                                    openShowMore
                                                                }
                                                                setShowMore={
                                                                    setOpenShowMore
                                                                }
                                                            />
                                                        ) : postType.value ===
                                                          'STANDARD' ? (
                                                            <PostUpdate
                                                                validatePostFields={
                                                                    validatePostFields
                                                                }
                                                                formikProps={
                                                                    formikProps
                                                                }
                                                                imagesWithError={
                                                                    imagesNotUploaded
                                                                }
                                                                post={post}
                                                                setPost={
                                                                    setPost
                                                                }
                                                                isFromPopper={
                                                                    !fullWidth
                                                                }
                                                            />
                                                        ) : (
                                                            postType.value ===
                                                                'EVENT' && (
                                                                <PostEvent
                                                                    validatePostFields={
                                                                        validatePostFields
                                                                    }
                                                                    formikProps={
                                                                        formikProps
                                                                    }
                                                                    post={post}
                                                                    setPost={
                                                                        setPost
                                                                    }
                                                                    isFromPopper={
                                                                        !fullWidth
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div></div>
                        </div>
                        <div className={styles.popperSave}>
                            <Button
                                loading={formikProps?.isSubmitting}
                                type="button"
                                htmlType={'submit'}
                                className={`text-white pt-8 pb-8 ${styles.btnSave}`}
                            >
                                {t('Pubblica')}
                            </Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ListingCreatePostPopper

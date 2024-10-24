import styles from './PostUpdate.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import UploadPhotoModal from '../../Modals/UploadPhotoModal/UploadPhotoModal'
import { setIsSingle } from '../../../store/photos/photosSlice'
import PostCarousel from '../PostCarousel/PostCarousel'
import PostSelectBtnType from '../PostSelectBtnType/PostSelectBtnType'
import { Field } from 'formik'
import '../DatePicker.css'
import { PostUpdateProps } from './PostUpdate.interface'
import FormInputWrapper from '../../FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import Textarea from '../../Textarea/Textarea'

function PostUpdate({
    validatePostFields,
    formikProps,
    post,
    setPost,
    imagesWithError,
    isFromPopper = false,
}: PostUpdateProps) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)

    const [imgFromApiObj, setImgFromApiObj] = useState(
        post?.media?.length > 0
            ? [
                  {
                      data_url: post?.media[0]?.googleUrl,
                  },
              ]
            : []
    )

    const handleAddPhoto = () => {
        dispatch(setIsSingle(true))
        setOpenModal(true)
    }

    const handleSetDescription = (value: string) => {
        if (value?.length <= 1500) {
            const tmpPost = JSON.parse(JSON.stringify(post))
            tmpPost.summary = value
            if (tmpPost?.media?.length > 0) {
                tmpPost?.media?.forEach((media: any) => {
                    media.description = value
                })
            } else {
                tmpPost.media = [
                    {
                        description: value,
                    },
                ]
            }
            setPost(tmpPost)
        }
        formikProps?.setFieldValue('postDescription', value)
        formikProps?.setFieldValue('postEventMedia', [{ media: 'description' }])
    }

    const handleSetBtnLink = (value: string) => {
        const tmpPost = JSON.parse(JSON.stringify(post))
        if (tmpPost.callToAction) {
            tmpPost.callToAction.url = value
        } else {
            tmpPost.callToAction = {
                actionType: '',
                url: value,
            }
        }

        formikProps?.setFieldValue('postBtnLink', value)

        setPost(tmpPost)
    }

    const handleValidateFormikImgData = (data: string) => {
        formikProps?.setFieldValue('postEventMedia', data)

        if (data?.length > 0)
            formikProps?.setFieldValue('postDescription', 'description')
    }

    return (
        <div
            className={
                isFromPopper
                    ? styles.containerEditInfo
                    : styles.containerEditInfoPage
            }
        >
            <UploadPhotoModal
                openUploadPhoto={openModal}
                setOpenUploadPhoto={setOpenModal}
                fromListingPhotos={false}
            />
            <div
                style={
                    isFromPopper
                        ? {
                              display: 'flex',
                              marginTop: '1rem',
                              flexDirection: 'column',
                          }
                        : { display: 'flex', marginTop: 30 }
                }
            >
                <div
                    className={styles.containerInputLeftItem}
                    style={isFromPopper ? { width: '100%' } : {}}
                >
                    <span className={styles.label}>
                        {t('Aggiungi descrizione')}
                    </span>
                    <Field
                        fullWidth={true}
                        name="postDescription"
                        component={
                            <Textarea
                                value={
                                    post?.media?.length > 0
                                        ? post?.media[0]?.description
                                        : ''
                                }
                                onChange={(e: any) =>
                                    handleSetDescription(e.target.value)
                                }
                                rows={isFromPopper ? 2 : 4}
                            />
                        }
                        placeholder={t('Email Name')}
                        formikProps={formikProps}
                        required={true}
                        validate={(value: any) =>
                            validatePostFields(value, 'postDescription')
                        }
                        style={!isFromPopper ? { marginBottom: '3rem' } : {}}
                        key={'postDescription'}
                    />
                    <span className={styles.labelCharCounter}>
                        {post?.summary
                            ? post?.summary?.length + ' / 1500'
                            : '0 / 1500'}
                    </span>
                </div>
                {!isFromPopper && (
                    <div className={styles.containerInputRightItem}>
                        <span className={styles.label}>
                            {t('Aggiungi foto')}
                        </span>
                        <div style={{ display: 'flex' }}>
                            <Field
                                name="postEventMedia"
                                required={true}
                                validate={(value: any) =>
                                    validatePostFields(value, 'postEventMedia')
                                }
                                key={'postEventMedia'}
                                component={
                                    <PostCarousel
                                        handleFormikValidation={
                                            handleValidateFormikImgData
                                        }
                                        imagesWithError={imagesWithError}
                                        imgFromApi={imgFromApiObj}
                                        isFromPopper={isFromPopper}
                                        handleAddPhoto={handleAddPhoto}
                                    />
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <div style={isFromPopper ? { width: '100%' } : {}}>
                    <span className={styles.label}>
                        {t('Aggiungi pulsante')}
                    </span>
                    <div
                        style={{ width: '92%', marginTop: 15, display: 'flex' }}
                    >
                        <PostSelectBtnType post={post} setPost={setPost} />
                        {post?.callToAction?.actionType !==
                            'ACTION_TYPE_UNSPECIFIED' && (
                            <Field
                                name="postBtnLink"
                                required={true}
                                component={FormInputWrapper}
                                validate={(value: any) =>
                                    validatePostFields(value, 'postBtnLink')
                                }
                                style={
                                    !isFromPopper
                                        ? {
                                              width: '100%',
                                              marginBottom: '3rem',
                                          }
                                        : {}
                                }
                                key={'postBtnLink'}
                                type={'text'}
                                className={
                                    isFromPopper
                                        ? styles.inputPopper
                                        : styles.input
                                }
                                value={post?.callToAction?.url}
                                placeholder={t('Link per il pulsante')}
                                onChange={(e: any) =>
                                    handleSetBtnLink(e.target.value)
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
            {isFromPopper && (
                <div
                    className={
                        isFromPopper
                            ? styles.containerPhotoPopper
                            : styles.containerInputPopper
                    }
                    style={isFromPopper ? { width: '100%' } : {}}
                >
                    <span className={styles.label}>{t('Aggiungi foto')}</span>
                    <div style={{ display: 'flex' }}>
                        <Field
                            name="postEventMedia"
                            required={true}
                            validate={(value: any) =>
                                validatePostFields(value, 'postEventMedia')
                            }
                            key={'postEventMedia'}
                            component={
                                <PostCarousel
                                    handleFormikValidation={
                                        handleValidateFormikImgData
                                    }
                                    imagesWithError={imagesWithError}
                                    imgFromApi={imgFromApiObj}
                                    isFromPopper={isFromPopper}
                                    handleAddPhoto={handleAddPhoto}
                                />
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostUpdate

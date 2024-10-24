import styles from './UploadPhotoModal.module.scss'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import ImageUploading from 'react-images-uploading'
import { CloseOutlined } from '@ant-design/icons'
import './Modal.css'
import closeIcon from '../../../assets/img/closeWhite.svg'
import { v5 as uuidv5 } from 'uuid'
import AppConfig from '../../../constants/AppConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSingle, setUploadPhotos } from '../../../store/photos/photosSlice'
import { PHOTO_CATEGORIES } from '../../../constants/StringConstant'
import AntModal from '../../ConfirmClosedHoursModal/AntModal'
import { UploadPhotoModalProps } from './UploadPhotoModal.interface'
import { RootState } from '../../../store/store'

function UploadPhotoModal({
    openUploadPhoto,
    setOpenUploadPhoto,
    fromListingPhotos = false,
    loaderUploadPhoto,
    saveUploadPhoto,
    primaryCategory,
}: UploadPhotoModalProps) {
    const { t, i18n } = useTranslation()
    const [images, setImages] = useState<any[]>([])
    const isSingle = useSelector(
        (state: RootState) => state?.UploadPhotos?.isSingle
    )
    const photos = useSelector(
        (state: RootState) => state?.UploadPhotos?.photos
    )
    const [photoCategory, setPhotoCategory] = useState(
        PHOTO_CATEGORIES.find((pc: any) => pc?.name === primaryCategory?.name)
    )
    const maxNumber = isSingle ? 1 : 100
    const [uploadWithLink, setUploadWithLink] = useState(false)
    const [selectedLinks, setSelectedLinks] = useState([
        {
            data_url: '',
            isPhoto: false,
        },
    ])

    const dispatch = useDispatch()

    useEffect(() => {
        setPhotoCategory(primaryCategory)
    }, [primaryCategory])

    const handleCloseDeleteInternal = () => {
        dispatch(setIsSingle(null))
        dispatch(setUploadPhotos([]))
        setOpenUploadPhoto(false)
        setImages([])
        setSelectedLinks([
            {
                data_url: '',
                isPhoto: false,
            },
        ])
        setUploadWithLink(false)
    }

    const onChange = (imageList: any[]) => {
        // data for submit
        imageList.forEach((image: any) => {
            image.isPhoto = true
            image.uuid = uuidv5(
                image?.file?.name + new Date().toString(),
                AppConfig.namespace
            )
        })
        setImages(imageList)
    }

    const handleSaveNewPhotos = () => {
        let tmpPhotosList = photos?.length
            ? JSON.parse(JSON.stringify(photos))
            : []

        if (images?.length > 0) {
            if (isSingle) {
                tmpPhotosList = images
            } else {
                images?.forEach((image) => {
                    tmpPhotosList.push(image)
                })
            }
        }

        if (selectedLinks?.length > 0 && selectedLinks[0]?.data_url !== '') {
            if (isSingle) {
                selectedLinks[0].isPhoto = false
                tmpPhotosList = selectedLinks
            } else {
                selectedLinks?.forEach((image) => {
                    image.isPhoto = false
                    tmpPhotosList.push(image)
                })
            }
        }

        dispatch(setUploadPhotos(tmpPhotosList))

        setSelectedLinks([
            {
                data_url: '',
                isPhoto: false,
            },
        ])
        setImages([])
        setOpenUploadPhoto(false)
        setUploadWithLink(false)
    }

    const handleUploadWithLink = (link: any, idx: number) => {
        const currentLinksArray: any = [...selectedLinks]
        currentLinksArray[idx] = {
            data_url: link,
            uuid: uuidv5(
                link?.file?.name + new Date().toString(),
                AppConfig.namespace
            ),
        }
        setSelectedLinks(currentLinksArray)
    }

    const handleAddAdditionalLink = () => {
        setSelectedLinks((links: any) => [...links, {}])
    }

    const handleSavePhotosFromFunction = () => {
        if (saveUploadPhoto) saveUploadPhoto(images)
        handleCloseDeleteInternal()
    }
    return (
        <AntModal
            open={openUploadPhoto}
            onCancel={() => handleCloseDeleteInternal()}
            ariaLabelledby="alert-dialog-title"
            ariaDescribedby="alert-dialog-description"
            centered={true}
            closeIcon={<CloseOutlined style={{ display: 'flex' }} />}
            width={'55%'}
            footer={[]}
        >
            <span
                id="alert-dialog-title"
                style={{
                    fontWeight: 'bold',
                    fontSize: '25px',
                    padding: '20px 20px',
                    display: 'flex',
                }}
            >
                {t('Aggiungi foto')}
            </span>
            {fromListingPhotos && (
                <span className={styles.categName}>
                    {t('Categoria') + ': ' + photoCategory?.displayName}
                </span>
            )}
            <div style={{ marginBottom: 30, marginTop: 10 }}>
                <div id="alert-dialog-description">
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        resolutionType={'ratio'}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div
                                className={
                                    imageList.length === 0
                                        ? styles.uploadImageWrapper
                                        : styles.uploadImageWrapper
                                }
                            >
                                {imageList.length > 0 ? (
                                    <div className={styles.photoContainer}>
                                        {imageList.map(
                                            (image: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="image-item"
                                                >
                                                    <div
                                                        className={styles.card}
                                                    >
                                                        <div
                                                            className={
                                                                styles.imageOverlay
                                                            }
                                                        ></div>
                                                        <img
                                                            src={
                                                                image[
                                                                    'data_url'
                                                                ]
                                                            }
                                                            alt=""
                                                            className={
                                                                styles.imgCard
                                                            }
                                                            width={'50px'}
                                                            height={'50px'}
                                                        />
                                                        <img
                                                            alt={'Close'}
                                                            src={closeIcon}
                                                            className={
                                                                styles.deleteImg
                                                            }
                                                            onClick={() =>
                                                                onImageRemove(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : !uploadWithLink ? (
                                    <p
                                        className={styles.rectangle}
                                        {...dragProps}
                                    >
                                        <div
                                            className={styles.rectangleContent}
                                        >
                                            <span className={styles.firstSpan}>
                                                {t('Trascina le foto qui')}
                                            </span>
                                            <span className={styles.secondSpan}>
                                                {t('OPPURE')}
                                            </span>
                                            <div
                                                className={
                                                    styles.buttonsContainer
                                                }
                                            >
                                                <Button
                                                    className={
                                                        styles.selectPhoto
                                                    }
                                                    type="text"
                                                    shape="round"
                                                    onClick={onImageUpload}
                                                >
                                                    {t('Seleziona foto')}
                                                </Button>
                                                <Button
                                                    className={
                                                        styles.selectLink
                                                    }
                                                    type="text"
                                                    shape="round"
                                                    onClick={() =>
                                                        setUploadWithLink(
                                                            !uploadWithLink
                                                        )
                                                    }
                                                >
                                                    {t('Tramite link')}
                                                </Button>
                                            </div>
                                        </div>
                                    </p>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            marginBottom: 50,
                                        }}
                                    >
                                        <span
                                            id="alert-dialog-title"
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '25px',
                                                padding: '20px 20px',
                                            }}
                                        >
                                            {t('Inserisci link')}
                                        </span>
                                        {selectedLinks?.map((value, idx) => (
                                            <Input
                                                key={idx}
                                                className={styles.linkInput}
                                                type={'text'}
                                                placeholder={'https://'}
                                                onChange={(event) =>
                                                    handleUploadWithLink(
                                                        event.target.value,
                                                        idx
                                                    )
                                                }
                                            />
                                        ))}
                                        {!isSingle && (
                                            <span
                                                onClick={
                                                    handleAddAdditionalLink
                                                }
                                                className={styles.addGroup}
                                            >
                                                + {t('Aggiungi un altro link')}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </ImageUploading>
                </div>
            </div>
            <div className={styles.dialActions}>
                <div style={{ float: 'right' }}>
                    <span className="cancelButtonColor">
                        <a
                            onClick={() => handleCloseDeleteInternal()}
                            className={`mr-10 ${styles.cancelButton}`}
                        >
                            {t('Annulla')}
                        </a>
                    </span>
                    <Button
                        color="primary"
                        loading={loaderUploadPhoto}
                        onClick={
                            !fromListingPhotos
                                ? handleSaveNewPhotos
                                : handleSavePhotosFromFunction
                        }
                        className={`text-white pt-8 pb-8 ${styles.saveButton}`}
                    >
                        {t('Salva')}
                    </Button>
                </div>
            </div>
        </AntModal>
    )
}

export default UploadPhotoModal

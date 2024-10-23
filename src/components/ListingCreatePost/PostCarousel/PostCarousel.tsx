import styles from './PostCarousel.module.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadPhotos } from '../../../store/photos/photosSlice'
import RibbonPostType from '../../RibbonPostType/RibbonPostType'
import photoBlue from '../../../assets/img/photoBlue.svg'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import { PostCarouselProps } from './PostCarousel.interface'
import { RootState } from '../../../store/store'

function PostCarousel({
    handleFormikValidation,
    handleAddPhoto,
    imagesWithError,
    imgFromApi,
    isPreview = false,
    isFromPopper = false,
    label = '',
    isFromGrid = false,
}: PostCarouselProps) {
    const dispatch = useDispatch()

    const photos = useSelector(
        (state: RootState) => state?.UploadPhotos?.photos
    )

    const [displayablePhotos, setDisplayablePhotos] = useState(
        imgFromApi?.length > 0 && imgFromApi[0]?.data_url !== undefined
            ? imgFromApi
            : photos
    )

    const validateFormik = (obj: any) => {
        if (handleFormikValidation) handleFormikValidation(obj)
    }

    useEffect(() => {
        if (imgFromApi?.length > 0 && imgFromApi[0]?.data_url !== undefined) {
            setDisplayablePhotos(imgFromApi)
            validateFormik(imgFromApi)
        } else {
            setDisplayablePhotos([])
            validateFormik([])
        }
    }, [imgFromApi])

    useEffect(() => {
        if (photos?.length > 0) {
            setDisplayablePhotos(photos)
            validateFormik(photos)
        } else {
            setDisplayablePhotos([])
            validateFormik([])
        }
    }, [photos])

    const onImageRemove = (index: number) => {
        const tmpPhotos = [...photos]
        tmpPhotos.splice(index, 1)
        dispatch(setUploadPhotos(tmpPhotos))
    }

    return (
        <>
            {displayablePhotos?.length > 0 && (
                <div
                    className={
                        isPreview
                            ? styles.carouselPreview
                            : isFromPopper
                              ? styles.carouselPopper
                              : styles.carousel
                    }
                >
                    <div
                        className={
                            isFromPopper
                                ? imagesWithError?.includes(
                                      displayablePhotos[0]?.uuid
                                  )
                                    ? styles.wrongCardFromPopper
                                    : styles.cardFromPopper
                                : imagesWithError?.includes(
                                        displayablePhotos[0]?.uuid
                                    )
                                  ? styles.wrongCard
                                  : isPreview
                                    ? styles.cardPreview
                                    : styles.cardOverlay
                        }
                    >
                        <img
                            src={
                                displayablePhotos[0]?.data_url &&
                                displayablePhotos[0]?.data_url
                            }
                            alt=""
                            className={
                                isPreview
                                    ? styles.imgCardFromPreview
                                    : styles.imgCard
                            }
                            style={{ cursor: 'pointer' }}
                        />
                        {!isPreview && (
                            <div
                                className={styles.imgCardPlaceholder}
                                style={{ cursor: 'pointer' }}
                                onClick={handleAddPhoto}
                            >
                                <SvgWrapper
                                    customWidth={50}
                                    customHeight={50}
                                    keySvg={'photoBlue.svg'}
                                />
                            </div>
                        )}
                        {!isPreview && (
                            <div
                                className={styles.deleteImg}
                                onClick={() => onImageRemove(0)}
                            >
                                <SvgWrapper
                                    customWidth={34}
                                    customHeight={34}
                                    keySvg={'closeIcon.svg'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!isPreview && displayablePhotos?.length === 0 && (
                <div
                    onClick={handleAddPhoto}
                    className={
                        isPreview
                            ? styles.carouselPreview
                            : isFromPopper
                              ? styles.carouselPopper
                              : styles.carousel
                    }
                >
                    <div
                        className={
                            isFromPopper
                                ? imagesWithError?.includes(
                                      displayablePhotos[0]?.uuid
                                  )
                                    ? styles.wrongCardFromPopper
                                    : styles.cardFromPopper
                                : imagesWithError?.includes(
                                        displayablePhotos[0]?.uuid
                                    )
                                  ? styles.wrongCard
                                  : isPreview
                                    ? styles.cardPreview
                                    : styles.card
                        }
                    >
                        <img
                            src={
                                displayablePhotos[0]?.data_url &&
                                displayablePhotos[0]?.data_url
                            }
                            alt=""
                            className={
                                isPreview
                                    ? styles.imgCardFromPreview
                                    : styles.imgCard
                            }
                            width={'50px'}
                            style={{ cursor: 'pointer' }}
                        />
                        <img
                            src={photoBlue}
                            alt=""
                            className={styles.imgCardPlaceholderFixed}
                            width={'50px'}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            )}
            {label && (
                <RibbonPostType
                    label={label}
                    isFromGrid={isFromGrid}
                    isPlaceholder={displayablePhotos?.length <= 0}
                />
            )}
        </>
    )
}

export default PostCarousel

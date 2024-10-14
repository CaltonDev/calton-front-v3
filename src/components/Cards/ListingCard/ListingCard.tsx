import React from 'react'
import styles from './ListingCard.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Tag from '../../Tag/Tag'
import TextContainer from '../../TextContainer/TextContainer'
import { ListingCardProps } from './ListingCard.interface'
function ListingCard({ index, listing }: ListingCardProps) {
    const { t } = useTranslation()

    const openInNewPage = () => {}

    const formatCategories = () => {
        return 'food, pet'
    }
    return (
        <div className={styles.container} key={index}>
            <div className={styles.paddedContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {listing?.companyName}
                            </Typography>
                        </div>
                        <SvgWrapper
                            keySvg={'openInNewPageIcon.svg'}
                            size={'small'}
                            onClick={openInNewPage}
                        />
                    </div>
                    <div className={styles.contentDiv}>
                        <div className={styles.title}>
                            <Typography size={'bodyMedium'} weight={'bold'}>
                                {listing?.formatted_address}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.tagsContainer}>
                        <div className={styles.leftItem}>
                            {/*TODO: check where we get this information from, Add review stars*/}
                            <TextContainer isRating={4} color={'#F1F1F1'} />
                            <TextContainer
                                label={listing?.phoneNumbers?.primaryPhone}
                                textColor={'black'}
                                color={'#F1F1F1'}
                                iconSvg={'phoneSvg'}
                            />
                            <TextContainer
                                label={'Lorem Ipsum'}
                                textColor={'black'}
                                color={'#F1F1F1'}
                                iconSvg={'worldSvg'}
                            />
                        </div>
                    </div>
                    <div className={styles.tagsContainer}>
                        <div className={styles.leftItem}>
                            <TextContainer
                                label={listing?.storeCode}
                                textColor={'black'}
                                color={'#F1F1F1'}
                                iconSvg={'Amazon.svg'}
                            />
                        </div>
                    </div>
                    <div className={styles.reviewContainer}>
                        <div className={styles.title}>
                            <Typography size={'bodyMedium'} weight={'bold'}>
                                {t('Categorie')}
                            </Typography>
                            <Typography size={'bodyMedium'} weight={'light'}>
                                {formatCategories()}
                            </Typography>
                        </div>
                        <div className={styles.title}>
                            <Typography size={'bodyMedium'} weight={'bold'}>
                                {t('Descrizione')}
                            </Typography>
                            <Typography size={'bodyMedium'} weight={'light'}>
                                {listing?.profile?.description}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Tag
                        label={
                            listing?.metadata?.hasVoiceOfMerchant
                                ? t('Verificato')
                                : listing?.metadata?.duplicateLocation
                                  ? t('Duplicato')
                                  : !listing?.metadata?.hasVoiceOfMerchant &&
                                    (!listing?.metadata
                                        ?.hasPendingVerification ||
                                        listing?.metadata
                                            ?.hasPendingVerification) &&
                                    t('Non verificato')
                        }
                        type={
                            listing?.metadata?.hasVoiceOfMerchant
                                ? 'positive'
                                : listing?.metadata?.duplicateLocation
                                  ? 'negative'
                                  : 'neutral'
                        }
                        iconSvg={'reply.svg'}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListingCard

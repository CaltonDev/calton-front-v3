import React from 'react'
import styles from './ListingCard.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Tag from '../../Tag/Tag'
import TextContainer from '../../TextContainer/TextContainer'
import { ListingCardProps } from './ListingCard.interface'
import Dropdown from '../../Dropdown/Dropdown'
function ListingCard({ index, listing }: ListingCardProps) {
    const { t } = useTranslation()

    const openInNewPage = () => {}

    const formatCategories = () => {
        return 'food, pet'
    }

    const verifiyListing = () => {
        console.log('Clicked')
    }
    const dropdownData = [
        {
            label: t('Verifica'),
            labelColor: 'black',
            labelIcon: 'outlinedCheckmarkSvg',
            onClickAction: verifiyListing,
        },
        {
            label: t('Completa verifica'),
            labelColor: 'black',
            labelIcon: 'checkmarkSvg',
            onClickAction: verifiyListing,
        },
        {
            label: t('Elimina'),
            labelColor: 'red',
            labelIcon: 'trashIcon',
            onClickAction: verifiyListing,
        },
        {
            label: t('Elimina duplicato'),
            labelColor: 'red',
            labelIcon: 'duplicateDeleteIcon',
            onClickAction: verifiyListing,
        },
    ]
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
                        <div className={styles.iconsContainer}>
                            <SvgWrapper
                                keySvg={'openInNewPageIcon.svg'}
                                size={'small'}
                                onClick={openInNewPage}
                            />
                            <Dropdown dropdownData={dropdownData} />
                        </div>
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
                            <div className={styles.storeCodeContainer}>
                                <Typography
                                    size={'bodyMedium'}
                                    weight={'light'}
                                >
                                    {t('Codice negozio: ') + listing?.storeCode}
                                </Typography>
                                <SvgWrapper
                                    keySvg={'singlePencilSvg'}
                                    size={'small'}
                                    onClick={openInNewPage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewContainer}>
                        <div className={styles.title}>
                            <Typography size={'bodyMedium'} weight={'bold'}>
                                {t('Categorie')}
                            </Typography>
                            <Typography size={'bodyMedium'} weight={'normal'}>
                                {formatCategories()}
                            </Typography>
                        </div>
                        <div className={styles.title}>
                            <Typography size={'bodyMedium'} weight={'normal'}>
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
                        iconSvg={
                            listing?.metadata?.hasVoiceOfMerchant
                                ? 'checkmarkSvg'
                                : listing?.metadata?.duplicateLocation
                                  ? 'exclamationPoint.svg'
                                  : 'close.svg'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default ListingCard

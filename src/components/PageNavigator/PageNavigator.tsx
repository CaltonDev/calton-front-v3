import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './PageNavigator.module.scss'
import Typography from '../Typography/Typography'
import Input from '../Input/Input'
import { useTranslation } from 'react-i18next'
import { PageNavigatorProps } from './PageNavigator.interface'
import CaltonSelect from '../Select/Select'
function PageNavigator({
    pageElements,
    totalElements,
    currentPage,
    changePage,
    changeElementsPerPage,
}: PageNavigatorProps) {
    const { t } = useTranslation()

    const selectOptions = [
        {
            value: 30,
            label: 30,
        },
        {
            value: 50,
            label: 50,
        },
        {
            value: 70,
            label: 70,
        },
    ]

    const handlePageElements = (e: any) => {
        console.log('Clicked')
        changePage(e)
    }
    return (
        <div className={styles.container}>
            <div className={styles.elementsPerPageSelector}>
                <Typography size={'bodySmall'} weight={'light'}>
                    {t('Elementi per pagina')}
                </Typography>
                <CaltonSelect
                    options={selectOptions}
                    value={
                        selectOptions[
                            selectOptions?.findIndex(
                                (x) => x.value === pageElements
                            )
                        ]
                    }
                    size={'small'}
                    fontSize={'small'}
                    customColor={'white'}
                    customBorderColor={'#9D96A5'}
                    customHeight={'auto'}
                    customWidth={'auto'}
                    placeholderColor={'black'}
                    onChange={handlePageElements}
                />
                <Typography size={'bodySmall'} weight={'light'}>
                    {t('1 - 30 di 225')}
                </Typography>
            </div>
            <div className={styles.pageSelector}>
                <SvgWrapper
                    keySvg={'arrowBack'}
                    size={'small'}
                    color={currentPage > 1 ? 'secondary' : 'disabled'}
                    onClick={() => changeElementsPerPage('previous')}
                />
                <Input value={currentPage} size={'small'} isSquared={true} />
                <SvgWrapper
                    keySvg={'arrowForward'}
                    size={'small'}
                    color={
                        currentPage < totalElements ? 'secondary' : 'disabled'
                    }
                    onClick={() => changeElementsPerPage('next')}
                />
            </div>
        </div>
    )
}

export default PageNavigator

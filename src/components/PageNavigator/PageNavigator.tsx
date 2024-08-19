import React, { useEffect, useState } from 'react'
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
            value: 10,
            label: 10,
        },
        {
            value: 20,
            label: 20,
        },
        {
            value: 50,
            label: 50,
        },
        {
            value: 100,
            label: 100,
        },
    ]

    const handlePageElements = (e: any) => {
        console.log('Clicked')
        changeElementsPerPage(e)
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
                    {currentPage +
                        1 +
                        ' - ' +
                        Math.ceil(totalElements / pageElements) +
                        ' ' +
                        t('di') +
                        ' ' +
                        totalElements}
                </Typography>
            </div>
            <div className={styles.pageSelector}>
                <SvgWrapper
                    keySvg={'arrowBack'}
                    size={'small'}
                    color={currentPage < 1 ? 'disabled' : 'secondary'}
                    onClick={() => changePage('previous')}
                    disabled={currentPage < 1}
                />
                <Input
                    value={currentPage + 1}
                    onChange={(e) => changePage(e?.target?.value)}
                    size={'small'}
                    isSquared={true}
                />
                <SvgWrapper
                    keySvg={'arrowForward'}
                    size={'small'}
                    color={
                        (currentPage + 1) * pageElements >= totalElements
                            ? 'disabled'
                            : 'secondary'
                    }
                    onClick={() => changePage('next')}
                    disabled={(currentPage + 1) * pageElements >= totalElements}
                />
            </div>
        </div>
    )
}

export default PageNavigator

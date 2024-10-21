import React, { useEffect, useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './PageNavigator.module.scss'
import Typography from '../Typography/Typography'
import Input from '../Input/Input'
import { useTranslation } from 'react-i18next'
import { PageNavigatorProps } from './PageNavigator.interface'
import CaltonSelect from '../Select/Select'
import Button from '../Button/Button'
function PageNavigator({
    pageElements,
    totalElements,
    currentPage,
    changePage,
    changeElementsPerPage,
    hideChangeElementsPerPage = false,
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
        if (changeElementsPerPage) {
            changeElementsPerPage(e)
        }
    }

    const calculatePageSelector = () => {
        const lastPage = Math.max(
            0,
            Math.ceil(totalElements / pageElements) - 1
        )

        if (lastPage < 2) {
            return Array.from({ length: lastPage + 1 }, (_, i) => i)
        }

        if (currentPage === 0) {
            return [0, 1, 2]
        }

        if (currentPage === lastPage) {
            return [lastPage - 2, lastPage - 1, lastPage]
        }

        return [currentPage - 1, currentPage, currentPage + 1]
    }

    useEffect(() => {
        calculatePageSelector()
    }, [currentPage, pageElements])

    return (
        <div className={styles.container}>
            <div className={styles.elementsPerPageSelector}>
                {!hideChangeElementsPerPage && (
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t('Elementi per pagina')}
                    </Typography>
                )}
                {!hideChangeElementsPerPage && (
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
                )}
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

                {calculatePageSelector()?.map((index) => {
                    return (
                        <Button
                            key={index}
                            size={'small'}
                            variant={'outline'}
                            customBorderColor={
                                index === currentPage ? 'blue' : '#C0BBC5'
                            }
                            customTextColor={'black'}
                            customHeight={44}
                            customWidth={44}
                            customPadding={'unset'}
                            onClick={() => changePage(index + 1)}
                        >
                            {String(index + 1)}
                        </Button>
                    )
                })}

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

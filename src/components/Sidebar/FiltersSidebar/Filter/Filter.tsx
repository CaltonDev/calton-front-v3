import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Filter.module.scss'
import Typography from '../../../Typography/Typography'
import Switch from '../../../Switch/Switch'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
import Button from '../../../Button/Button'
import { FilterProps } from './Filter.interface'
import { useDispatch, useSelector } from 'react-redux'
import GroupByFilter from '../Filters/GroupByFilter/GroupByFilter'
import SourcesFilter from '../Filters/SourcesFilter/SourcesFilter'
import TimeFilter from '../Filters/TimeFilter/TimeFilter'
import CustomFilter from '../Filters/CustomFilter/CustomFilter'
import OtherFilter from '../Filters/OtherFilter/OtherFilter'
import ChannelsFilter from '../Filters/ChannelsFilter/ChannelsFilter'
import PlacesFilter from '../Filters/PlacesFilter/PlacesFilter'
import TopicsFilter from '../Filters/TopicsFilter/TopicsFilter'
import ProductsFilter from '../Filters/ProductsFilter/ProductsFilter'
import CustomFilterSingle from '../Filters/CustomFilter/CustomFilterSingle/CustomFilterSingle'
import { setStateSelect } from '../../../../store/filters/filtersSlice'
import { PayloadAction } from '@reduxjs/toolkit'

function Filter({ filter }: FilterProps) {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)
    const [openCustomFilter, setOpenCustomFilter] = useState('')
    const [preparedPayload, setPreparedPayload] = useState<{
        type: string | undefined
        value: any
        optional?: any | null
        labelDate?: string | null
    } | null>(null)
    const dispatch = useDispatch()
    //const selectedFilter = useSelector((state) => state.Settings.selectedFilter)

    const filtersObj = [
        {
            key: 'raggruppa',
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            key: 'fonti',
            svg: 'Fonti.svg',
            label: t('Fonti'),
        },
        {
            key: 'channels',
            svg: 'channels.svg',
            label: t('Canali'),
        },
        {
            key: 'tempo',
            svg: 'tempo.svg',
            label: t('Tempo'),
        },
        {
            key: 'location',
            svg: 'location.svg',
            label: t('Luogo'),
        },
        {
            key: 'topic',
            svg: 'topic.svg',
            label: t('Topic'),
        },
        {
            key: 'products',
            svg: 'products.svg',
            label: t('Prodotti'),
        },
        {
            key: 'others',
            svg: 'others.svg',
            label: t('Altri'),
        },
        {
            key: 'customFilters',
            svg: 'customFilters.svg',
            label: t('I tuoi filtri'),
        },
    ]

    const handleFiltersClick = (filterId: string) => {
        //setSelectedFilter(filterId)
    }

    type SubmitFunctionType = () => void

    const handleApplyBtnClick = () => {
        console.log('son quiii')
        console.log({ preparedPayload })
        dispatch(setStateSelect(preparedPayload as any))
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.header}>
                    <SvgWrapper
                        keySvg={filter ? filter?.svg : ''}
                        size={'large'}
                        color={'white'}
                    />
                    <Typography size={'h6'} weight={'bold'} color={'white'}>
                        {filter ? filter?.label : ''}
                    </Typography>
                </div>
            </div>
            <div className={styles.filterContainer}>
                {openCustomFilter !== '' ? (
                    <CustomFilterSingle customFilterId={openCustomFilter} />
                ) : filter?.key === 'raggruppa' ? (
                    <GroupByFilter />
                ) : filter?.key === 'tempo' ? (
                    <TimeFilter />
                ) : filter?.key === 'fonti' ? (
                    <SourcesFilter />
                ) : filter?.key === 'channels' ? (
                    <ChannelsFilter />
                ) : filter?.key === 'location' ? (
                    <PlacesFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'topic' ? (
                    <TopicsFilter />
                ) : filter?.key === 'products' ? (
                    <ProductsFilter />
                ) : filter?.key === 'others' ? (
                    <OtherFilter />
                ) : (
                    filter?.key === 'customFilters' && (
                        <CustomFilter openCustomFilter={setOpenCustomFilter} />
                    )
                )}
                {/*
                    selectedFilter === -1 ?
                        <CreateFilter setCustomFilters={callback} />
                        : selectedFilter === 0 ?
                            <TimeFilter />
                            : selectedFilter === 1 ?
                                <TimeFilter />
                                : selectedFilter === 2 ?
                                    <ProductsFilter />
                                    : selectedFilter === 3 ?
                                        <TimeFilter />
                                        : selectedFilter === 4 ?
                                            <ProductsFilter /> :
                                            selectedFilter === 5 ?
                                                <TopicFilter /> :
                                                selectedFilter === 6 ?
                                                    <Products /> :
                                                    selectedFilter === 7 ?
                                                        <FeedbackFilter /> :
                                                        selectedFilter === 8 ?
                                                            <ListingStateFilter /> :
                                                            selectedFilter >= CustomConstants.filters.customFiltersPosition ?
                                                                renderCustomFilter() : <></>*/}
            </div>
            {/*todo: we should call the submit from the custom autocomplete*/}
            <div className={styles.footerContainer}>
                <Button
                    size={'medium'}
                    disabled={false}
                    onClick={handleApplyBtnClick}
                >
                    {t('Applica')}
                </Button>
            </div>
        </div>
    )
}

export default Filter

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

function Filter({ filter, handleCloseOpenFilter }: FilterProps) {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)
    const [openCustomFilter, setOpenCustomFilter] = useState('')
    const [selectedCustomFilter, setSelectedCustomFilter] = useState('')
    const [preparedPayload, setPreparedPayload] = useState<{
        type: string | undefined
        value: any
        optional?: any | null
        labelDate?: string | null
    } | null>(null)
    const dispatch = useDispatch()
    const avoidSubmitOnFilters = ['raggruppa', 'tempo']

    const handleApplyBtnClick = () => {
        if (!avoidSubmitOnFilters?.includes(filter?.key ? filter?.key : '')) {
            dispatch(setStateSelect(preparedPayload as any))
            handleCloseOpenFilter()
        } else handleCloseOpenFilter()
    }

    useEffect(() => {
        setOpenCustomFilter('')
    }, [filter?.key])
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.header}>
                    <SvgWrapper
                        keySvg={filter ? filter?.svg : ''}
                        size={'large'}
                        customColor={'white'}
                    />
                    <Typography size={'h6'} weight={'bold'} color={'white'}>
                        {selectedCustomFilter !== ''
                            ? filter?.label + ' > '
                            : filter
                              ? filter?.label
                              : ''}
                    </Typography>
                    {selectedCustomFilter && (
                        <Typography
                            size={'h6'}
                            weight={'light'}
                            color={'white'}
                        >
                            {selectedCustomFilter !== ''
                                ? selectedCustomFilter
                                : ''}
                        </Typography>
                    )}
                </div>
            </div>
            <div className={styles.filterContainer}>
                {openCustomFilter !== '' ? (
                    <CustomFilterSingle
                        customFilterId={openCustomFilter}
                        setPreparedPayload={setPreparedPayload}
                    />
                ) : filter?.key === 'raggruppa' ? (
                    <GroupByFilter />
                ) : filter?.key === 'tempo' ? (
                    <TimeFilter />
                ) : filter?.key === 'fonti' ? (
                    <SourcesFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'channels' ? (
                    <ChannelsFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'location' ? (
                    <PlacesFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'topic' ? (
                    <TopicsFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'products' ? (
                    <ProductsFilter setPreparedPayload={setPreparedPayload} />
                ) : filter?.key === 'others' ? (
                    <OtherFilter setPreparedPayload={setPreparedPayload} />
                ) : (
                    filter?.key === 'customFilters' && (
                        <CustomFilter
                            openCustomFilter={setOpenCustomFilter}
                            setSelectedCustomFilter={setSelectedCustomFilter}
                        />
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
                    size={'small'}
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

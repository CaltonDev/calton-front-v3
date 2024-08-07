import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { SelectedWordsState } from '../../store/home/selectedWordsSlice'
import { useTranslation } from 'react-i18next'
import Hooks from '../../utils/hooks/Hooks'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../store/store'
import DonutCard from '../../components/DonutCard/DonutCard'
import TrackerCard from '../../components/TrackerCard/TrackerCard'
import TierListCard from '../../components/TierListCard/TierListCard'
import styles from './Home.module.scss'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard'
function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [btnType, setBtnType] = useState<'text' | 'password'>('password')
    const [checked, setChecked] = useState(false)
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector(
        (state: SelectedWordsState) => state.SelectedWords
    )
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    const { t } = useTranslation()

    const reloadHome = async () => {
        await ServiceWrapper.wrapperReloadHome(
            allFilters,
            'Date',
            wordSelected,
            dispatch,
            20,
            undefined,
            t
        )
    }

    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    Hooks.useDeepCompareEffect(() => {
        reloadHome()
    }, [allFilters])

    const performLoginAndRedirect = () => {
        //dispatch(setUser('exist'))
        navigate('/')
    }

    const handleInputChange = (e: any) => {
        setName(e.target.value)
    }

    const handleIcon = () => {
        if (btnType === 'password') {
            setBtnType('text')
        } else {
            setBtnType('password')
        }
    }

    const tierList = [
        {
            label: 'The Fork',
            icon: 'TheFork.svg',
        },
        {
            label: 'Facebook',
            icon: 'Facebook.svg',
        },
        {
            label: 'Tripadvisor',
            icon: 'TripadvisorAPI.svg',
        },
    ]
    return (
        <PageContainer>
            <PageHeader heading={t('Home')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div className={styles.itemContainer}>
                        <DonutCard
                            numberOfReviews={24547}
                            positive={45}
                            neutral={15}
                            negative={40}
                        />
                    </div>
                    <div className={styles.itemContainer}>
                        <TrackerCard numberOfReply={5463} totalReply={15000} />
                    </div>
                    <div className={styles.itemContainer}>
                        <TierListCard tierList={tierList} />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <ReviewCard />

                    <ReviewCard />
                </div>
            </div>
        </PageContainer>
    )
}

export default Home

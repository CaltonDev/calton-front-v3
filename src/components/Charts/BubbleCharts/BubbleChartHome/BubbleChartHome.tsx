import CollapsableCard from '../../../CollapsableCard/CollapsableCard'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './BubbleChartHome.module.scss'
import { setSelectedWord } from '../../../../store/home/selectedWordsSlice'
import { useTranslation } from 'react-i18next'
//import TableLastFeedbackHome from '../TableLastFeedbackHome/TableLastFeedbackHome'
import Tabs from '../../../TabsComponent/Tabs'
//import LoaderChart from '../CardInsights/LoaderChart/LoaderChart';
//import ServiceWrapper from "../../helpers/ServiceWrapper";
import { BubbleChartHomeProps } from './BubbleChartHome.interface'
import { RootState } from '../../../../store/store'
import BubbleChart from '../BubbleChartCustom/BubbleChart'
import TableLastFeedbackHome from '../../../Tables/TableLastFeedbackHome/TableLastFeedbackHome'

const CHART_HEIGHT = 543

function BubbleChartHome({
    heading,
    dataReady,
    bubbles,
}: BubbleChartHomeProps) {
    const dispatch = useDispatch()
    const [tooltipForBubbleId, setTooltipForBubbleId] = useState(null)
    const [tooltipForType, setTooltipForType] = useState(null)
    const [scale, setScale] = useState<number>(0)
    const [indexExt, setIndexExt] = useState<number[]>([])
    const wordSelected = useSelector((state: RootState) => state.SelectedWords)
    const { t } = useTranslation()
    const feedbacks = useSelector((state: RootState) => state.FeedbackHome) //TODO: probably we should remove it

    useEffect(() => {
        //todo: check errors, strange error in payload
        if (wordSelected) {
            setIndexExt([Math.random(), 1])
        }
    }, [wordSelected])

    useEffect(() => {
        if (bubbles) {
            setScale(getScale(bubbles) * 1.45)
        }
    }, [bubbles])

    const handleSingleBubbleHover = (id = null, type = null) => {
        setTooltipForBubbleId(id || null)
        setTooltipForType(type || null)
    }

    const getScale = (bubbles: any) => {
        let totalArea = 0

        if (bubbles.length == 0) {
            return 1
        }
        for (const { total } of bubbles.elements) {
            totalArea += (Math.PI * total) ** 2
        }

        const maxRadius = Math.sqrt(Math.max(totalArea) / Math.PI)
        return CHART_HEIGHT / 2.5 / maxRadius
    }

    const handleBubbleClick = (
        text: string,
        sentiment: string,
        isText: string
    ) => {
        console.log('t: ', text, ' sent: ', sentiment, ' is: ', isText)
        if (text && text != '') {
            const payload = {
                word: text,
                sentiment,
                isText,
            }
            dispatch(setSelectedWord(payload))
        } else {
            const payload = {
                word: null,
                sentiment: null,
                isText: null,
            }
            dispatch(setSelectedWord(payload))
        }
    }

    const buttonList = [t('Bubble'), t('Ultimi Feedback')]

    return (
        <CollapsableCard
            colClasses={styles.myWidth}
            heading={heading}
            collapsible={false}
            reloadable={false}
            downloadble={false}
            optionable={true}
            //externalSourceRefresher={reloadBubble}
            isBeta={true}
            closeable={false}
            isBubble={true}
            widthIcon={25}
        >
            <div>
                {
                    <Tabs
                        buttons={buttonList}
                        externalIndex={indexExt}
                        //setExtActiveIndex={0}
                    >
                        <div key="panel-1" className={styles.myContainerTab}>
                            {dataReady && scale ? (
                                bubbles &&
                                bubbles.elements &&
                                bubbles.elements.length > 0 ? (
                                    <BubbleChart
                                        heading={heading}
                                        bubbles={bubbles.elements}
                                        height={CHART_HEIGHT}
                                        onBubbleClick={handleBubbleClick}
                                        onBubbleFocus={handleSingleBubbleHover}
                                        onBubbleHover={handleSingleBubbleHover}
                                        scale={scale}
                                        selectedid={undefined}
                                        tooltipforbubbleid={tooltipForBubbleId}
                                        tooltipfortype={tooltipForType}
                                        width={490}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '15%',
                                            marginBottom: '15%',
                                        }}
                                    >
                                        {t('Non sono presenti dati')}
                                    </div>
                                )
                            ) : (
                                <div
                                    style={{
                                        marginTop: 100,
                                        marginBottom: 100,
                                    }}
                                >
                                    {/*<LoaderChart type={'circles'} />*/}
                                </div>
                            )}
                        </div>
                        <div key="panel-2" className={styles.myContainerTab}>
                            <TableLastFeedbackHome
                                word={wordSelected?.data?.word}
                                countFeed={feedbacks.count}
                                sentiment={wordSelected?.data?.sentiment}
                                dataReady={
                                    !feedbacks.isLoading &&
                                    !feedbacks.isLoadingCount
                                }
                            />
                        </div>
                    </Tabs>
                }
            </div>
        </CollapsableCard>
    )
}

export default BubbleChartHome

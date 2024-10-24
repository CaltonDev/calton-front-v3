import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import stylesCalendar from './CaltonCalendar.module.scss'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { usePopper } from 'react-popper'
import styled from 'styled-components'
import CaltonCalendarPopper from '../../components/CaltonCalendarPopper/CaltonCalendarPopper'
import { useNavigate } from 'react-router-dom'
//import ModalBasicMessage from 'Components/ModalBasicMessage/ModalBasicMessage'
import { useTranslation } from 'react-i18next'
import ListingService from '../../services/ListingService'
import { setUploadPhotos } from '../../store/photos/photosSlice'
import { useDispatch, useSelector } from 'react-redux'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import CaltonCalendarHeader from './CaltonCalendarHeader/CaltonCalendarHeader'
import { postTypes, VIEW_OPTIONS } from '../../constants/CustomConstants'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import PageHeader from '../PageComponents/PageHeader/PageHeader'
import { RootState } from '../../store/store'
import PageContainer from '../PageComponents/PageContainer/PageContainer'
import { CalendarProps } from './CaltonCalendar.interface'

const localizer = momentLocalizer(moment)

const calculateEndDate = (startDate: any, view: string) => {
    switch (view) {
        case Views.DAY:
            return moment(startDate).endOf('day').utcOffset(0, true).toDate()
        case Views.WEEK:
            return moment(startDate).endOf('week').utcOffset(0, true).toDate()
        case Views.MONTH:
            return moment(startDate).endOf('month').utcOffset(0, true).toDate()
        default:
            return moment(startDate).utcOffset(0, true).toDate()
    }
}

const CalendarStyled: React.FC<CalendarProps> = styled(Calendar)`
    .rbc-time-view {
        border: none;
    }

    .rbc-header {
        border: none;
        font-size: 16px;
        padding-left: 13px !important;
        padding-right: 13px !important;
    }

    .rbc-allday-cell .rbc-row-content {
        height: 20px;
    }

    .rbc-time-view .rbc-allday-cell {
        display: none;
    }

    .rbc-event {
        justify-content: center;
        display: flex;
    }

    .rbc-day-slot .rbc-event-content {
    }

    .rbc-event-label {
        font-size: 13px;
        font-weight: 500;
    }

    .rbc-event.rbc-selected,
    .rbc-day-slot .rbc-selected.rbc-background-event {
        background-color: #6971ff;
        border: 1px solid #6971ff;

        .rbc-event-content span {
            background-color: #6971ff;
        }
    }

    .rbc-events-container {
        width: 100%;
    }
`

function CaltonCalendar() {
    // update events based on eventsApi e elemento con type = draft
    const filteredListings = useSelector(
        (state: RootState) => state.Filters.selectedLocationListing
    )

    const [elementToAdd, setElementToAdd] = useState<any>(null)
    const [elementPopover, setElementPopover] = useState<any>(null)
    const [referenceElement, setReferenceElement] = useState<any>(null)
    const [isPopperVisible, setPopperVisible] = useState<any>(false)
    const [popperElement, setPopperElement] = useState<any>(null)
    const { t } = useTranslation()
    const [cannotSetInPastModal, setCannotSetInPastModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState({})
    const dispatch = useDispatch()
    const [dataReady, setDataReady] = useState(true)
    const [view, setView] = useState<any>(Views.WEEK)
    const [startDate, setStartDate] = useState<any>(null)
    const endDate = calculateEndDate(startDate, view)

    const localPosts = ListingService.getLocalPosts({
        viewBy: undefined,
        listingsName: filteredListings,
        skip: 0,
        limit: 50,
        returnAnt: false,
        nextPageToken: undefined,
        postsName: undefined,
        postsHash: undefined,
        returnLocations: undefined,
        startDate: startDate,
        endDate: endDate,
        fromCalendar: true,
    })?.data?.posts

    const eventsAPI = localPosts?.forEach((data: any) => {
        data.start = new Date(data?.start)
        data.end = new Date(data?.end)
    })

    const [eventsInternal, setEventsInternal] = useState<any>(
        eventsAPI?.filter((obj: any) => !obj?.allDay)
    )

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'left-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [5, 15],
                },
            },
        ],
    })

    let singleClickTimeout: any

    //TODO listener click away like for closing new event

    const checkIsPast = (end: Date) => {
        return end < new Date() ?? false
    }

    useEffect(() => {
        if (elementToAdd) {
            setPopperVisible(false)
            const tmpElements: any[] = [
                ...eventsAPI?.filter((obj: any) => !obj?.allDay),
            ]
            tmpElements.push(elementToAdd)
            setEventsInternal(tmpElements)
            setPopperVisible(true)
        }
    }, [elementToAdd])

    function Event(event: any) {
        const isPast = checkIsPast(event.end)
        const postLabelValue = postTypes?.find(
            (obj: any) => obj?.value === event.post?.topicType
        )?.labelValue
        return (
            <span
                className={
                    isPast
                        ? stylesCalendar.eventPast
                        : event['type'] === 'draft'
                          ? stylesCalendar.eventColorDraft
                          : ''
                }
            >
                <span style={{ marginRight: 5 }}>
                    <SvgWrapper
                        keySvg={'localPost.svg'}
                        customWidth={18}
                        customHeight={18}
                        color={'white'}
                    />
                </span>
                <strong>{event.title}</strong>
                <div>{event.summary}</div>
                <div className={stylesCalendar.typeEvent}>
                    {event.post?.topicType &&
                        t(postLabelValue ? postLabelValue : '')}
                </div>
            </span>
        )
    }

    const EventWrapperComponent = (event: any, children: any) => {
        const isPast = checkIsPast(event.end)
        const newChildren = { ...children }
        const newChildrenProps = { ...newChildren.props }
        const existingClasses = newChildrenProps.className || ''
        //TODO same component or utils for classname for this and event
        newChildrenProps.className = `${existingClasses} ${event['type'] === 'draft' ? stylesCalendar.eventColorDraft : stylesCalendar.eventColor} ${isPast ? stylesCalendar.eventPast : ''}`

        newChildren.props = { ...newChildrenProps }
        return <div ref={setReferenceElement}>{newChildren}</div>
    }

    const customSlotPropGetter = (date: Date) => {
        if (date.getDate() === 7 || date.getDate() === 15)
            return {
                style: {
                    //border: 'solid 1px #000000',
                },
            }
        else return {}
    }

    const { components, defaultDate } = useMemo(
        () => ({
            components: {
                event: Event,
                eventWrapper: EventWrapperComponent,
            },
            defaultDate: new Date(),
        }),
        []
    )

    const handleSelectEvent = (event: any) => {
        //handle popover info
        setSelectedPost(event)
        setPopperVisible(true)
        setElementPopover(event)
    }
    const handleChangeView = () => {
        //handle popover info
        handleClose()
    }

    const handleClose = () => {
        dispatch(setUploadPhotos([]))
        setElementToAdd(false)
        setElementPopover(null)
        setSelectedPost({})
        setEventsInternal(eventsAPI?.filter((obj: any) => !obj?.allDay))
        setPopperVisible(false)
    }

    const handleSelectSlot = (start: Date, end: Date, action: string) => {
        const isPast = checkIsPast(end)
        if (action === 'doubleClick') {
            if (isPast) {
                //TODO change to custom component
                setCannotSetInPastModal(true)
                return
            }
            clearTimeout(singleClickTimeout)
            const newElement = {
                id: 115,
                title: t('Bozza'),
                type: 'draft',
                start: new Date(start),
                end: new Date(end),
            }
            setElementToAdd(newElement)
            setElementPopover(newElement)
        } else if (action === 'click') {
            /* singleClickTimeout = setTimeout(() => {
                 handleClose();
             }, DOUBLE_CLICK_DELAY)*/
        }
    }

    const fetchCalendarData = () => {}

    return (
        <PageContainer>
            <PageHeader
                heading={t('Luoghi')}
                subheading={true}
                showArrowBack={true}
                arrowBackUrl={`/localPost`}
            ></PageHeader>
            {/*<ModalBasicMessage
                    title={t(
                        'Non è possibile selezionare un evento nel passato'
                    )}
                    openModal={cannotSetInPastModal}
                    setOpenModal={setCannotSetInPastModal}
                    showFooter={false}
                />*/}

            {/*<div
                style={{
                    height: 680,
                    background: 'white',
                    padding: 30,
                    paddingBottom: 70,
                    paddingTop: 25,
                }}
            >*/}
            <CaltonCalendarPopper
                selectedPost={selectedPost}
                isVisibile={isPopperVisible}
                closePopper={handleChangeView}
                attributes={attributes}
                element={elementPopover}
                setPopperElement={setPopperElement}
                popperReference={popperElement}
                styles={styles}
                reloadData={fetchCalendarData}
                setIsPopperVisibile={setPopperVisible}
            />
            <CaltonCalendarHeader
                setStartDate={setStartDate}
                startDate={startDate}
                view={view}
                setView={setView}
            />
            <CalendarStyled
                components={components}
                defaultDate={defaultDate}
                defaultView={Views.WEEK}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                views={VIEW_OPTIONS.map((el) => el.labelBig)}
                onView={handleChangeView}
                events={eventsInternal}
                selectable
                localizer={localizer}
                slotPropGetter={customSlotPropGetter}
                showMultiDayTimes={true}
                showAllEvents={true}
                step={30}
                timeslots={4}
                toolbar={false}
                view={view}
                date={startDate}
            />
            {/*</div>*/}
        </PageContainer>
    )
}

export default CaltonCalendar

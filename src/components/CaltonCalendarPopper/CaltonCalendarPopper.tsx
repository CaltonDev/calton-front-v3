import * as React from 'react'
import stylesCalendar from '../CaltonCalendar/CaltonCalendar.module.scss'
import { useEffect, useState } from 'react'
import ListingCreatePostPopper from '../../pages/ListingCreatePostPopper/ListingCreatePostPopper'
import closeIcon from '../../assets/img/close.svg'
import expandIcon from '../../assets/img/expand.png'
import Draggable from 'react-draggable'
import moment from 'moment'
import { CaltonCalendarPopperProps } from './CaltonCalendarPopper.interface'

function CaltonCalendarPopper({
    setIsPopperVisibile,
    isVisibile = false,
    popperReference,
    element,
    attributes,
    styles,
    selectedPost,
    closePopper,
    reloadData,
    setPopperElement,
}: CaltonCalendarPopperProps) {
    const [fullWidth, setFullWidth] = useState(false)
    const [timeVisible, setTimeVisible] = useState<number>(0)

    const handleClosePopper = () => {
        setFullWidth(false)
        closePopper()
    }

    const handleDocumentClick = (event: any) => {
        const bounds = popperReference.getBoundingClientRect()
        const timeDifference = new Date().getTime() - timeVisible
        if (timeVisible && timeDifference >= 350) {
            if (
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom
            ) {
                const elementsAtPoint = document.elementsFromPoint(
                    event.clientX,
                    event.clientY
                )

                let highestZIndex = -Infinity
                let highestZIndexElement = null

                elementsAtPoint.forEach((element) => {
                    const zIndex = window.getComputedStyle(element).zIndex
                    if (zIndex !== 'auto' && Number(zIndex) > highestZIndex) {
                        highestZIndex = Number(zIndex)
                        highestZIndexElement = element
                    }
                })

                if (
                    highestZIndexElement &&
                    highestZIndexElement !== popperReference
                ) {
                    return
                }
                handleClosePopper()
            }
        }
    }

    useEffect(() => {
        if (isVisibile) {
            setTimeVisible(new Date().getTime())
        } else {
            setTimeVisible(0)
        }
    }, [isVisibile])

    useEffect(() => {
        if (popperReference) {
            document.addEventListener('click', handleDocumentClick)
        }
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [popperReference, timeVisible])

    const popperContent = isVisibile ? (
        <div
            className={
                fullWidth
                    ? stylesCalendar.fullWidthModalContainer
                    : stylesCalendar.ourSmallModalContainer
            }
            ref={setPopperElement}
            style={styles?.popper}
            {...attributes?.popper}
        >
            <div
                className={
                    fullWidth
                        ? stylesCalendar.popperHeaderFull
                        : stylesCalendar.popperHeader
                }
                style={fullWidth ? { marginTop: 65 } : {}}
            >
                <span className={stylesCalendar.containerHead}>
                    <span
                        style={{
                            color: '#3F49FC',
                            paddingLeft: 10,
                            paddingTop: 5,
                            cursor: 'pointer',
                        }}
                        onClick={() => setFullWidth(!fullWidth)}
                    >
                        <img
                            style={{ padding: 5 }}
                            src={expandIcon}
                            width="25"
                            height="25"
                            alt=""
                        />
                    </span>
                    <span className={stylesCalendar.calendarMomentHeading}>
                        {moment(element.start).format('dddd D MMMM YYYY')}
                    </span>
                </span>
                <span
                    style={{
                        color: '#3F49FC',
                        paddingRight: 10,
                        paddingTop: 5,
                        cursor: 'pointer',
                    }}
                    onClick={handleClosePopper}
                >
                    <img
                        style={{ padding: 5 }}
                        src={closeIcon}
                        width="25"
                        height="25"
                        alt=""
                    />
                </span>
            </div>
            <div
                className={
                    fullWidth
                        ? stylesCalendar.fullWidthModal
                        : stylesCalendar.ourSmallModal
                }
            >
                <ListingCreatePostPopper
                    postData={selectedPost}
                    fullWidth={fullWidth}
                    reloadData={reloadData}
                    setShowPopper={setIsPopperVisibile}
                />
            </div>
        </div>
    ) : (
        <></>
    )

    return (
        <>
            {fullWidth ? (
                popperContent
            ) : (
                <Draggable scale={1}>{popperContent}</Draggable>
            )}
        </>
    )
}

export default CaltonCalendarPopper

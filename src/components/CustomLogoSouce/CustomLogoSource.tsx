import React from 'react'
import googleplay_logo from '../../assets/icons/google play.png'
import appstore_logo from '../../assets/icons/app store.png'
import google_logo from '../../assets/icons/google-logo.png'
import trip_adv_logo from '../../assets/icons/tripadvisor-logo.svg'
import trust_logo from '../../assets/icons/logo_trustpilot.png'
import amazon_logo from '../../assets/icons/amazon_logo.png'
import indeed_logo from '../../assets/icons/Indeed_logo.png'
import fb_logo from '../../assets/icons/fblogo.png'
import download_svg from '../../assets/img/download.svg'
import thefork_logo from '../../assets/icons/thefork.png'
import justeat_logo from '../../assets/icons/JustEat.png'
import Cruise_Critic_logo from '../../assets/icons/Cruise_Critic_logo.png'
import excel_icon from '../../assets/icons/excel.png'
import survey_icon from '../../assets/icons/survey.png'
import agoda_logo from '../../assets/icons/Agoda_logo.png'
import booking_logo from '../../assets/icons/booking.png'
import cheaptickets_logo from '../../assets/icons/CHEAPTICKETS LOGO.png'
import ebookers_logo from '../../assets/icons/ebookers.png'
import expedia_logo from '../../assets/icons/Expedia-logo.png'
import holidaycheck_logo from '../../assets/icons/HolidayCheck.png'
import hotels_com_logo from '../../assets/icons/Hotels.com_Logo.png'
import orbitz_logo from '../../assets/icons/Orbitz-logo.png'
import travelocity_logo from '../../assets/icons/Travelocity-Logo.png'
import trip_com_logo from '../../assets/icons/Trip com.png'
import yelp_logo from '../../assets/icons/Yelp-logo.png'
import trusted_shops from '../../assets/icons/Trusted-shops-logo.png'
import { CustomLogoSourceProps } from './CustomLogoSource.interface'

function CustomLogoSource({
    data,
    showText = false,
    width,
    src,
}: CustomLogoSourceProps) {
    let img = null
    if (src) {
        img = src
    } else if (data) {
        const data_img = data.split(' - ')[0]
        if (data_img.toLowerCase().includes('google play')) {
            img = googleplay_logo
        } else if (data_img.toLowerCase().includes('apple store')) {
            img = appstore_logo
        } else if (data_img.toLowerCase().includes('google')) {
            img = google_logo
        } else if (data_img.toLowerCase().includes('tripadvisor')) {
            img = trip_adv_logo
        } else if (data_img.toLowerCase().includes('trustpilot')) {
            img = trust_logo
        } else if (data_img.toLowerCase().includes('amazon')) {
            img = amazon_logo
        } else if (data_img.toLowerCase().includes('facebook')) {
            img = fb_logo
        } else if (data_img.toLowerCase().includes('upload')) {
            img = download_svg
        } else if (data_img.toLowerCase().includes('thefork')) {
            img = thefork_logo
        } else if (data_img.toLowerCase().includes('cruise critic')) {
            img = Cruise_Critic_logo
        } else if (data_img.toLowerCase().includes('excel')) {
            img = excel_icon
        } else if (data_img.toLowerCase().includes('survey')) {
            img = survey_icon
        } else if (data_img.toLowerCase().includes('agoda')) {
            img = agoda_logo
        } else if (data_img.toLowerCase().includes('booking')) {
            img = booking_logo
        } else if (data_img.toLowerCase().includes('cheaptickets')) {
            img = cheaptickets_logo
        } else if (data_img.toLowerCase().includes('ebookers')) {
            img = ebookers_logo
        } else if (data_img.toLowerCase().includes('expedia')) {
            img = expedia_logo
        } else if (data_img.toLowerCase().includes('holidaycheck')) {
            img = holidaycheck_logo
        } else if (data_img.toLowerCase().includes('hotels.com')) {
            img = hotels_com_logo
        } else if (data_img.toLowerCase().includes('orbitz')) {
            img = orbitz_logo
        } else if (data_img.toLowerCase().includes('travelocity')) {
            img = travelocity_logo
        } else if (data_img.toLowerCase().includes('ctrip')) {
            img = trip_com_logo
        } else if (data_img.toLowerCase().includes('yelp')) {
            img = yelp_logo
        } else if (data_img.toLowerCase().includes('indeed')) {
            img = indeed_logo
        } else if (data_img.toLowerCase().includes('justeat')) {
            img = justeat_logo
        } else if (data_img.toLowerCase().includes('trusted shops')) {
            img = trusted_shops
        }
    }
    return img ? (
        <div style={{ textAlign: 'center' }}>
            <img
                style={src ? { borderRadius: 50 } : {}}
                alt={data}
                src={img}
                width={width ? width : 40}
            />
            <span>{showText && <p style={{ fontSize: 12 }}>{data}</p>}</span>
        </div>
    ) : (
        <p style={{ fontSize: '0.9vw' }}>{data}</p>
    )
}

export default CustomLogoSource

import React from 'react'
import { SvgWrapperProps } from './SvgWrapper.interface'
import ArrowBackSvg from './SvgIcons/ArrowBackSvg'
import styles from './SvgWrapper.module.scss'
import ArrowForwardSvg from './SvgIcons/ArrowForwardSvg'
import {
    disabledColor,
    iconExtraSmallSize,
    iconLargeSize,
    iconMediumSize,
    iconSmallSize,
    iconXLargeSize,
    primaryColor,
    primaryIconColor,
    secondaryColor,
} from '../../constants/constants'
import LockOpenedSvg from './SvgIcons/LockOpenedSvg'
import LockClosedSvg from './SvgIcons/LockClosedSvg'
import SearchSvg from './SvgIcons/SearchSvg'
import ArrowDownSvg from './SvgIcons/ArrowDownSvg'
import SettingsSvg from './SvgIcons/SettingsSvg'
import ProfileSvg from './SvgIcons/ProfileSvg'
import CaltonLogoSvg from './SvgIcons/CaltonLogoSvg'
import HomeSvg from './SvgIcons/HomeSvg'
import StarSvg from './SvgIcons/StarSvg'
import LocationSvg from './SvgIcons/LocationSvg'
import ProductSvg from './SvgIcons/ProductSvg'
import FontiSvg from './SvgIcons/FontiSvg'
import GrafoSvg from './SvgIcons/GrafoSvg'
import PerformanceSvg from './SvgIcons/PerformanceSvg'
import ChatIconSvg from './SvgIcons/ChatIconSvg'
import CommunicationSvg from './SvgIcons/CommunicationSvg'
import RaggruppaSvg from './SvgIcons/RaggruppaSvg'
import OtherSvg from './SvgIcons/OtherSvg'
import TopicSvg from './SvgIcons/TopicSvg'
import CanaliSvg from './SvgIcons/CanaliSvg'
import TempoSvg from './SvgIcons/TempoSvg'
import YourFiltersSvg from './SvgIcons/YourFiltersSvg'
import AmazonSvg from './SvgIcons/AmazonSvg'
import FacebookSvg from './SvgIcons/FacebookSvg'
import GoogleMyBusinessSvg from './SvgIcons/GoogleMyBusinessSvg'
import TrustpilotSvg from './SvgIcons/TrustpilotSvg'
import TrustedShopsSvg from './SvgIcons/TrustedShopsSvg'
import TripAdvisorSvg from './SvgIcons/TripAdvisorSvg'
import JustEatSvg from './SvgIcons/JustEatSvg'
import TheForkSvg from './SvgIcons/TheForkSvg'
import CloseIconSvg from './SvgIcons/CloseIconSvg'
import ExpandIconSvg from './SvgIcons/ExpandIconSvg'
import MenuSvg from './SvgIcons/MenuSvg'
import HoursSvg from './SvgIcons/HoursSvg'
import PhotosSvg from './SvgIcons/PhotosSvg'
import PostSvg from './SvgIcons/PostSvg'
import SondaggiSvg from './SvgIcons/SondaggiSvg'

const SvgWrapper = ({
    keySvg,
    size = 'small',
    color = 'primary',
    isClickable = false,
    hasContainerProps = {
        hasContainer: false,
        containerSize: 0,
        background: 'white',
    },
    svgBackgroundColor,
    customWidth,
    customHeight,
    customColor,
    onClick,
}: SvgWrapperProps) => {
    const iconSize =
        size === 'xsmall'
            ? iconExtraSmallSize
            : size === 'small'
              ? iconSmallSize
              : size === 'medium'
                ? iconMediumSize
                : size === 'large'
                  ? iconLargeSize
                  : iconXLargeSize
    const iconColor = customColor
        ? customColor
        : color === 'primary'
          ? primaryColor
          : color === 'secondary'
            ? secondaryColor
            : color === 'primaryIcon'
              ? primaryIconColor
              : disabledColor

    const iconWidth = customWidth ? customWidth : iconSize
    const iconHeight = customHeight ? customHeight : iconSize
    return (
        <div
            onClick={onClick}
            style={
                hasContainerProps?.hasContainer
                    ? {
                          width: hasContainerProps?.containerSize,
                          height: hasContainerProps?.containerSize,
                          background: hasContainerProps?.background,
                          cursor: 'pointer',
                      }
                    : { cursor: 'pointer' }
            }
            className={
                hasContainerProps?.hasContainer ? styles.iconContainer : ''
            }
        >
            <span
                style={{
                    width: customWidth ? customWidth : iconSize,
                    height: customHeight ? customHeight : iconSize,
                }}
                className={isClickable ? styles.clickable : ''}
            >
                {keySvg === 'arrowBack' ? (
                    <ArrowBackSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'arrowForward' ? (
                    <ArrowForwardSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'lockOpenedSvg' ? (
                    <LockOpenedSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'lockClosedSvg' ? (
                    <LockClosedSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'searchSvg' ? (
                    <SearchSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'arrowDownSvg' ? (
                    <ArrowDownSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'settingsSvg' ? (
                    <SettingsSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'profileSvg' ? (
                    <ProfileSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'caltonLogoSvg' ? (
                    <CaltonLogoSvg />
                ) : keySvg === 'home.svg' ? (
                    <HomeSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'reviews.svg' ? (
                    <StarSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'location.svg' ? (
                    <LocationSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'products.svg' ? (
                    <ProductSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'Fonti.svg' ? (
                    <FontiSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'Grafo.svg' ? (
                    <GrafoSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'analisi-avanzata.svg' ? (
                    <PerformanceSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'chatIcon.svg' ? (
                    <ChatIconSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'communicationIcon.svg' ? (
                    <CommunicationSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'raggruppa.svg' ? (
                    <RaggruppaSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'others.svg' ? (
                    <OtherSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'topic.svg' ? (
                    <TopicSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'channels.svg' ? (
                    <CanaliSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'tempo.svg' ? (
                    <TempoSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'customFilters.svg' ? (
                    <YourFiltersSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'Amazon.svg' ? (
                    <AmazonSvg />
                ) : keySvg === 'Facebook.svg' ? (
                    <FacebookSvg />
                ) : keySvg === 'GoogleMyBusiness.svg' ? (
                    <GoogleMyBusinessSvg />
                ) : keySvg === 'Trustpilot.svg' ? (
                    <TrustpilotSvg />
                ) : keySvg === 'Trusted shops.svg' ? (
                    <TrustedShopsSvg />
                ) : keySvg === 'TripadvisorAPI.svg' ? (
                    <TripAdvisorSvg />
                ) : keySvg === 'JustEat.svg' ? (
                    <JustEatSvg />
                ) : keySvg === 'TheFork.svg' ? (
                    <TheForkSvg />
                ) : keySvg === 'close.svg' ? (
                    <CloseIconSvg />
                ) : keySvg === 'expand.svg' ? (
                    <ExpandIconSvg />
                ) : keySvg === 'menu.svg' ? (
                    <MenuSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'hours.svg' ? (
                    <HoursSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'photo.svg' ? (
                    <PhotosSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'localPost.svg' ? (
                    <PostSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'performance.svg' ? (
                    <PerformanceSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'sondaggi.svg' ? (
                    <SondaggiSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : (
                    <></>
                )}
            </span>
        </div>
    )
}

export default SvgWrapper

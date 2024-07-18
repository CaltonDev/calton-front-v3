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
                      }
                    : {}
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
                    <HomeSvg />
                ) : keySvg === 'reviews.svg' ? (
                    <StarSvg />
                ) : keySvg === 'location.svg' ? (
                    <LocationSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'products.svg' ? (
                    <ProductSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'Fonti.svg' ? (
                    <FontiSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'Grafo.svg' ? (
                    <GrafoSvg />
                ) : keySvg === 'analisi-avanzata.svg' ? (
                    <PerformanceSvg />
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
                ) : (
                    <></>
                )}
            </span>
        </div>
    )
}

export default SvgWrapper

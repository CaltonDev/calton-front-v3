import React from 'react'
import { SvgWrapperProps } from './SvgWrapper.interface'
import ArrowBackSvg from './SvgIcons/ArrowBackSvg'
import styles from './SvgWrapper.module.scss'
import ArrowForwardSvg from './SvgIcons/ArrowForwardSvg'
import {
    disabledColor,
    iconExtraSmallSize,
    iconSmallLarge,
    iconSmallMedium,
    iconSmallSize,
    iconSmallXLarge,
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
}: SvgWrapperProps) => {
    const iconSize =
        size === 'xsmall'
            ? iconExtraSmallSize
            : size === 'small'
              ? iconSmallSize
              : size === 'medium'
                ? iconSmallMedium
                : size === 'large'
                  ? iconSmallLarge
                  : iconSmallXLarge
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
                    <LocationSvg />
                ) : keySvg === 'products.svg' ? (
                    <ProductSvg />
                ) : keySvg === 'Fonti.svg' ? (
                    <FontiSvg />
                ) : keySvg === 'Grafo.svg' ? (
                    <GrafoSvg />
                ) : keySvg === 'analisi-avanzata.svg' ? (
                    <PerformanceSvg />
                ) : keySvg === 'chatIcon.svg' ? (
                    <ChatIconSvg width={iconWidth} height={iconHeight} />
                ) : (
                    <></>
                )}
            </span>
        </div>
    )
}

export default SvgWrapper

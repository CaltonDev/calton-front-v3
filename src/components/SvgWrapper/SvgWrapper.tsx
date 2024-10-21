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
import OpenInNewPageSvg from './SvgIcons/OpenInNewPageSvg'
import MessageSvg from './SvgIcons/MessageSvg'
import ReplySvg from './SvgIcons/ReplySvg'
import NegativeSentimentIcon from './SvgIcons/NegativeSentimentIcon'
import NeutralSentimentIcon from './SvgIcons/NeutralSentimentIcon'
import PositiveSentimentIcon from './SvgIcons/PositiveSentimentIcon'
import SendIconSvg from './SvgIcons/SendIconSvg'
import RowSelectionSvg from './SvgIcons/RowSelectionSvg'
import HighlighterSvg from './SvgIcons/HighlighterSvg'
import BurgerIconDotSvg from './SvgIcons/BurgerIconDotSvg'
import StarFilledSvg from './SvgIcons/StarFilledSvg'
import RadioSentimentSvg from './SvgIcons/RadioSentimentSvg'
import GoogleSvg from './SvgIcons/GoogleSvg'
import ItaFlagIcon from './SvgIcons/ItaFlagIcon'
import EsFlagIcon from './SvgIcons/EsFlagIcon'
import EnFlagIcon from './SvgIcons/EnFlagIcon'
import PlusSvg from './SvgIcons/PlusSvg'
import TrashSvg from './SvgIcons/TrashSvg'
import EditSvg from './SvgIcons/EditSvg'
import UploadSvg from './SvgIcons/UploadSvg'
import InfoIconSvg from './SvgIcons/InfoIconSvg'
import QuestionIconSvg from './SvgIcons/QuestionIconSvg'
import SurveyIconSvg from './SvgIcons/SurveyIconSvg'
import CheckmarkSvg from './SvgIcons/CheckmarkSvg'
import PeopleSvg from './SvgIcons/PeopleSvg'
import EyeSvg from './SvgIcons/EyeSvg'
import CopySvg from './SvgIcons/CopySvg'
import ShareSvg from './SvgIcons/ShareSvg'
import OutlinedCheckmarkSvg from './SvgIcons/OutlinedCheckmarkSvg'
import PuntiVenditaSvg from './SvgIcons/PuntiVenditaSvg'
import PhoneSvg from './SvgIcons/PhoneSvg'
import WorldSvg from './SvgIcons/WorldSvg'
import ExclamationPointSvg from './SvgIcons/ExclamationPointSvg'
import SinglePencilSvg from './SvgIcons/SinglePencilSvg'
import DuplicateDeleteSvg from './SvgIcons/DuplicateDeleteSvg'
import GoogleMapsSvg from './SvgIcons/GoogleMapsSvg'
import PcIconSvg from './SvgIcons/PcIconSvg'
import MobileIconSvg from './SvgIcons/MobileIconSvg'
import DownloadSvg from './SvgIcons/DownloadSvg'

const SvgWrapper = ({
    keySvg,
    size = 'small',
    color = 'primary',
    isClickable = false,
    hasContainerProps = {
        hasContainer: false,
        containerSize: 0,
        outlined: false,
        background: '',
    },
    svgBackgroundColor,
    customWidth,
    customHeight,
    customColor,
    onClick,
    disabled = false,
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
              : color === 'black'
                ? 'black'
                : color === 'white'
                  ? 'white'
                  : disabledColor

    const iconWidth = customWidth ? customWidth : iconSize
    const iconHeight = customHeight ? customHeight : iconSize
    return (
        <div
            onClick={!disabled ? onClick : undefined}
            style={{
                width: hasContainerProps?.containerSize
                    ? hasContainerProps?.containerSize
                    : '',
                height: hasContainerProps?.containerSize
                    ? hasContainerProps?.containerSize
                    : '',
                background: hasContainerProps?.background
                    ? hasContainerProps?.background
                    : '',
                border: hasContainerProps?.outlined
                    ? hasContainerProps?.border
                    : '',
                borderRadius: hasContainerProps?.borderRadius
                    ? hasContainerProps?.borderRadius
                    : '',
                cursor: !disabled ? 'pointer' : '',
            }}
            className={
                hasContainerProps?.hasContainer ? styles.iconContainer : ''
            }
        >
            <span
                style={{
                    width: customWidth ? customWidth : iconSize,
                    height: customHeight ? customHeight : iconSize,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                ) : keySvg === 'downloadSvg' ? (
                    <DownloadSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'caltonLogoSvg' ? (
                    <CaltonLogoSvg />
                ) : keySvg === 'home.svg' ? (
                    <HomeSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'reviews.svg' ? (
                    <StarSvg
                        width={iconWidth}
                        height={iconHeight}
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
                ) : keySvg === 'Topic.svg' ? (
                    <FontiSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'Grafo.svg' ? (
                    <GrafoSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'analisi-avanzata.svg' ? (
                    <PerformanceSvg
                        width={iconWidth}
                        height={iconHeight}
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
                    <AmazonSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'Facebook.svg' ? (
                    <FacebookSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'GoogleMyBusiness.svg' ? (
                    <GoogleMyBusinessSvg />
                ) : keySvg === 'Google.svg' ? (
                    <GoogleSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'GoogleMaps.svg' ? (
                    <GoogleMapsSvg />
                ) : keySvg === 'PcIconSvg' ? (
                    <PcIconSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'MobileIconSvg' ? (
                    <MobileIconSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'Trustpilot.svg' ? (
                    <TrustpilotSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'Trusted shops.svg' ? (
                    <TrustedShopsSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'TripadvisorAPI.svg' ? (
                    <TripAdvisorSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'JustEat.svg' ? (
                    <JustEatSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'TheFork.svg' ? (
                    <TheForkSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'close.svg' ? (
                    <CloseIconSvg fillColor={iconColor} />
                ) : keySvg === 'expand.svg' ? (
                    <ExpandIconSvg />
                ) : keySvg === 'menu.svg' ? (
                    <MenuSvg
                        fillColor={iconColor}
                        svgBackgroundColor={svgBackgroundColor}
                    />
                ) : keySvg === 'hours.svg' ? (
                    <HoursSvg
                        width={iconWidth}
                        height={iconHeight}
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
                ) : keySvg === 'openInNewPageIcon.svg' ? (
                    <OpenInNewPageSvg fillColor={iconColor} />
                ) : keySvg === 'message.svg' ? (
                    <MessageSvg fillColor={iconColor} />
                ) : keySvg === 'reply.svg' ? (
                    <ReplySvg fillColor={iconColor} />
                ) : keySvg === 'exclamationPoint.svg' ? (
                    <ExclamationPointSvg fillColor={iconColor} />
                ) : keySvg === 'negativeSentiment.svg' ? (
                    <NegativeSentimentIcon
                        width={iconWidth}
                        height={iconHeight}
                    />
                ) : keySvg === 'neutralSentiment.svg' ? (
                    <NeutralSentimentIcon
                        width={iconWidth}
                        height={iconHeight}
                    />
                ) : keySvg === 'positiveSentiment.svg' ? (
                    <PositiveSentimentIcon
                        width={iconWidth}
                        height={iconHeight}
                    />
                ) : keySvg === 'sendIcon.svg' ? (
                    <SendIconSvg />
                ) : keySvg === 'rowSelection.svg' ? (
                    <RowSelectionSvg />
                ) : keySvg === 'highlighter.svg' ? (
                    <HighlighterSvg />
                ) : keySvg === 'burgerIconDot.svg' ? (
                    <BurgerIconDotSvg />
                ) : keySvg === 'star' ? (
                    <StarFilledSvg />
                ) : keySvg === 'radioSentiment.svg' ? (
                    <RadioSentimentSvg fillColor={customColor} />
                ) : keySvg === 'itaFlag.svg' ? (
                    <ItaFlagIcon />
                ) : keySvg === 'esFlag.svg' ? (
                    <EsFlagIcon />
                ) : keySvg === 'enFlag.svg' ? (
                    <EnFlagIcon />
                ) : keySvg === 'plusIcon' ? (
                    <PlusSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'trashIcon' ? (
                    <TrashSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'copyIcon' ? (
                    <CopySvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'shareIcon' ? (
                    <ShareSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'editIcon' ? (
                    <EditSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'uploadSvg' ? (
                    <UploadSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'singlePencilSvg' ? (
                    <SinglePencilSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'infoIconSvg' ? (
                    <InfoIconSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'questionIconSvg' ? (
                    <QuestionIconSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'surveyIconSvg' ? (
                    <SurveyIconSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'puntiVenditaSvg' ? (
                    <PuntiVenditaSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'phoneSvg' ? (
                    <PhoneSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'worldSvg' ? (
                    <WorldSvg width={iconWidth} height={iconHeight} />
                ) : keySvg === 'checkmarkSvg' ? (
                    <CheckmarkSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'outlinedCheckmarkSvg' ? (
                    <OutlinedCheckmarkSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'peopleSvg' ? (
                    <PeopleSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'eyeSvg' ? (
                    <EyeSvg
                        width={iconWidth}
                        height={iconHeight}
                        fillColor={iconColor}
                    />
                ) : keySvg === 'duplicateDeleteIcon' ? (
                    <DuplicateDeleteSvg
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

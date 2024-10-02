import React from 'react';
import styles from './LoaderChart.module.scss';
import Line from './Loaders/Line';
import LineAdvanced from './Loaders/LineAdvanced';
import Table from './Loaders/Table';
import TableMaxi from './Loaders/TableMaxi';
import Horizontal from './Loaders/Horizontal';
import Vertical from './Loaders/Vertical';
import VerticalTooltip from './Loaders/VerticalTooltip';
import Circles from './Loaders/Circles';
import CirclesSmall from './Loaders/CirclesSmall';
import CirclesUnique from './Loaders/CirclesUnique';
import Reviews from './Loaders/Reviews';
import Chip from './Loaders/Chip';
import Area from './Loaders/Area';
import Card from './Loaders/Card';
import SunBurst from './Loaders/SunBurst';
import CardSurveys from './Loaders/CardSurveys';
import ListingHomeCard from './Loaders/ListingHomeCard';
import TableLastFeedbackHome from './Loaders/TableLastFeedbackHome';
import ListingAccordion from './Loaders/ListingAccordion';
import ListingEditMenu from './Loaders/ListingEditMenu';
import AnalisiInfoCard from './Loaders/AnalisiInfoCard';
import ListingAccordionSmall from './Loaders/ListingAccordionSmall';
import SmallTable from './Loaders/SmallTable';
import AnalysisTable from './Loaders/AnalysisTable';
import PostUpdate from 'Components/CardInsights/LoaderChart/Loaders/PostUpdate';
import SingleField from 'Components/CardInsights/LoaderChart/Loaders/SingleField';
import VerificationOptionsListing from 'Components/CardInsights/LoaderChart/Loaders/VerificationOptionsListing';
import SpanShimmerBG from 'Components/ShimmerBG/SpanShimmerBG';
import Calendar from 'Components/CardInsights/LoaderChart/Loaders/Calendar';
import PostRecap from 'Components/CardInsights/LoaderChart/Loaders/PostRecap';
import ListingPhotoShimmer from 'Components/CardInsights/LoaderChart/Loaders/ListingPhotoShimmer';
import ListingPostShimmer from 'Components/CardInsights/LoaderChart/Loaders/ListingPostShimmer';

function LoaderChart({ type = '', height, marginBottom, values, multi, reviewType, locationCount, numRows = 4, isSingle = false }) {


  return (
    <div className={
      type === 'line' || type === 'lineAdvanced' ? styles.chartLineAdv :
        type === 'table' || type === 'reviews' || type === 'tableLastFeedbackHome' || type === 'smallTable' ? styles.chartTable :
          type === 'circles' || type === 'circlesSmall' ? styles.chartCircles :
            type === 'circlesUnique' ? styles.chartChirclesCenter :
              type === 'vertical' ? styles.chartVertical :
                type === 'verticalTooltip' ? styles.chartVerticalTooltip :
                  type === 'horizontal' ? styles.chartHorizontal :
                    type === 'chip' ? styles.ulChip :
                      type === 'cardSurveys' ? styles.chartCardSurveys :
                        type === 'listingHomeCard' ? styles.listingHomeCardContainer :
                          type === 'analisiInfoCard' ? styles.analisiInfoCardContainer :
                            type === 'ListingEditMenu' ? styles.chartListingEditMenu :
                              type === 'listingAccordion' ? styles.chartListingAccordion :
                                type === 'verificationOptionListing' ? styles.modalContainer :
                                  type === 'calendar' ? styles.calendarContainer : styles.chart}>
      {
        type === 'line' ?
          <Line /> :
          type === 'postUpdate' ?
            <PostUpdate /> :
            type === 'postRecap' ?
              <PostRecap /> :
              type === 'singleField' ?
                <SingleField /> :
                type === 'sunburst' ?
                  <SunBurst /> :
                  type === 'card' ?
                    <Card /> :
                    type === 'area' ?
                      <Area /> :
                      type === 'calendar' ?
                        <Calendar /> :
                        type === 'lineAdvanced' ?
                          <LineAdvanced multi={multi} /> :
                          type === 'table' ?
                            <Table numRows={numRows}/> :
                            type === 'tableLastFeedbackHome' ?
                              <TableLastFeedbackHome /> :
                              type === 'tableMaxi' ?
                                <TableMaxi /> :
                                type === 'listingAccordion' ?
                                  <ListingAccordion /> :
                                  type === 'listingAccordionSmall' ?
                                    <ListingAccordionSmall /> :
                                    type === 'ListingEditMenu' ?
                                      <ListingEditMenu /> :
                                      type === 'horizontal' ?
                                        <Horizontal height={height} marginBottom={marginBottom} values={values} /> :
                                        type === 'vertical' ?
                                          <Vertical /> :
                                          type === 'verticalTooltip' ?
                                            <VerticalTooltip /> :
                                            type === 'circles' ?
                                              <Circles /> :
                                              type === 'circlesSmall' ?
                                                <CirclesSmall /> :
                                                type === 'circlesUnique' ?
                                                  <CirclesUnique /> :
                                                  type === 'reviews' ?
                                                    <Reviews type={reviewType} locationCount={locationCount} isSingle={isSingle}/> :
                                                    type === 'chip' ?
                                                      <Chip /> :
                                                      type === 'cardSurveys' ?
                                                        <CardSurveys /> :
                                                        type === 'listingHomeCard' ?
                                                          <ListingHomeCard /> :
                                                          type === 'analisiInfoCard' ?
                                                            <AnalisiInfoCard /> :
                                                            type === 'verificationOptionListing' ?
                                                              <VerificationOptionsListing /> :
                                                              type === 'smallTable' ?
                                                                <SmallTable /> :
                                                                type === 'listingPhoto' ?
                                                                  <ListingPhotoShimmer /> :
                                                                  type === 'listingPost' ?
                                                                    <ListingPostShimmer /> :
                                                                    type === 'analysisTable' ?
                                                                      <AnalysisTable /> :
                                                                      <div>
                                                                        <li>
                                                                          <SpanShimmerBG customStyle={{ height: '5%' }}
                                                                                         title=""></SpanShimmerBG>
                                                                        </li>
                                                                        <li>
                                                                          <SpanShimmerBG customStyle={{ height: '60%' }}
                                                                                         title=""></SpanShimmerBG>
                                                                        </li>
                                                                        <li>
                                                                          <SpanShimmerBG customStyle={{ height: '40%' }}
                                                                                         title=""></SpanShimmerBG>
                                                                        </li>
                                                                        <li>
                                                                          <SpanShimmerBG customStyle={{ height: '12%' }}
                                                                                         title=""></SpanShimmerBG>
                                                                        </li>
                                                                      </div>
      }
    </div>
  );
}

export default LoaderChart;
import styles from '../LoaderChart.module.scss';
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SpanShimmerBG from 'Components/ShimmerBG/SpanShimmerBG';


const DefaultReviews = () => {
  return <div style={{ marginTop: 100, width: '100%' }}>
    {
      MockForLoaders.numReviews.map((elm, index) => {
        return <div key={index} className={styles.reviewsContainer}>
          <div className={styles.reviewsDivWithMargin}>
            <SpanShimmerBG customStyle={{ width: 70, height: 70, borderRadius: '50%', top: '25%', left: '25%' }}
                           title="" />
            <SpanShimmerBG customStyle={{ width: '15%', height: 50 }} title="" />
            <SpanShimmerBG customStyle={{ width: '15%', height: 50 }} title="" />
            <SpanShimmerBG customStyle={{ width: '15%', height: 50 }} title="" />
            <SpanShimmerBG customStyle={{ width: '40%', height: 50 }} title="" />
          </div>
          <div>
            <SpanShimmerBG customStyle={{ width: '30%', height: 80, marginBottom: 50 }} title="" />
          </div>
          <div className={styles.reviewsDiv}>
            <SpanShimmerBG customStyle={{ width: '70%', height: 80 }} title="" />
            <SpanShimmerBG customStyle={{ width: '20%', height: 80 }} title="" />
          </div>
        </div>;
      })
    }
  </div>;
};

const IntegrationReviews = () => {
  const { t, i18n } = useTranslation();
  return <div style={{ marginLeft: 28 }}>
    <h2 className={[styles.smallH3, styles.smallH2].join(' ')}>
      {t('Accesso Richiesto')}
    </h2>
    <div className={styles.reviewIntegrationFlexContainer}>
      {

        MockForLoaders.numReviewsIntegrationWithLogin.map((elm, index) => {
          return <div key={index} className={styles.reviewsIntegrationContainer}>
            <div className={styles.reviewsIntegrationWithMargin}>
              <SpanShimmerBG customStyle={{ width: 90, height: 60, borderRadius: '50%' }} title=""></SpanShimmerBG>
              <div className={styles.integrationTextContainer}>
                <SpanShimmerBG customStyle={{ width: '60%', height: 20, marginBottom: '10px', marginTop: '5px' }}
                               title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{ width: '40%', height: 10 }} title=""></SpanShimmerBG>
              </div>
            </div>
          </div>;
        })
      }
    </div>
    <h2 className={[styles.smallH3, styles.smallH2].join(' ')}>
      {t('Accesso Libero')}
    </h2>
    <div className={styles.reviewIntegrationFlexContainer}>
      {
        MockForLoaders.numReviewsIntegrationWithoutLogin.map((elm, index) => {
          return <div key={index} className={styles.reviewsIntegrationContainer}>
            <div className={styles.reviewsIntegrationWithMargin}>
              <SpanShimmerBG customStyle={{ width: 90, height: 60, borderRadius: '50%' }} title=""></SpanShimmerBG>
              <div className={styles.integrationTextContainer}>
                <SpanShimmerBG customStyle={{ width: '60%', height: 20, marginBottom: '10px', marginTop: '5px' }}
                               title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{ width: '40%', height: 10 }} title=""></SpanShimmerBG>
              </div>
            </div>
          </div>;
        })
      }
    </div>
  </div>;
};

const IntegrationListings = () => {
  const { t, i18n } = useTranslation();
  return <div style={{ marginLeft: 28 }}>
    <h2 className={[styles.smallH3, styles.smallH2].join(' ')}>
      {t('Accesso Richiesto')}
    </h2>
    <div className={styles.reviewIntegrationFlexContainer}>
      {

        MockForLoaders.numReviewsIntegrationWithLogin.map((elm, index) => {
          return <div key={index} className={styles.reviewsIntegrationContainer}>
            <div className={styles.reviewsIntegrationWithMargin}>
              <SpanShimmerBG customStyle={{ width: 90, height: 60, borderRadius: '50%' }} title=""></SpanShimmerBG>
              <div className={styles.integrationTextContainer}>
                <SpanShimmerBG customStyle={{ width: '60%', height: 20, marginBottom: '10px', marginTop: '5px' }}
                               title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{ width: '40%', height: 10 }} title=""></SpanShimmerBG>
              </div>
            </div>
          </div>;
        })
      }
    </div>
  </div>;
};

const CompetitorReviews = () => {
  return <div className={styles.reviewCompetitorFlexContainer}>
    {
      MockForLoaders.numReviewsCompetitor.map((elm, index) => {
        return <div key={index}
                    className={index === 0 ? styles.reviewsMineCompetitorContainer : styles.reviewsCompetitorContainer}>
          <div className={styles.reviewsCompetitorWithMargin}>
            <SpanShimmerBG customClassName={styles.shimmerException}
                           customStyle={{ width: '40%', height: 30, top: '5%', left: '25%' }} title="" />
          </div>
          <div className={styles.reviewsCompetitorWithMargin}>
            <div className={styles.reviewsCompetitorWithMargin}>
              <SpanShimmerBG customClassName={styles.shimmerException} customStyle={{ width: '20%', height: 25 }}
                             title="" />
              <SpanShimmerBG customClassName={styles.shimmerException} customStyle={{ width: '20%', height: 25 }}
                             title="" />
              <SpanShimmerBG customClassName={styles.shimmerException} customStyle={{ width: '20%', height: 25 }}
                             title="" />
            </div>
          </div>
        </div>;
      })
    }
  </div>;
};

const IntegrationLocationReviews = ({ count, isSingle }) => {
  const reviewArr = Array(8).fill(1);
  return <div className={styles.reviewIntegrationLocationFlexContainer}>
    {
      !isSingle ? reviewArr.map((elm, index) => {
        return <div key={index} className={styles.reviewsIntegrationContainer}>
          <div className={styles.reviewIntegrationLocationTextContainer}>
            <SpanShimmerBG customStyle={{ width: '60%', height: 20, marginBottom: '10px', marginTop: '5px' }}
                           title="" />
            <SpanShimmerBG customStyle={{ width: '10%', height: 10 }} title="" />
            <SpanShimmerBG customStyle={{ width: '40%', height: 10, marginBottom: '10px', marginTop: '5px' }}
                           title="" />
          </div>
        </div>;
      }) : <div className={styles.reviewsIntegrationContainer}>
        <div className={styles.reviewIntegrationLocationTextContainer}>
          <SpanShimmerBG
            customStyle={{ width: '60%', height: 20, marginBottom: '10px', marginTop: '5px' }} title="" />
          <SpanShimmerBG customStyle={{ width: '10%', height: 10 }} title="" />
          <SpanShimmerBG
            customStyle={{ width: '40%', height: 10, marginBottom: '10px', marginTop: '5px' }} title="" />
        </div>
      </div>
    }
  </div>;
};

function Reviews({ type, locationCount, isSingle = false }) {
  return (
    <>
      {type === null || type === 'default' ? <DefaultReviews /> :
        type === 'integration' ? <IntegrationReviews /> :
          type === 'competitor' ? <CompetitorReviews /> :
            type === 'integrationLocation' ?
              <IntegrationLocationReviews count={locationCount} isSingle={isSingle} /> :
              type === 'listingsIntegration' ? <IntegrationListings /> :
                <DefaultReviews />}
    </>
  );
}

export default Reviews;
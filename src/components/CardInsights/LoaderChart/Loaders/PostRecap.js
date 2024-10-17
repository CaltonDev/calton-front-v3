import StyledArticle from 'Components/CardInsights/LoaderChart/styledComponents/StyledArticle';
import styles from '../../../../pages/ListingCreatePost/ListingCreatePost.module.scss';
import React from 'react';


function PostRecap () {
  return (
    <>
      <StyledArticle bgColor={'none'}>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
          <div style={{ marginBottom: 20, paddingLeft: 30, paddingRight: 30, background: 'white', marginRight: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="inputPostLabel" style={{ marginRight: 50 }}></div>
              <div className="photoBig" style={{ marginRight: 20 }}></div>
              <div className="textArea" style={{ width: 350, height: 100 }}></div>
              <div className="button"></div>
            </div>
          </div>
        </div>
      </StyledArticle>
    </>
  )
}

export default PostRecap
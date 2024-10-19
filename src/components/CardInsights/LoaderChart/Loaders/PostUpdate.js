import StyledArticle from 'Components/CardInsights/LoaderChart/styledComponents/StyledArticle';
import styles from '../../../../pages/ListingCreatePost/ListingCreatePost.module.scss';
import React from 'react';


function PostUpdate () {
  return (
    <>
      <StyledArticle bgColor={'none'}>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 20}}>
          <div style={{width: '60%', paddingLeft: 30, paddingRight: 30, background: 'white', marginRight: 30}}>
            <div className="inputPost" style={{width: '50%'}}></div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 50}}>
              <div className="textArea" style={{width: '60%', marginRight: 50}}></div>
              <div className="photo" style={{marginRight: 20}}></div>
              <div className="photo"></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 30}}>
              <div className="inputPost" style={{width: '25%', marginRight: 20}}></div>
              <div className="inputPost" style={{width: '50%'}}></div>
            </div>
          </div>
          <div style={{width: '40%', display: 'flex', justifyContent: 'space-around', background: 'white', marginLeft: 30}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className="inputPostLabel" style={{marginRight: 50}}></div>
              <div className="photoBig" style={{marginRight: 20}}></div>
              <div className="textArea" style={{width: 350, height: 100}}></div>
              <div className="button"></div>
            </div>
          </div>
        </div>
      </StyledArticle>
    </>
  )
}

export default PostUpdate
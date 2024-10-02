import React from 'react';
import StyledArticle from 'Components/CardInsights/LoaderChart/styledComponents/StyledArticle';

function PostPreview () {
  return (
    <>
      <StyledArticle style={{width: '20%', height: 'auto', marginTop: 10}}>
        <div className="labelInput"></div>
        <div className="loaderInput"></div>
      </StyledArticle>
    </>
  )
}

export default PostPreview
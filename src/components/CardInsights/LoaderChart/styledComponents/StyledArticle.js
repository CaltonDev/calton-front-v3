import React from 'react';
import styled from 'styled-components';


const StyledArticle = ({bgColor, children}) => {
  const StyledArticleComp  = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px 20px;
  box-sizing: border-box;
  border-radius: 10px;

  .line{
    width: 100%;
    height: 100px;
    background: #ddd;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    margin: 20px 0;
    border-radius: 25px;
  }


  .lineSmall{
    width: 100%;
    height: 20px;
    background: #ddd;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    margin: 20px 0;
    border-radius: 25px;
  }
  
   .accordion{
    width: 100%;
    height: 120px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }

    .inputVerificationOptions {
        width: 100%;
        height: 70px;
        background: #ddd;
        margin: 20px 0;
        background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    }
  .labelInput {
    width: 80%;
    height: 20px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }

  .loaderInput {
    width: 100%;
    height: 60px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
  
   .shimmerTable{
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    animation: shimmer 2s infinite linear;
  }

   .input{
    width: 100%;
    height: 80px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }

  .inputPostLabel{
    width: 250px;
    height: 50px;
    background: #ddd;
    margin: 20px 0;
    border-radius: 20px;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
  
  .inputPost{
    width: 100%;
    height: 80px;
    background: #ddd;
    margin: 20px 0;
    border-radius: 20px;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
    .textArea{
      width: 100%;
      height: 150px;
      background: #ddd;
      margin: 20px 0;
      border-radius: 20px;
      background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    }

    .photo{
      width: 150px;
      height: 150px;
      background: #ddd;
      margin: 20px 0;
      border-radius: 20px;
      background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    }
  
  .photoBig{
    width: 350px;
    height: 350px;
    background: #ddd;
    margin: 20px 0;
    border-radius: 20px;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
  
  .button {
    width: 200px;
    height: 80px;
    background: #ddd;
    margin: 20px 0;
    border-radius: 20px;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
  .divider {
    width: 5px;
    margin: 20px 50px;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }
  .inputLong{
    width: 500px;
    height: 80px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }

   .inputShort{
    width: 350px;
    height: 80px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  }


   .card{
    width: 400px;
    height: 540px;
    background: #ddd;
    margin: 20px 0;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    border-radius: 20px;
    border: #ddd;
  }

   .shimmerHorizontalBG{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    animation: shimmer 2s infinite linear;
  }
    @-webkit-keyframes shimmer {
        0% {
            background-position: -100% 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    @keyframes shimmer {
        0% {
            background-position: -1200px 0;
        }
        100% {
            background-position: 1200px 0;
        }
    }

    @keyframes shimmerTable{
        from {
            transform: translateX(-200%);
        }
        to{
            transform: translateX(200%);
        }
    }
    
    background: ${props =>  (bgColor ? bgColor : '#FFFFFF')};
`;
  return <StyledArticleComp>{children}</StyledArticleComp>
}
export default StyledArticle;
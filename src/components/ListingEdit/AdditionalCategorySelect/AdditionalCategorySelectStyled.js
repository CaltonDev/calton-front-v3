import styled from 'styled-components';
import { Select } from 'antd';


export const StyledMenu = styled.div`
  .rc-virtual-list-holder-inner {
    .ant-select-item {
        padding: 0px;
        width: 100%;
    }

    div:not(:last-child) {
    .ant-select-item-option-content {
          width: 100%;
        }
      }
    }

    .ant-select-item-option-content {
        line-height: 45px;
        width: 100%;
    }
`;

export const StyledSelect = styled(Select)`
    .ant-select-arrow {
        margin-top: 0 !important;
    }
    .ant-select {
    width: 20% !important;
    margin-bottom: 20px;
  }
  .ant-select .sc-ksJisA .bWRdNs .css-dev-only-do-not-override-byeoj0 .ant-select-single .ant-select-show-arrow{
    width: 20% !important;
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
      margin-bottom: 0.5rem;
      font-family: "Montserrat", "Heebo", sans-serif !important;
      height: 2.5rem;
      border-radius: 25px !important;
      font-size: 16px;
      border: 1.5px solid #321D48;
      color: black;
      font-weight: 500;
    }
    .ant-select-selection-item{
        color: black;
    }
    .ant-select:focus {
      border: 1.5px solid #321D48;
    }
  
    .ant-select-selector {
      width: 100%;
    }
  
    .ant-select-arrow{
      margin-top: 0;  
    }
`;
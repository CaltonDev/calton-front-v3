import * as React from "react";
import styled from "styled-components";
import { Dropdown } from 'antd';

const AntDropdownStyled = styled(Dropdown)`
    .ant-dropdown .ant-dropdown-menu {
        padding: 6px;
    }
`
function AntDropdown({id, autoFocus, type, placement, overlayStyle, menu, trigger, arrow, children, open, items }) {

    
    return (
      <AntDropdownStyled open={open} id={id} autoFocus={autoFocus} type={type} placement={placement} overlayStyle={overlayStyle} overlay={menu} menu={items} trigger={trigger} arrow={arrow}>
        {children}
      </AntDropdownStyled>
    );
}

export default AntDropdown



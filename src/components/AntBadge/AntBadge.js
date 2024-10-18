import * as React from "react";
import styled from "styled-components";
import { Badge } from 'antd';

const AntBadgeSyled = styled(Badge)`
    .ant-badge-status-dot {
        width: 20px !important;
        height: 20px !important;
    }
`

function AntBadge({count, size, color}) {
    return (
        <AntBadgeSyled color={color} count={count} size={size} />
    );
}

export default AntBadge



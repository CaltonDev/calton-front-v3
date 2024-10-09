import React from 'react'
import { Column, ColumnConfig } from '@ant-design/plots'

function HorizontalBar(config: ColumnConfig) {
    return (
        <div style={{ width: '100%' }}>
            <Column {...config} />
        </div>
    )
}

export default HorizontalBar

import React from 'react'
import { Column } from '@ant-design/plots'

function HorizontalBar(config: any) {
    return (
        <div style={{ width: '100%' }}>
            <Column {...config.config} />
        </div>
    )
}

export default HorizontalBar

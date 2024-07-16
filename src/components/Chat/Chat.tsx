import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './Chat.module.scss'
function Chat() {
    return (
        <div className={styles.container}>
            <SvgWrapper
                customWidth={30}
                customHeight={30}
                hasContainerProps={{
                    hasContainer: true,
                    containerSize: 55,
                    background: 'black',
                }}
                keySvg={'chatIcon.svg'}
            />
        </div>
    )
}

export default Chat

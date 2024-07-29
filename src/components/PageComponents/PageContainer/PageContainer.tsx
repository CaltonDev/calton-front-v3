import React from 'react'
import { PageContainerProps } from './PageContainer.interface'
import styles from './PageContainer.module.scss'

function PageContainer({ children }: PageContainerProps) {
    return <div className={styles.container}>{children}</div>
}

export default PageContainer

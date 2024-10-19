import styles from "../LoaderChart.module.scss";
import LoaderChart from '../LoaderChart';


import React from 'react';
function AnalysisTable() {
    return (
        <div style={{width: '100%', marginTop: 20}}>
          <div style={{paddingLeft: 20, paddingRight: 20, display: 'flex', justifyContent: 'space-between'}}>
            <div className={styles.block} />
            <div className={styles.headerBtn} />
          </div>
          <LoaderChart type={'table'}/>
        </div>
    )
}

export default AnalysisTable
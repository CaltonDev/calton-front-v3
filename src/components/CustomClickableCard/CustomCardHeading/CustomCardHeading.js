import React from 'react';
import styles from "./CustomCardHeading.module.scss"

const CustomCardHeading = ({ title }) => (
    <div>
        <h4 className={styles.rctBlockTitle}><b>{title}</b></h4>
    </div>
);

export default CustomCardHeading;

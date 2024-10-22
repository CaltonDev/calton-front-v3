import styles from "./SingleButtonSave.module.scss";
import save_svg from "../../../assets/img/saveIcon.svg";
import {Tooltip} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";


function SingleButtonSave({callback, typeEdit}) {
    const {t, i18n} = useTranslation();

    return (
        <Tooltip title={t('Salva')}>
            <img onClick={() => {
                if(callback) {
                    callback(typeEdit)
                }
            }} className={styles.imageSave} src={save_svg}/>
        </Tooltip>
    );

}

export default SingleButtonSave
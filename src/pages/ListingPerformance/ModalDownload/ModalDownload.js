import styles from "./ModalDownload.module.scss";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import React from "react";
import { useTranslation } from 'react-i18next';
import {getTranslateFromGroupBy} from '../../../utils/FilterHelper'
import AntModal from 'Components/AntModal/AntModal';


function ModalDownload({displayDownload, closeModal, groupby, onDownload, isDownloading}) {
    const {t} = useTranslation()

    return (
        <AntModal
          open={displayDownload}
          onCancel={() => closeModal()}
          ariaLabelledby="alert-dialog-title"
          ariaDescribedby="alert-dialog-description"
          centered={true}
          footer={null}
        >
            <span style={{fontWeight: "bold", fontSize: "large"}}>
                {t("Scarica fonti")}
            </span>
                <>
                    <div style={{width: 450, marginBottom: 30, marginTop: 10}}>
                        {t("Scarica fonti ora")}
                        <br/>
                        {t("Scarica fonti body")} <b>{getTranslateFromGroupBy(groupby, t)} </b>
                    </div>
                    <div className={styles.buttonDownload}>
                            <span onClick={() => onDownload('date')}
                                  className={styles.linkText}>
                                {t("Scarica con groupBy")}
                            </span>

                        <PrimaryButton onClickButton={() => onDownload()}
                                       nameButton={t("Scarica")}
                                       width={'40%'}
                        />
                    </div>
                </>

        </AntModal>
    )

}

export default ModalDownload
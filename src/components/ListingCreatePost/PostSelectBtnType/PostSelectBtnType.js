import styles from './PostSelectBtnType.module.scss';
import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { StyledMenu, StyledSelect} from '../StyledSelect/StyledSelect';
import { btnTypesList } from 'Constants/CustomConstant';

function PostSelectBtnType({ post, setPost }) {

    const { t, i18n } = useTranslation();

    const handleSetBtnType = (obj) => {
        let tmpPost = JSON.parse(JSON.stringify(post))
        if (tmpPost.callToAction) {
            tmpPost.callToAction.actionType = obj?.value
        } else {
            tmpPost.callToAction = {
                actionType: obj?.value,
                url: ""
            }
        }
        setPost(tmpPost)
    }

    useEffect(() => {
      //set default none btn type
      handleSetBtnType(btnTypesList[0])
    }, []);

    return (
      <>
          <StyledSelect
            placeholder={t('Aggiungi pulsante')}
            filterOption={false}
            style={{width: '35%', marginBottom: '20px', marginRight: '40px'}}
            value={post?.callToAction?.actionType ? btnTypesList.find((btnType) => btnType.value === post?.callToAction?.actionType) : btnTypesList[0]}
            onChange={(value) => handleSetBtnType(JSON.parse(value))}
            dropdownRender={(menu) => <StyledMenu>
                <div
                  className={styles.containerSearchLabel}>{t('Cerca per mostrare nuovi elementi')}</div>
                {menu}</StyledMenu>}
          >
              {btnTypesList?.map((type) => (
                <Select.Option key={type.value}
                               value={JSON.stringify(type)}
                               className={styles.menuItem}
                >
                    {t(type.label)}
                </Select.Option>
              ))}
          </StyledSelect>
      </>
    );
}

export default PostSelectBtnType;
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { btnTypesList } from '../../../constants/CustomConstants'
import { PostSelectBtnTypeProps } from './PostSelectBtnType.interface'
import CaltonSelect from '../../Select/Select'

function PostSelectBtnType({ post, setPost }: PostSelectBtnTypeProps) {
    const { t, i18n } = useTranslation()

    const handleSetBtnType = (obj: any) => {
        const tmpPost = JSON.parse(JSON.stringify(post))
        if (tmpPost.callToAction) {
            tmpPost.callToAction.actionType = obj?.value
        } else {
            tmpPost.callToAction = {
                actionType: obj?.value,
                url: '',
            }
        }
        setPost(tmpPost)
    }

    useEffect(() => {
        //set default none btn type
        handleSetBtnType(btnTypesList[0])
    }, [])

    return (
        <>
            <CaltonSelect
                value={
                    post?.callToAction?.actionType
                        ? btnTypesList.find(
                              (btnType) =>
                                  btnType.value ===
                                  post?.callToAction?.actionType
                          )
                        : btnTypesList[0]
                }
                onChange={(value) => handleSetBtnType(value)}
                options={btnTypesList}
            />
        </>
    )
}

export default PostSelectBtnType

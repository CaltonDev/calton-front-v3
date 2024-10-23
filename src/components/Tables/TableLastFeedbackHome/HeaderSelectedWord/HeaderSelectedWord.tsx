import React from 'react'
import Tooltip from '../../../Tooltip/Tooltip'
import { useDispatch } from 'react-redux'
import { setSelectedWord } from '../../../../store/home/selectedWordsSlice'
import { IoMdClose, IoMdEye } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { HeaderSelectedWordProps } from './HeaderSelectedWord.interface'
import { setWordSearched } from '../../../../store/search/search'

function HeaderSelectedWord({
    word,
    color,
    countFeed,
}: HeaderSelectedWordProps) {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { t } = useTranslation()

    const closeWord = () => {
        const payload = {
            word: null,
            sentiment: null,
            isText: false,
        }
        dispatch(setSelectedWord(payload))
    }

    return (
        <div
            className={'row'}
            style={{
                backgroundColor: word ? color : '',
                padding: '2%',
                borderRadius: '65px',
                fontSize: '15px',
                marginTop: '30px',
                color: 'white',
                width: '98%',
                alignSelf: 'center',
            }}
        >
            <div className={'col-md-5'}>
                <span>
                    {t('Parola')}{' '}
                    <span style={{ fontWeight: 700 }}>{word}</span>
                </span>
            </div>
            <div className={'col-md-5'}>
                <span>
                    {t('Totale')}{' '}
                    <span style={{ fontWeight: 700 }}>
                        {word && word != '' && countFeed}
                    </span>
                </span>
            </div>
            <div className={'col-md-1'}>
                {word && (
                    <Tooltip title={t('Mostra tutti')}>
                        <IoMdEye
                            style={{ fontSize: 20, cursor: 'pointer' }}
                            onClick={async () => {
                                dispatch(setWordSearched('"' + word + '"'))
                                history('../reviews', {
                                    state: { search: '"' + word + '"' },
                                })
                            }}
                        />
                    </Tooltip>
                )}
            </div>
            <div className={'col-md-1'}>
                {word && (
                    <Tooltip title="Rimuovi">
                        <IoMdClose
                            style={{ fontSize: 20, cursor: 'pointer' }}
                            onClick={() => closeWord()}
                        />
                    </Tooltip>
                )}
            </div>
        </div>
    )
}

export default HeaderSelectedWord

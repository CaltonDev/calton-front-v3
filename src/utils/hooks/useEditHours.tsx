import { useMutation } from 'react-query'
import { editHours, ListingServiceBody } from '../../services/ListingService'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { showToast } from '../../store/toast/errorToastSlice'

interface useEditHoursResponse {
    aVers: string
    code: number
    done: number
    error: number
    idTask: string
    message: string
    tot: number
}

function useEditHours() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    return useMutation(
        (params: ListingServiceBody) => {
            const {
                hours,
                listingsName = [],
                isRegular = true,
                isSpecial = false,
                isMore = false,
                isNotSpecified = false,
                isTemporarilyClosed = false,
                isPermanentlyClosed = false,
                toOverwrite = false,
            } = params
            return editHours({
                hours,
                listingsName,
                isRegular,
                isSpecial,
                isMore,
                isNotSpecified,
                isTemporarilyClosed,
                isPermanentlyClosed,
                toOverwrite,
            })
        },
        {
            onSuccess: (response: useEditHoursResponse) => {
                if (response?.idTask) {
                    const message =
                        t('Caricati ') +
                        response?.done +
                        ' / ' +
                        response?.tot +
                        ' ' +
                        t('Orari')
                    dispatch(
                        showToast({
                            type: 4,
                            idTask: response.idTask,
                            pendingText: message,
                            position: 'bottom-right',
                            autoClose: 900000,
                        })
                    )
                }
            },
            onError: (error) => {
                console.log('Error editing hours: ', error)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Edit hours non riuscita'),
                    })
                )
            },
        }
    )
}

export default useEditHours

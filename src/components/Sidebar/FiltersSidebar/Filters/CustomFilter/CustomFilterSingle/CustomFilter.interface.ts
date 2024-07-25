import { CustomPayload } from '../../../Filter/Filter.interface'

export interface CustomFilterSingleProps {
    customFilterId: string
    setPreparedPayload: (arg0: CustomPayload | null) => void
}

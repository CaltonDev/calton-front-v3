export interface ReviewCardProps {
    feedback: any
    index: number
    handleClickChangeSentiment: (arg0: number, arg1: number) => void
    handleChangeAnswer: (arg0: any, arg1: number, arg2: boolean) => void
    smartResponses: any[]
    handleChangeSmartResponse: (arg0: number, arg1: number) => void
    handleChangeTopic: (arg0: any, arg1: number) => void
    isFromCompetitor?: boolean
}

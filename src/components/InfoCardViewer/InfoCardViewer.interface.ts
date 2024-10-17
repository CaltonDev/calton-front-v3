type InfoCardViewerData = {
    title: string
    body: string
}

export interface InfoCardViewerProps {
    data: InfoCardViewerData[]
    customWidth?: string
}

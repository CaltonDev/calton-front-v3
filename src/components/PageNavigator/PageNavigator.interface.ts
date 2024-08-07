export interface PageNavigatorProps {
    pageElements: number
    totalElements: number
    currentPage: number
    changePage: (arg0: string) => void
    changeElementsPerPage: (arg0: string) => void
}

interface ListingLocationState {
    verified: {
        yes: boolean | null
        no: boolean | null
    }
    pendingVerification: {
        yes: boolean | null
        no: boolean | null
    }
    isDuplicated: {
        yes: boolean | null
        no: boolean | null
    }
    missedStoreCode: {
        yes: boolean | null
        no: boolean | null
    }
}

export interface AllFiltersInterface {
    dis1day: boolean
    dis7days: boolean
    dis1month: boolean
    dis3months: boolean
    dis6months: boolean
    dis1year: boolean
    selectedTime: string
    selectedProducts: string[]
    groupby: string
    selectedSource: string[]
    sourceName: string | null
    startDate: string // YYYY-MM-DD format
    endDate: string // YYYY-MM-DD format
    labelDate: string
    selectedChannel: string[]
    selectedLocation: string[]
    selectedLocationDetails: string[]
    selectedLocationListing: string[]
    listingLocationState: ListingLocationState
    selectedTopics: string[]
    selectedTopicsDetails: string | null
    customFilters: any[] // Update to more specific type if known
    customFiltersSelectable: any[] // Update to more specific type if known
    feedbackFilters: any[] // Update to more specific type if known
    selectedProductsDetails: string | null
}

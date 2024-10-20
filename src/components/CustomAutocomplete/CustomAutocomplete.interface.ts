export interface CustomAutocompleteProps {
    label?: string
    placeholderInput?: string
    primary?: string
    secondary?: string
    type?: string
    multiple?: boolean
    handleChange?: (event: any, type: string) => void
    labels?: any
    defaultValue?: any
    customCheckEquality?: any
    isButton?: boolean
    classes?: any
    disabled?: boolean
    displayType?: string
    floatingDisplay?: boolean
    name?: string
    isThick?: boolean
    hasDropdown?: boolean
    applySelection?: () => void
    hasIcons?: boolean
    fullwidth?: boolean
    isFromReview?: boolean
}

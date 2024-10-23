export interface PostEventProps {
    validatePostFields: any
    formikProps: any
    post: any
    setPost: (arg0: any) => void
    imagesWithError: any[]
    isFromPopper?: boolean
}

export interface CustomInputProps {
    value?: string
    onClick?: () => void
}

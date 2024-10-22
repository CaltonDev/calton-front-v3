export interface ConfirmModalProps {
    title: string
    content: string
    okText: string
    cancelText: string
    onCancel?: () => void
    onOk?: () => void
}

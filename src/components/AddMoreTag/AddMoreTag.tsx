import styles from './AddMoreTag.module.scss'
import Button from '../Button/Button'
import React from 'react'

interface AddMoreTagProps {
    nameToBeAdded: string
    onClick: (hoursTypeId: string) => void
    hoursTypeId: string
}

const AddMoreTag = ({
    nameToBeAdded,
    onClick,
    hoursTypeId,
}: AddMoreTagProps) => {
    return (
        <Button
            className={styles.container}
            onClick={() => onClick(hoursTypeId)}
            variant={'outline'}
            size={'small'}
            arrowPlacement={'left'}
            icon={'plusIcon'}
            iconColor={'secondary'}
        >
            {nameToBeAdded}
        </Button>
    )
}

export default AddMoreTag

import React from 'react'
import Input from '../Input/Input'
import { SearchBarProps } from './SearchBar.interface'
import styles from './SearchBar.module.scss'
const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
    return (
        <div className={styles.container}>
            <Input
                size={'xlarge'}
                prefix={'searchSvg'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar

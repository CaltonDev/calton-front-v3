import React from 'react'
import Input from '../Input/Input'
import { SearchBarProps } from './SearchBar.interface'

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
    return (
        <div>
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

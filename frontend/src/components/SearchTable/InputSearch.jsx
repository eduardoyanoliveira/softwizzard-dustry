import React, { useState} from 'react';
import Input from '../Input';
import SearchCircle from '../SearchCircle';
import { SearchContainer, SearchField, SearchHeader, SearchWrapper } from './styles';

function InputSearch({fieldName, handleClick, handleInputChange}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        handleInputChange && handleInputChange();
        setInputValue(e.target.value)
    }

    return (
        <SearchHeader>
            <SearchField>
            {fieldName}:
            </SearchField>
            <SearchContainer>
                <Input
                    background={'backgroundDark'}
                    name={'search'}
                    inputType={'text'}
                    handleChange={handleChange}
                    value={inputValue}
                />
                <SearchWrapper />
                <SearchCircle handleClick={() => handleClick(inputValue)} small={true}/>
            </SearchContainer>
        </SearchHeader>
    );
}

export default InputSearch;

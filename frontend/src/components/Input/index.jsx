import React, { useState} from 'react';
import { Input } from './styles';

function InputComponent({
  height = '38px',
  name,
  placeholder, 
  inputType, 
  handleChange, 
  handleKeyDown, 
  handleBlur, 
  handleFocus,
  value,
  background = 'backgroundLight',
  disabled = false
}) {
  const [inputValue, setInputValue] = useState('');

  const thisHandleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
 
    <Input 
      background={background}
      type={inputType}
      height={height}
      placeholder={placeholder}
      name={name}
      value={value ? value : inputValue}
      onChange={(e) => {handleChange(e); thisHandleChange(e)}}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />

  )
}

export default React.memo(InputComponent);

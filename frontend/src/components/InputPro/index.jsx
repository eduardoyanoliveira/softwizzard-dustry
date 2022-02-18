import React from 'react';

import Input from '../Input';
import { Header, RequiredMsg, Container } from './styles';

function InputProComponent({
  margin,
  title, 
  placeholder, 
  name,
  maxWidth = '520px',
  inputType, 
  handleChange, 
  handleKeyDown, 
  handleBlur, 
  handleFocus,
  value,
  validMsg,
  disabled = false
}) {
  return (
    <>
      <Container margin={margin} maxWidth={maxWidth}>

        <Header>
          {title}
        </Header>
        <Input 
          inputType={inputType}
          placeholder={placeholder}
          value={value}
          name={name}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </Container>
      {
        // If the required field is true and the imput value is empty then gives the default message
        // If the required field is true and the message for the input is not empty , then gives the message
        (validMsg || !value)  && (
          <RequiredMsg>
            {validMsg}
          </RequiredMsg>
        )
      }
    </>
  )
}

export default React.memo(InputProComponent);

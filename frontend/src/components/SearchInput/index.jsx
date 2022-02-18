import React, { useState } from 'react';
import { fieldContains } from '../../Utils/gridMethods';
import Input from '../Input';
import InputPro from '../InputPro';
import { Container, RequiredMsg } from './styles';

// data => array of objects to create a search
// field => field to search on the objects
// captureValue => function to handle whenever a object is selected , ** Usally sets the object to a useState on the father component
// handleChangeFather => after every input change , does an action on the father component

function SearchInput({
  title, 
  placeholder, 
  data, 
  field, 
  captureValue,
  handleChangeFather, 
  margin, 
  background, 
  maxWidth,
  value = '',
  validMsg,
  pro = false,
  disabled = false,
}) {
  // the value that fills the input whenever it's changed
  const [inputValue, setInputValue] = useState('');

  // Decides if the component has a pro style or not 
  const InputComponent = pro ? InputPro : Input;

  const handleChange = (e) => {
    handleChangeFather && handleChangeFather();

    setInputValue(e.target.value);
    // Open the dropdown with the matches

  };

  // When the user makes the last interection on the input , it checks if there is a object matching the current input value
  const closeInput = () => {
    const currentResult = fieldContains(field, inputValue, data, false);
    if(currentResult.length > 0  && inputValue.length > 0){
      captureValue(currentResult[0]);
      setInputValue(currentResult[0][field]);
    };
  };

  const handleBlur = () => {
    closeInput();
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 'Tab'){
      closeInput();
    }
  }


  return (
    <>
      <Container margin={margin}>
        <InputComponent 
          maxWidth={maxWidth}
          title={title} 
          inputType={'text'} 
          handleChange={handleChange} 
          handleKeyDown={handleKeyDown}
          handleBlur={handleBlur}
          // if the input value is empty and a initial value was recived on props and the reason of the input value to be empty is not cause the user cleaned it
          value={!inputValue && value ? value : inputValue} 
          background={background}
          placeholder={placeholder}
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

export default React.memo(SearchInput);

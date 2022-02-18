import React, { useState} from 'react';
import { fieldContains } from '../../Utils/gridMethods';
import Input from '../Input';
import InputPro from '../InputPro';
import Checkbox from '../Checkbox';
import { Container, DataContainer, DataContent, Datarow, RequiredMsg, RowText } from './styles';

// data => array of objects to create a search
// field => field to search on the objects
// captureValue => function to handle whenever a object is selected , ** Usally sets the object to a useState on the father component
// handleChangeFather => after every input change , does an action on the father component

function AutoComplete({
  title, 
  placeholder, 
  data, 
  field, 
  captureValue,
  handleChangeFather, 
  margin, 
  disabled = false,
  value = '',
  validMsg,
  maxWidth = '520px',
  pro = false,
  checkbox = false
}) {
  // the value that fills the input whenever it's changed
  const [inputValue, setInputValue] = useState('');
  const [currentData, setCurrentData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);

  // Decides if the component has a pro style or not 
  const InputComponent = pro ? InputPro : Input;

  React.useEffect(() => {
    setCurrentData((cd) => cd = data);
  },[data]);



  const handleChange = (e) => {
    handleChangeFather && handleChangeFather();

    setInputValue(e.target.value);
    // Open the dropdown with the matches
    setOpen(true);
    // Set the varible filteredData with the objects that matches the  inputContent
    setFilteredData(fieldContains(field, e.target.value, currentData));
    // If no one object is returned above , it closes the dropdown
    fieldContains(field, e.target.value, currentData).length === 0  && setOpen(false);
  };

  // When the user makes the last interection on the input , it checks if there is a object matching the current input value
  const closeInput = () => {
    const currentResult = fieldContains(field, inputValue, data, false);
    if(currentResult.length > 0){
      captureValue(currentResult[0]);
      setInputValue(currentResult[0][field]);
      setOpen(false);
    };
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 'Tab'){
      closeInput();
    }
  }

  const handleClick = (item) => {
    // Takes the selected object to the componet's father
    captureValue(item);
    // Sets the inputValue with the objected selected
    setInputValue(item[field]);
    // Closes the dropdown
    setOpen(false);
  };

  return (
    <>
      <Container margin={margin} maxWidth={maxWidth}>
        <InputComponent 
          title={title} 
          inputType={'text'} 
          handleChange={handleChange} 
          handleKeyDown={handleKeyDown}
          // if the input value is empty and a initial value was recived on props and the reason of the input value to be empty is not cause the user cleaned it
          value={!inputValue && value && !open ? value : inputValue} 
          maxWidth={maxWidth}
          placeholder={placeholder}
          disabled={disabled}
        />
        <DataContainer
          // if the input has a value and the "open" varible is true , opens the dropdown
          enabled={inputValue && open}
        >
          <DataContent>
            {
              filteredData.map((item, id) => {
                return(
                  <Datarow
                    key={id}
                    onClick={() => handleClick(item)}
                  >
                    <span>
                      {item.id ? item.id : id + 1}.
                    </span>
                    <RowText>
                      {item[field]}
                    </RowText>
                    <div>
                      {
                        checkbox && (
                          <Checkbox active={item['active']}/>
                        )
                      }
                    </div> 
                  </Datarow>
                
                )
              })
            }           
          </DataContent>
        </DataContainer>
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

export default React.memo(AutoComplete);

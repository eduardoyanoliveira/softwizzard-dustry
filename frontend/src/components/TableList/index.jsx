import React, { useState, useEffect, useCallback} from 'react';
import { BsCheckLg } from 'react-icons/bs'

import TableComponent from '../Table/Table';
import CircleButtonComponent from '../CircleButton';
import AutoComplete from '../AutoComplete';
import InputPro from '../InputPro';

import { findsByField, removeById, tableToJson, makeListByField } from '../../Utils/gridMethods';
import { Container, FormContainer, Header, InputContainer, RequiredMsg, TableContainer } from './styles';


// searchData => dataset with the values to search on the autocomplete
// data => the data that is already bond to the register
// field => Field on current data to search when removing the current data from the search options
// handleDelClick => action trigger whenever a row delete icon is clicked
function TableListComponent({
    title, 
    searchData, 
    margin, 
    field, 
    columns = [], 
    data = [],
    tableId,
    validMsg,
    unique,
    maxWidth = '520px',
    hasDelete = true,
}) {
    const [required, setRequired] = useState(false)
    const [formOpen, setFormOpen]  = useState(false);
    const [searchOptions , setSearchOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState({
        object: null, qty: ''
    });
    const [thisData, setThisData] = useState(data);
    const [counter, setCounter] = useState(0);

    const identifier = findsByField('identifier', true, columns)[0].name;

    // Sets the counter with the number of rows already established on table
    useEffect(() => {
        for(let i = 1; i <= data.length; i++){
            setCounter(i)
        }
    },[data]);

    // Loads the data on the searchOptions
    useEffect(() => {
        setSearchOptions((d) => d = searchData);
    },[searchData, data]);

    // Removes the current established data from the search options to prevent duplicated values
    useEffect(() => {

        if(unique){
            for(let i in data){
                setSearchOptions((s) => removeById('id', data[i][field], s))
            }
        }

        setThisData((prev) => prev = data ? data : []);
    },[data, field, unique]);

    
    // Capture the value from AutoComplete component
    const captureValue = (value) => {
        setSelectedValue({...selectedValue, object: value})
    };

    const handleChangeQty = useCallback((e) => {
        setSelectedValue((prev) => ({ ...prev, qty: e.target.value}))
    },[]);

    const handleClickAdd = () => {

        // If The user tries to save without givin' a value to quantity field, the screen will asks for a value
        if(selectedValue.object && selectedValue.qty.length === 0){
            setRequired(true);
            return;
        } 

        if(selectedValue.object && selectedValue.qty){
            // Sets the data to add in the table , must be exactly in the same sequence as the columns
            const data = {};
            data['id']= counter + 1;
            data[identifier] = selectedValue.object.id;
            data['name'] = selectedValue.object.name;
            data['quantity'] = selectedValue.qty;
            data['deletable'] = true

            // Increments the id field
            setCounter(counter + 1);

            setThisData((prev) => [
                ...prev,
                data
            ]);

            if(unique){
                // Removes the object from search options to avoid duplication
                setSearchOptions(removeById('id', selectedValue.object.id, searchOptions));
            }

            // Resets the values 
            setSelectedValue({object: null, qty: ''});
            setRequired(false)
        }
        setFormOpen(!formOpen);
    };

    const handleDelete = (id) => {
        const currentData = tableToJson(document.getElementById(tableId), columns);
        const deleteRow = findsByField('id', id, currentData);

        const data = {
            id: deleteRow[0][identifier],
            name: deleteRow[0].name,
        };

        const indexOfId = [deleteRow[0][identifier]].filter(value => makeListByField(searchOptions, 'id').includes(value));

        // Checks if the searchOptions already has the value, to avoid duplication 
        if(indexOfId.length <= 0 ){
            setSearchOptions((prev) => [...prev, data]);
        }
        // Deletes the data
        setThisData(removeById('id', id, currentData));

    };

    const handleEnterClick = (event) => {
        if(event.key === 'Enter' && selectedValue.qty){
            handleClickAdd();
        }
    }

    return (
        <>
            <Container margin={margin} maxWidth={maxWidth}>
                {
                    formOpen ? (
                        <FormContainer>
                            <InputContainer>
                                <AutoComplete 
                                    title={title} 
                                    pro={true} 
                                    data={searchOptions} 
                                    field={'name'}
                                    placeholder={'Pesquise'}
                                    captureValue={captureValue}
                                />
                            </InputContainer>
                            {
                                (selectedValue.object  && (
                                    <InputContainer>
                                        <InputPro 
                                            title={'Quantidade'}
                                            inputType={'number'}
                                            required={required}
                                            value={selectedValue.qty}
                                            handleChange={handleChangeQty}
                                            handleKeyDown={handleEnterClick}
                                        />
                                    </InputContainer>
                                ))
                            }
                        </FormContainer>
                        
                    )
                    :
                    (
                        <TableContainer>
                            <Header>
                                {title}
                            </Header>
                            <TableComponent 
                                columns={columns} 
                                data={thisData} 
                                id={tableId} 
                                handleDelete={hasDelete && handleDelete}
                            />
                        </TableContainer>
                    )
                }
                {
                    formOpen ? (
                        <CircleButtonComponent 
                            margin={'10px 0'} 
                            handleClick={handleClickAdd} 
                            icon={<BsCheckLg/>}
                            background={'PRIMARY'}
                        />
                    )
                    :
                    (
                        <CircleButtonComponent margin={'10px 0'} handleClick={handleClickAdd}/>
                    )
                }
            </Container>
            {
                // If the required field is true and the imput value is empty then gives the default message
                // If the required field is true and the message for the input is not empty , then gives the message
                (validMsg || thisData.length === 0)  && (
                <RequiredMsg>
                    {validMsg}
                </RequiredMsg>
                )
            }
        </>
    )
}

export default React.memo(TableListComponent);

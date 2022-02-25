import React, { useState } from 'react';

import { BsCheckLg } from 'react-icons/bs'

import ListItemComponent from './item';
import CircleButtonComponent from '../CircleButton';
import AutoComplete from '../AutoComplete';

import { removeById, findsByField } from '../../Utils/gridMethods';
import { CenterContainer, Container, Header, RequiredMsg, SearchContainer } from './styles';


function ListOptionsComponent(
    {
        title, 
        data, 
        field, 
        currentItems, 
        margin, 
        maxwidth = '520px',
        handleListAdd, 
        handleListDel, 
        validMsg,
        showDelete
    }
) {

    // A reference of the field "Data" on props 
    const [searchOptions, setSearchOptions] = useState(data);

    // The list of already selected values 
    const [currentList, setCurrentList] = useState(currentItems ? currentItems : []);
    const [dropDown, setDropDown] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Sets the Data from props to the component equivalent variable, when the component is mounted
    // This process occurs , to prevent the user to add a duplicate value on the list
    React.useEffect(() => {
        setSearchOptions(data);
    },[data]);

    React.useEffect(() => {
        setSearchOptions(data);
        for(let i in currentItems){
            setSearchOptions((s) => removeById('id', currentItems[i]['id'], s))
        }
        setCurrentList((c) => c = currentItems ? currentItems : []);
    },[currentItems, data]);

    const handleChange = (value) => {
        setSearchValue(value)
    }

    const handleAddClcik = () => {
        setDropDown(!dropDown);
    }

    const handleDeleteClcik = (pk) => {
        // Before Remove the valeu , resets the value on the searchOptions , so the user can add this value on the list again.
        setSearchOptions([...searchOptions, ...findsByField('id', pk, currentList)]);

        // Deletes a value from the list

        setCurrentList(removeById('id', pk, currentList));

        handleListDel(pk);
    }

    const captureValue = (value) => {

        // After a value is selected, this value is removed from the data base
        setSearchOptions(removeById('id', value['id'], searchOptions))

        // Append the value in the  list
        setCurrentList([...currentList, value]);

        setDropDown(false)

        handleListAdd(value);
    };

    return (
        <>
            <Container 
                maxwidth={maxwidth}
                margin={margin}
            >
            <Header>
                {title}
            </Header>
            {
                dropDown && (
                    <SearchContainer>
                            <AutoComplete 
                                data={searchOptions} 
                                field={field} 
                                placeholder={'Pesquise'}
                                value={searchValue}
                                handleChangeFather={handleChange}
                                captureValue={captureValue}
                                background={'background'}
                            />
                    </SearchContainer>
                )
            }
            <CenterContainer>
                    {currentList.map((item) => {
                        return (
                            <ListItemComponent  
                                key={item.id} 
                                pk={item.id} 
                                desc={item[field]} 
                                handleDelete={handleDeleteClcik} 
                                showDelete={item.saved && (!item.saved || showDelete)}
                            />
                        )
                    })} 
            </CenterContainer>
            {
                dropDown ? (
                    <CircleButtonComponent 
                        margin={'10px 0'} 
                        handleClick={handleAddClcik} 
                        icon={<BsCheckLg/>}
                        background={'PRIMARY'}
                    />
                )
                :
                (
                    <CircleButtonComponent margin={'10px 0'} handleClick={handleAddClcik}/>
                )
            }
            </Container>
            {
                validMsg  &&  currentList.length === 0 ? (
                    <RequiredMsg>
                        {validMsg}
                    </RequiredMsg>
                ): null
            }
        </>
    )
}

export default React.memo(ListOptionsComponent);

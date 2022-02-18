import React, { useState, useEffect }  from 'react';

import TableComponent from '../Table/Table';
import InputSearch from './InputSearch';
import GenericButton from '../Button';

import { fieldStartsWith } from '../../Utils/gridMethods';
import { FaTimes } from 'react-icons/fa';
import { Container, ExitButton, Header, HeaderTitle } from './styles';


function SearchTableComponent({title, data, columns, tableId, handleClick, handleExit}) {
  const [thisData, setThisData] = useState([]);
  const [ currentCol, setCurrentCol] = useState(columns[0]);

  useEffect(() => {
    setThisData(data);
  },[data, columns]);

  const handleRowClick = (row) => {
    setThisData([row]);
  }

  const handleColClick = (col) => {
    setCurrentCol(col);
  };

  const handleInputChange = () => {
    setThisData(data);
  }

  const handleSearchClick = (value) => {
    setThisData((prev) => [
      ...fieldStartsWith(currentCol.name, value, prev)
    ]);
  };

  const handleOkClick = () => {
    if(thisData.length <= 1){
      handleClick(thisData);
    }
  }

  return (
    <Container>
        <Header >
          <HeaderTitle>
            {title}
          </HeaderTitle>
          <ExitButton 
            onClick={handleExit}
          >
            <FaTimes />
          </ExitButton>
        </Header>
        <InputSearch 
            fieldName={currentCol && currentCol.desc}
            handleClick={handleSearchClick}
            handleInputChange={handleInputChange}
        />
        <TableComponent 
          id={tableId}
          columns={columns}
          data={thisData}
          handleColClick={handleColClick}
          handleRowClick={handleRowClick}
        />
        <GenericButton 
            text={'OK'} 
            handleClick={handleOkClick} 
            background={'success'}
            margin={'15px 0'}
        />

    </Container>
  );
}

export default SearchTableComponent;

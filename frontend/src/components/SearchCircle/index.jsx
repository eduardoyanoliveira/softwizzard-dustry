import React from 'react';
import Props from 'prop-types';
import { HiSearch } from 'react-icons/hi';
import { CircleButton } from './styles';


function SearchCircle({ handleClick, small = false}) {

  return (
    <CircleButton onClick={handleClick}  small={small}>
      <HiSearch />
    </CircleButton>
  )
}

SearchCircle.propTypes = {
  small: Props.bool,
}

export default SearchCircle;

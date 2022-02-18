import React from 'react';
import { SubMenuItemContainer, SubMenuItemLabel } from './styles';


function SubMenuItemComponent({subItem, handleClickFather, closeSubNav}) {
    

  const handleClick = () => {
    handleClickFather && handleClickFather();
    closeSubNav && closeSubNav();
  }

  return (
    <SubMenuItemContainer 
      to={subItem.path}
      onClick={handleClick}
    >
      <SubMenuItemLabel>
        {subItem.title} 
      </SubMenuItemLabel>  
    </SubMenuItemContainer>
  )
}

export default SubMenuItemComponent;

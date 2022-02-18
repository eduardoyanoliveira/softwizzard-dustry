import React, { useState } from 'react';
import SubMenuItem from './SubMenuItem';
import { MenuIconContainer, MenuItem, MenuItemLabel, MenuItemName } from './styles';


function MenuItemComponent({item, handleClickFather}) {
  const [subMenu, setSubMenu] = useState(false);

  const handleClick = () => {
    setSubMenu((s) => s = !s)
  }
  
  return (
    <>
      <MenuItem>
        <>
          {
            item.subNav 
            ? 
            (
              <MenuItemLabel      
                subMenu={subMenu} 
                onClick={handleClick} 
              >
                <MenuIconContainer>
                  {item.icon}
                </MenuIconContainer>
                {item.title}
              </MenuItemLabel>
            )
            :
            (
              <MenuItemName 
                to={item.path} 
                onClick={handleClickFather && handleClickFather}
              >
                <MenuIconContainer>
                  {item.icon}
                </MenuIconContainer>
                {item.title}
              </MenuItemName>
            )
          }
        </>
      </MenuItem>
      {
        item.subNav && subMenu && (
          item.subNav.map((op, index) => {
            return(
              <SubMenuItem key={index} subItem={op} handleClickFather={handleClickFather} closeSubNav={handleClick}/>
            )
          })
        )
      }
    </>
  )
}

export default MenuItemComponent;

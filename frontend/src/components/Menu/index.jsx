import React, { useContext, useState } from "react";
import { SideMenu, MenuContainer, Menu } from "./styles";

import { MobileMenuContext } from "../../contexts/MobileMenuProvider/context";

import MenuItem from "./MenuItem";
import SideMenuHeader from "../SideMenuHeader";


function MenuComponent({mobile, menuData}) {

  const [thisMenuData, setThisMenuData] = useState(menuData);

  React.useEffect(() => {
    setThisMenuData(menuData);
  },[menuData])

  const mobileContext = useContext(MobileMenuContext);

  const left =  'left:' +  (mobileContext.state.open ? '0' : '-250px') + ';';

  const handleClick = () => {
      
    if(mobileContext.state.open){
        mobileContext.dispatch({type: 'CLOSE'})
    }else{
        mobileContext.dispatch({type: 'OPEN'})
    };
  }

  return (
    <SideMenu left={left} mobile={mobile}>
      <SideMenuHeader mobile={mobile}/>
      <MenuContainer>
        <Menu>
          {
            thisMenuData && thisMenuData.map((data, index) => {
              return (
                <MenuItem key={index}  item={data} handleClickFather={handleClick}/>
              );
            })
          }
          
        </Menu>
      </MenuContainer>
    </SideMenu>
  )
}

export default MenuComponent;

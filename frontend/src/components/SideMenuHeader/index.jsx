import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { GiMoon } from 'react-icons/gi';

import { ThemeContext } from "../../styles/themeProvider";
import { MobileMenuContext } from "../../contexts/MobileMenuProvider/context";
import { Bars, Container, LogOut, ThemeSwitcher } from './styles';


function SideMenuHeader({mobile}) {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    
    const mobileContext = useContext(MobileMenuContext);

    const handleClick = () => {
      
        if(mobileContext.state.open){
            mobileContext.dispatch({type: 'CLOSE'})
        }else{
            mobileContext.dispatch({type: 'OPEN'})
        };
    }

    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_operator');
        localStorage.removeItem('operator_id');
        window.location.reload();
    }

    return (
        <Container>
            {
                mobile && (
                    <Bars onClick={handleClick}>
                    <FaBars/>
                    </Bars>
                )
            }
            <ThemeSwitcher 
                onClick={() => toggleTheme()}
            >
                {isDarkTheme ? <FaSun/> : <GiMoon/> }
            </ThemeSwitcher>
            <LogOut 
                onClick={handleLogOut}
            >
                Log Out
            </LogOut>
    </Container>
    );
}

export default SideMenuHeader;


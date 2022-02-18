import React, { useContext } from 'react';
import { Container, MenuBarsContainer, LogoContainer } from './styles';
import { ThemeContext } from 'styled-components';
import { MobileMenuContext } from '../../contexts/MobileMenuProvider/context';
import { FaBars } from 'react-icons/fa';
import LogoWhite from '../../design/logos/Logo-white.png';
import Logo from '../../design/logos/Logo.png';


function MobileNavComponent({ showBars = true, showLogo = true }) {

    const themeContext = useContext(ThemeContext);
    const mobileContext = useContext(MobileMenuContext);

    const logoWhite = themeContext.title === 'dark';

    const handleClick = () => {
      
        if(mobileContext.state.open){
            mobileContext.dispatch({type: 'CLOSE'})
        }else{
            mobileContext.dispatch({type: 'OPEN'})
        };
    }

    return (
        <Container 
            showBars={showBars}     
        >
            <MenuBarsContainer showBars={showBars} onClick={handleClick}>
                <FaBars/>
            </MenuBarsContainer>
            <LogoContainer showLogo={showLogo}>
                <img src={logoWhite ? LogoWhite : Logo} alt="logo" />   
            </LogoContainer>

        </Container>
    )
}

export default MobileNavComponent;

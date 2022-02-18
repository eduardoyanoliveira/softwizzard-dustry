import React , { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import LogoWhite from '../../design/logos/Logo-white.png';
import Logo from '../../design/logos/Logo.png';
import { DesktopNav, LogoContainer } from './styles';



function DestopNavComponent() {

    const theme = useContext(ThemeContext);

    const logoWhite = theme.title === 'dark';

    return (
        <DesktopNav>
            <LogoContainer showLogo={true}>
                <img src={logoWhite ? LogoWhite : Logo} alt="logo" />   
            </LogoContainer>
        </DesktopNav>
    )
}

export default DestopNavComponent;

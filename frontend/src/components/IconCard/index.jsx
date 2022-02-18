import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Container, IconContainer, Text } from './styles';

function IconCard({text, type, icon, handleClick}) {

    const theme = useContext(ThemeContext);

    const isDark = theme.title === 'dark';
    let iconColor;
    let iconBg;

    switch (type) {
        case 'PRIMARY':
            iconColor = isDark ? theme.colors.primaryNeon : theme.colors.primary;
            iconBg = theme.colors.primaryTransparent;
            break;
        case 'SUCCESS':
            iconColor = isDark ? theme.colors.successNeon : theme.colors.success;
            iconBg = theme.colors.successTransparent;
            break;
        default:
            break;
    }

    return (
        <Container>
            <IconContainer 
                color={iconColor}
                background={iconBg}
            >
                {icon}
            </IconContainer>
            <div style={{width: '10px'}}/>
            <Text
                onClick={handleClick}
                hcolor={iconColor}
            >
                {text}
            </Text>
        </Container>
    );
}

export default IconCard;

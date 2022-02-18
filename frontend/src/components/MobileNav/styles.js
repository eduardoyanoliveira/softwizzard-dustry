import styled, { css } from "styled-components";

export const Container = styled.header`
    ${({theme, showBars}) => css`
        display: flex;
        align-items: center;
        justify-content:${showBars ? 'space-between' : 'center' };
        width: 100%;
        height: 8vh;
        padding: ${showBars ? '0 15px' : '0 0 0 15px' };
        color:  ${theme.colors.primary};
        background: ${theme.colors.background};
    `} 
`;


export const MenuBarsContainer = styled.div`
    ${({showBars}) => css`
        display: ${showBars ? 'flex' : 'none' };
        font-size: 1.4rem;
        cursor: pointer;
    `}
`;

export const LogoContainer = styled.div`
    ${({showLogo}) => css`
        display: ${showLogo ? 'flex' : 'none' };
        width: 149px;
        justify-content: center;
        height: 100%;
        margin: 0 40px 10px 0;
        align-items: center;
    `}
`;
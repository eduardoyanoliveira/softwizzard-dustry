import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const SideMenu = styled.div`
    ${({theme, mobile, left}) => css`
        background: ${theme.colors.background};
        position: ${mobile && 'absolute'};
        top: ${mobile && '0'};
    ${left}
    `}
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
    width: 250px;
    height: 100vh;
    transition: all ease-in-out .2s;
`; 

export const MenuContainer = styled.nav`
    height: calc(100vh - 160px);
    margin: 10px 0 25px 0;
    overflow-y: auto;
    color: #fff;

    &::-webkit-scrollbar {
        width: 4px;
    }
    scrollbar-width: thin;

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #a9a9a9;
        border-radius: 2px;
    }
    scrollbar-color: #a9a9a9 #fff;

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: 0;
    }
`;

export const Menu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Menu Item Styles

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;  
    padding: 10px 0 0 50px;
    list-style: none;
`;

export const MenuIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 1.4rem;
    ${({theme}) => css`
        background: ${theme.colors.primaryTransparent};
        color: ${theme.title === 'dark' ? theme.colors.primaryNeon : theme.colors.primary};
    `}
`;

export const MenuItemName = styled(Link)`
    display: flex;
    align-items: center;
    flex-direction: row;
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}
    text-decoration: none;
    cursor: pointer;

    &:hover{
        color: ${({theme}) => theme.colors.primary};
    }
`;


export const MenuItemLabel = styled.li`
    display: flex;
    align-items: center;
    flex-direction: row;
    ${({theme, subMenu}) => css`
        color: ${subMenu ? theme.colors.primary : theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}
    list-style: none;
    text-decoration: none;
    cursor: pointer;

    &:hover{
        color: ${({theme}) => theme.colors.primary};
    }
`;

// SubMenuItem Styles

export const SubMenuItemContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px; 
    padding: 10px 0 0 0; 
    list-style: none;
    text-decoration: none;

    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitleTwo}
    `}
    cursor: pointer;

    &:hover{
        border-left: 10px solid #fff
    }

`;

export const SubMenuItemLabel = styled.span`
    padding-left: 75px;
    width: 100%;
`;  
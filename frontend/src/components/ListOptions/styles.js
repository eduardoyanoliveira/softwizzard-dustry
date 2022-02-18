import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: max-content;
    ${({theme, margin, maxwidth}) => css`
        max-width: ${maxwidth};
        margin: ${margin};
        background: ${theme.colors.backgroundLight};
    `}
 
    width: 100%;
    border-radius: 10px;
 
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 100%;

    ${({theme}) => css`
        color: ${theme.colors.componentTitle};
        ${theme.fonts.subtitle};
    `}

`;

export const CenterContainer = styled.div`
    width: 95%;
    height: 120px;
    padding: 4px 0;

    overflow-x: hidden;
    overflow-y: auto;
  
    &::-webkit-scrollbar {
        width: 4px;
    }
  
    /* Handle */
    &::-webkit-scrollbar-thumb {
        ${({theme}) => css`
            background: ${theme.colors.fontDisabled};
        `}
        border-radius: 2px;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 92%;
    margin-bottom: 5px;
    padding: 0 5px;
`;

export const RequiredMsg = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.warning};
        ${theme.fonts.subtitle};
    `}
`;

// Item styles

export const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    margin: 0 auto 5px auto;
    padding: 0 5px;
    height: 41px;
    border-radius: 5px;

    ${({theme}) => css`
        background: ${theme.colors.background};
    `}
    
`;

export const ItemDescripton = styled.span`
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}
`;

export const ItemDeleteIcon = styled.span`
    ${({theme}) => css`
        color: ${theme.colors.fontDisabled};
    `}
    font-size: 1.5em;
    cursor: pointer;

    &:hover{
        ${({theme}) => css`
            color: ${theme.colors.fontMediumEmphasis};
        `}
    }
`;

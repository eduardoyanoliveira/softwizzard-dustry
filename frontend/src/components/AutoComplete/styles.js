import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    ${({maxWidth, margin}) => css`
        max-width: ${maxWidth};
        margin: ${ margin};
    `}
    border-radius: 5px;
`;

export const DataContainer = styled.div`
    ${({enabled}) => css`
        display: ${enabled ? 'flex' : 'none'};
    `}

    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    margin: 2px 0 0 0;

    ${({theme}) => css`
        background: ${theme.colors.backgroundLight};
    `}
 
`;

export const DataContent = styled.div`
    width: 100%;
    max-height: 110px;
    padding: 5px 0;
    scroll-behavior: smooth;

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
    scrollbar-width: none;

`;

export const Datarow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px auto;
    border-radius: 4px;
    padding: 0 10px;
    height: 30px;
    width: 90%;
    ${({theme}) => css`
        background: ${theme.colors.background};
        color: ${theme.colors.fontHighEmphasis};
    `}
    cursor: pointer; 

    &:hover{
        box-shadow: 1px 2px 2px rgba(0, 0, 0, .1);
    }
`;

export const RowText = styled.span`
    ${({theme}) => css`
        ${theme.fonts.subtitleTwo};
    `}
    margin-left: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`;

export const RequiredMsg = styled.label`
    ${({theme}) => css`
        ${theme.fonts.subtitle};
        color: ${theme.colors.warning};
    `}
`;

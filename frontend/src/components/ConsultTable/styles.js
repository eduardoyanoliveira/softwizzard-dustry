import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    ${({theme}) => css`
        background: ${theme.title === 'light' && theme.colors.backgroundLight};
    `}
    border-radius: 10px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        height: 6px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #a9a9a9;
        border-radius: 2px;
    }
    
    /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
        background: 0;
    }

    ${({theme}) => css`
        scrollbar-color: #a9a9a9 ${theme.colors.backgroundLight};
    `}
    scrollbar-width: thin;

`;

export const Table = styled.table`
    text-align: left;
`;

export const TRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;

    ${({theme, clickable}) => css`
        background: ${theme.colors.background};
        cursor: ${clickable && 'pointer'};
    `}

    border-radius: 10px;
    margin: 10px 0 0 0;
`;

export const THead = styled.thead`
    display: table;
    table-layout: fixed;
`;

export const THeader = styled.th`
    padding: 5px 15px;
    height: 50px;

    ${({theme, center}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        text-align: ${center && 'center'};
        ${theme.fonts.subtitleTwo};
    `}

    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`;

export const TBody = styled.tbody`
    display: block;
    margin-bottom: 10px;
`;          

export const TData = styled.td`
    border-spacing: 5px;
    height: 50px;
    padding: 10px 15px;

    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitleTwo};
    `}
    
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`;

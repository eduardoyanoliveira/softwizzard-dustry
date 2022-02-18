import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 10px 0;
    ${({theme}) => css`
        background: ${theme.colors.backgroundDark};
    `}
 
    border-radius: 15px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        height: 4px;
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
        scrollbar-color: #a9a9a9 ${theme.colors.backgroundDark};
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
    height: 40px;

    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitleTwo};
    `}

    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`;

export const TBody = styled.tbody`
    display: block;
    overflow-y: auto;
    height: 150px;

    &::-webkit-scrollbar {
        width: 0;
    }
    scrollbar-width: none;
`;          

export const TData = styled.td`
    border-spacing: 5px;
    padding: 10px 15px;
    
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitleTwo};
    `}

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`;

export const Delete = styled.div`
    height: 18px;
    width: 35px;
    padding: 0 3.5px 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;

    ${({theme}) => css`
        color: ${theme.colors.fontDisabled};
    `}
    cursor: pointer;
`;

import styled, { css } from "styled-components";

export const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    ${({theme, big, margin, background, disabled}) => css`
        width: ${big ? '60px' : '45px'};
        height: ${big ? '60px' : '45px'};
        margin: ${margin};
        background : ${
            background === 'SUCCESS' ? theme.colors.success:
            background === 'PRIMARY' ? theme.colors.primary:
            background === 'DISABLED' ? theme.colors.fontDisabled:
            ''
        };
        font-size: ${big ? '1.3em' : '2em'};
        cursor: ${!disabled && 'pointer'};
        
        &:hover{
            ${!disabled && ' box-shadow: 1px 2px 2px rgba(0, 0, 0, .5)'};
        }
    `}

    color: #fff;
    border-radius: 50%;
    
`;
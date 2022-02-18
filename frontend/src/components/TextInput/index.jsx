import React, { useState } from 'react';
import { CenterContainer, Container, Header, RequiredMsg, TextArea } from './styles';

function TextInputComponent({
    margin,
    title, 
    name,
    maxwidth = '520px',
    handleChange, 
    value,
    validMsg,
    disabled = false
}) 
{
    const [inputValue, setInputValue] = useState('');

    const thisHandleChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <>
            <Container 
                maxwidth={maxwidth}
                margin={margin}
            >
            <Header>
                {title}
            </Header>
            <CenterContainer>
            <TextArea 
                inputType={'textarea'}
                value={value ? value : inputValue}
                name={name}
                onChange={(e) => {handleChange(e); thisHandleChange(e)}}
                disabled={disabled}
                height='100%'
                />   
            </CenterContainer>
            </Container>
            {
                // If the required field is true and the imput value is empty then gives the default message
                // If the required field is true and the message for the input is not empty , then gives the message
                (validMsg || !value)  && (
                <RequiredMsg>
                    {validMsg}
                </RequiredMsg>
                )
            }
        </>
    )
}

export default React.memo(TextInputComponent);

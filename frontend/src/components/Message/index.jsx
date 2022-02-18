import React from 'react';
import GenericButton from '../Button';
import { ButtonContainer, Container, Header, Message } from './styles';

function MessageComponent({title, message, btnText, handleClick, handleCancel, background}) {

    return (
        <Container>
            <Header background={background}>
                <label>
                    {title}
                </label>
            </Header>
            <Message>
                {message}
            </Message>
            <ButtonContainer>
                <GenericButton 
                    text={btnText} 
                    handleClick={handleClick} 
                    background={'primary'}
                />
                {
                    handleCancel && (
                        <>
                            <div style={{width: '30px', height: '30px'}}></div>
                            <GenericButton 
                                text={'Cancelar'} 
                                handleClick={handleCancel} 
                                background={'success'}
                            />
                        </>
                    )
                }
            </ButtonContainer>
        </Container>       
    )
}

export default MessageComponent;

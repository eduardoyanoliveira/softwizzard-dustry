import React from 'react';
import { Container, Content, Header } from './styles';

function Field({title, value, margin}) {

  return (
    <Container margin={margin} hasTitle={title}>
      { title && (
        <Header>
        {title}
      </Header> )
      }
      <Content>
        {value}
      </Content>
    </Container>
  )
}

export default Field;

import React, { useContext } from 'react';
import { DimensionsContext } from '../../contexts/Dimensions/context';
import SearchCircle from '../SearchCircle';
import { Container, Header, Title } from './styles';


function HeaderComponent({title, handleClick, maxwidth = '520px', search = false}) {
    const dimensions = useContext(DimensionsContext);

    const isMobile = (dimensions === 'SMALL' || dimensions === 'MOBILE' || dimensions === 'TABLET');

    return (
        <Header 
            isMobile={isMobile}
            search={search}
            maxwidth={maxwidth}
        >
            <Container search={search}>
                <Title>
                    {title}:
                </Title>
                {
                    search && (
                        <SearchCircle handleClick={handleClick}/>
                    )
                }
            </Container>
        </Header>
    )
}

export default React.memo(HeaderComponent);

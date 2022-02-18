import React, { useContext } from 'react';
import Header from '../FormHeader';
import PageNotAllowedComponent from '../PageNotAllowed';
import Loader from '../Loader';

import { DimensionsContext } from '../../contexts/Dimensions/context';

import { Form, FormContainer, HeaderContainer, MainContainer } from './styles';


function MainFormContainer({children, title, loading, handleClick, isRestrict = true}) {

    const dimensions = useContext(DimensionsContext);

    let mainWidth = '99%';

    const isMobile = (dimensions === 'SMALL' || dimensions === 'MOBILE' || dimensions === 'TABLET') ? true : false;

    if(dimensions === 'ULTRA'){
        mainWidth = '60%';
    }

    if(dimensions === 'LARGE' || dimensions === 'TABLET'){
        mainWidth = '80%';
    }

    return (
        <>
            {
                isRestrict && JSON.parse(localStorage.getItem('is_operator')) ? 
                (
                    <PageNotAllowedComponent/>
                ) 
                :
                (
                    <MainContainer mainWidth={mainWidth} >
                        <HeaderContainer isMobile={isMobile}>
                            <Header 
                                title={title} 
                                handleClick={handleClick && handleClick}
                                search={handleClick && true}
                                maxwidth={'100%'}
                            />
                        </HeaderContainer>
                        
                        {loading && loading ? (<Loader/>)
                            :(
                                <Form mainWidth={mainWidth}>
                                    <FormContainer 
                                        isMobile={isMobile}
                                    >
                                        {children}
                                    </FormContainer>
                                </Form>
                            )   
                        }
                    </MainContainer>

                )
            }     
        </>
    ) 
}

export default MainFormContainer;

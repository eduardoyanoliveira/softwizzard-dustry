import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { ItemContainer, ItemDeleteIcon, ItemDescripton } from './styles';

function ListItemComponent({desc, pk, handleDelete, showDelete = true}) {

    return (
        <ItemContainer>
            <ItemDescripton>
                {desc}
            </ItemDescripton>
            {
                showDelete  && (
                    <ItemDeleteIcon
                        onClick={() => handleDelete(pk)}
                    >
                        <FaTimes/>
                    </ItemDeleteIcon>
                )
            }
        </ItemContainer>
    )
}

export default ListItemComponent;

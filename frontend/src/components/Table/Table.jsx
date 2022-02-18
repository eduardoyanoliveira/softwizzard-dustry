import React, { useEffect, useState } from 'react';

import { FaTimes } from 'react-icons/fa';
import { sortByField } from '../../Utils/gridMethods';
import { Container, Delete, Table, TBody, TData, THead, THeader, TRow } from './styles';


function TableComponent({columns, data, id, handleDelete, handleColClick, handleRowClick}) {
    const [thisData, setThisData] = useState([]);
    const [cols, setCols] = useState([]);

    useEffect(() => {
        setThisData(data);
        setCols(columns)
    },[data, columns])

    const thishandleColClick = (col) => {

        setThisData((prev) => sortByField(prev, col.name, col.options.order));
    
        columns[col.id].options.order = !col.options.order ;

        setCols([
            ...columns
        ]);

        handleColClick && handleColClick(col);

    };

    return (
        <Container>
            <Table id={id}>
                <THead>
                    <TRow>
                        {
                            cols.map((col, id) => {
                                return (
                                    col.desc && (
                                        <THeader 
                                            key={id} 
                                            width={col.width}
                                            onClick={() => thishandleColClick(col)}
                                        >
                                            {col.desc}
                                        </THeader>
                                    )                                  
                                );
                            })
                        }
                        {
                            handleDelete && (
                                <THeader width={'40px'}/>
                            )
                        }
                    </TRow>
                </THead>
                <TBody>
                    {
                        thisData.map((row) => {
                            const fields = [];
                            for(let key in row){
                                if(key !== 'deletable'){
                                    fields.push(row[key]);
                                }
                            } 
                            return (
                                <TRow 
                                    key={row.id} 
                                    onClick={() => (handleRowClick && handleRowClick(row))} 
                                    clickable={handleRowClick}
                                >

                                    {
                                       fields.map((field, id) => {
                                           return (
                                                <TData 
                                                    key={id} 
                                                    width={columns[id].width}
                                                >
                                                   {field}
                                               </TData>
                                           )
                                       })                                   
                                    }  
                                    {
                                        (handleDelete && row.deletable) ? (
                                            <TData onClick={() => handleDelete(row.id)} width={'40px'}>
                                                <Delete>
                                                    <FaTimes />
                                                </Delete>
                                            </TData>
                                        )
                                        : handleDelete && (
                                            <TData width={'40px'}>
                                                
                                            </TData>
                                        )                                   
                                    }                             
                                </TRow>
                            );
                        })
                    }
                </TBody>
            </Table>
        </Container>
    )
}

export default TableComponent;

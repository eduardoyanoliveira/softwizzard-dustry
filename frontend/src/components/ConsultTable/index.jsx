import React, { useEffect, useState } from 'react';

import { sortByField } from '../../Utils/gridMethods';
import { Container, Table, TBody, TData, THead, THeader, TRow } from './styles';


function ConsultTable({columns, data, id, handleColClick, handleRowClick}) {
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
                                            center={col.options.center ? col.options.center : false }
                                            onClick={() => thishandleColClick(col)}
                                        >
                                            {col.desc}
                                        </THeader>
                                    )                                  
                                );
                            })
                        }
                    </TRow>
                </THead>
                <TBody>
                    {
                        thisData.map((row) => {
                            const fields = [];
                            for(let key in row){
                                fields.push(row[key]);
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
                                </TRow>
                            );
                        })
                    }
                </TBody>
            </Table>
        </Container>
    )
}

export default ConsultTable;

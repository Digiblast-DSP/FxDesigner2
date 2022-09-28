import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable, id}) => {


    const onValueChange = (e) => {
        data.onChange(id, e);
    }

    return (
        <>
            
            {/* <div className='node-name'>{data}</div> */}
            <EditableValue value={data.value} onValueChange={onValueChange}/>
            <p>{id}</p>
            <Handle
                type='source'
                position='bottom'
                style={{left:'24%'}}
                isConnectable={true}
                id='output'
            />   
        </>
    );
});

function EditableValue({value, onValueChange}) {
    
    return (
        <div className='constant-node-value'>
            <input type="number" class='constant-node-input' defaultValue={value} onChange={onValueChange}/>
        </div>
    );
}
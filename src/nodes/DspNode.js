import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
    return (
        <>
            <Handle
                type='target'
                position='top'
                style={{left:'10%'}}
                isConnectable={true}
                id='a'
            >
                <p className='param-text'>x</p>
            </Handle>
            
             <Handle
                type='target'
                position='top'
                style={{left:'50%'}}
                isConnectable={true}
                id='b'
            >            
                <p className='param-text'>f</p>
            </Handle>
            <div className='mt-2'></div>
            <div className='node-name'>{data.name}</div>

            <Handle
                type='source'
                position='bottom'
                style={{left:'24%'}}
                isConnectable={true}
            />   
        </>
    );
});
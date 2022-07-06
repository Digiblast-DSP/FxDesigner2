import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
    
    function createHandles() {
        let list = [];
        const margin = 90 / (data.paramNames.length);

        for (let i = 0; i < data.paramNames.length; i++) {
            const param = data.paramNames[i];
            list.push(
                <Handle
                type='target'
                position='top'
                style={{left:`${10+margin*i}%`}}
                isConnectable={true}
                id={`in-${data.name + i}-${data.id}`}
                key={i}

                >
                    <p className='param-text'>{param}</p>
                </Handle>
            );
        }
        return list;
    }

    return (
        <>
            {createHandles()}
            {/* <Handle
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
            </Handle> */}
            
            <div className='mt-2'></div>
            <div className='node-name'>{data.name}</div>

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
import { getAllFunctions } from '../lang/FuncData';
import DspListItem from './DspListItem'
import { ConfigParser } from '../lang/ConfigParser'
import { useEffect, useState } from 'react';

function DspList({createNode}) {

    let [fList, setFList] = useState(undefined);
    
    let cfgParser = new ConfigParser();
    
    useEffect(() => {
        async function getFunctions() {
            await cfgParser.parse();
            setFList(cfgParser.functions);
        }

        if (!fList) {
            getFunctions();
        }
    }, []);

    function generateList() {
        
        if (!fList) return;

        const list = []
        for (let i = 0; i < fList.length; i++) {
            list.push(<DspListItem data={fList[i]} key={i} createNode={createNode}></DspListItem>);
        }
        return list;
    }

    return (
        <div className="column is-2 mt-3 list-container">

            <div className='tabs'>
                <ul>
                    <li className='is-active'><a>Math</a></li>
                </ul>
            </div>
            <div className='dsp-list columns pt-4 is-multiline is-gapless'>
{/*                 <DspListItem name='sin'></DspListItem>
                <DspListItem name='cos'></DspListItem>
                <DspListItem name='tan'></DspListItem>
                <DspListItem name='clip'></DspListItem>
                <DspListItem name='lpf'></DspListItem>
                <DspListItem name='hpf'></DspListItem> */}
                {generateList()}
            </div>
        </div>
    );
}

export default DspList;
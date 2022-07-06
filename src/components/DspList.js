import { getAllFunctions } from '../lang/FuncData';
import DspListItem from './DspListItem'

function DspList({createNode}) {

    function generateList() {
        const fList = getAllFunctions();
        
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
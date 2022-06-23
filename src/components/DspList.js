import DspListItem from './DspListItem'

function DspList() {

    function generateList() {
        const list = [];
        for (let i = 0; i < 50; i++) {
            list.push(<DspListItem name='sin' key={i}></DspListItem>);
        }
        return list;
    }

    return (
        <div className="column is-2 mt-3 list-container">

            <div class='tabs'>
                <ul>
                    <li className='is-active'><a>Math</a></li>
                </ul>
            </div>
            <div className='dsp-list columns pt-4 is-multiline is-gapless'>
                <DspListItem name='sin'></DspListItem>
                <DspListItem name='cos'></DspListItem>
                <DspListItem name='tan'></DspListItem>
                <DspListItem name='clip'></DspListItem>
                <DspListItem name='lpf'></DspListItem>
                <DspListItem name='hpf'></DspListItem>
                {generateList()}
            </div>
        </div>
    );
}

export default DspList;
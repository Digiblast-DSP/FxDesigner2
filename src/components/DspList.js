import { getAllFunctions } from '../lang/FuncData';
import DspListItem from './DspListItem'
import { ConfigParser } from '../lang/ConfigParser'
import { useEffect, useState } from 'react';
import { CATS } from '../lang/Cats';


function DspList({createNode}) {

    let [fList, setFList] = useState(undefined);
    let [fullFList, setFullFList] = useState(undefined);
    let [category, setCategory] = useState("Core");
    
    let cfgParser = new ConfigParser();

    function changeCategory(c) {
        setCategory(c);
        setFList(fullFList.filter(x => x.category === c));
    }
    
    useEffect(() => {
        async function getFunctions() {
            await cfgParser.parse();
            setFullFList(cfgParser.functions);
            setFList(cfgParser.functions.filter(x => x.category === 'Core'));
        }

        if (!fList) {
            getFunctions();
        }
    }, []);

    function generateList() {
        
        if (!fList) return;

        const list = [];

        if (category === "Core") {
            list.push(<DspListItem data="Constant" key="constant" createNode={createNode} isConstant={true}></DspListItem>)
        }

        for (let i = 0; i < fList.length; i++) {
            list.push(<DspListItem data={fList[i]} key={i} createNode={createNode} isConstant={false}></DspListItem>);
        }
        return list;
    }

    return (
        <div className="column is-3 mt-3 list-container">

            {/* <div className='tabs'>
                <ul>
                    <li className='is-active'><a>Math</a></li>
                    <li className=''><a>Basic</a></li>
                    <li className=''><a>Filters</a></li>
                    <li className=''><a>Misc Effects</a></li>
                </ul>
            </div> */}
            <Dropdown changeCategory={changeCategory} category={category}/>
            <br/><br/>
            <div className='dsp-list columns pt-4 is-multiline is-gapless'>
{/*                 <DspListItem name='sin'></DspListItem>
                <DspListItem name='cos'></DspListItem>
                <DspListItem name='tan'></DspListItem>
                <DspListItem name='clip'></DspListItem>
                <DspListItem name='lpf'></DspListItem>
                <DspListItem name='hpf'></DspListItem> */}
                {generateList()}
            </div>
            <div className='dsp-list columns pt-4 is-multiline is-gapless'>

            </div>
        </div>
    );
}

function Dropdown({changeCategory, category}) {

    const [isActive, setIsActive] = useState(false);

    const toggleClicked = () => {
        setIsActive(!isActive);
    };

    const dropdownItems = () => {
        

        if (isActive) {
            return (
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    
                    {CATS.map(x => <a href="#" class="dropdown-item" key={x} 
                        onClick={() => {
                            changeCategory(x);
                            toggleClicked();
                        }}>
                        {x}
                    </a>)}
                </div>
            </div>
            );
        } else {
            return;
        }
    };

    return (
        <div class="dropdown is-active dsp-dropdown">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => {toggleClicked();}}>
                    <span>{category}</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            {dropdownItems()}
            {/* {
                () => {
                    if (isActive) {
                        return 
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item">
                                        Dropdown item
                                    </a>
                                    <a class="dropdown-item">
                                        Other dropdown item
                                    </a>
                                    <a href="#" class="dropdown-item is-active">
                                        Active dropdown item
                                    </a>
                                    <a href="#" class="dropdown-item">
                                        Other dropdown item
                                    </a>
                                    <hr class="dropdown-divider"/>
                                    <a href="#" class="dropdown-item">
                                        With a divider
                                    </a>
                                </div>
                            </div>
                        
                    }
                }
            } */}
            
        </div>
    );
}

export default DspList;

function DspListItem({data, createNode, isConstant}) {

    const label = () => {
        if (!isConstant) {
            return data.name;
        } else {
            return "Constant";
        }
    }

    const handleClick = () => {
        if (!isConstant) {
            createNode(data);
        } else {
            createNode("constant");
        }
        
    }

    return (
        <div className='column is-12'>
              <div className="list-item" onClick={handleClick}>{label()}</div>
        </div>
    );
}

export default DspListItem;

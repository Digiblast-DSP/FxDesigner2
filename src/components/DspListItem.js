
function DspListItem({data, createNode}) {
    return (
        <div className='column is-12'>
              <div className="list-item"  onClick={() => { createNode(data); }}>{data.name}</div>
        </div>
    );
}

export default DspListItem;

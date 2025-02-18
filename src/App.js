import './App.css';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from 'react-flow-renderer';
import DspNode from './nodes/DspNode';
import WireEdge from './nodes/WireEdge';
import DspList from './components/DspList';
import Editor from './components/Editor';
import { ActionBar } from './components/ActionBar';
import { NodeParser } from './lang/NodeParser';
import ConstantNode from './nodes/ConstantNode';

const nodeTypes = {
  dspNode: DspNode,
  constantNode: ConstantNode
};
const edgeTypes = {
  wire: WireEdge,
};

const initialNodes = [
  {
    id: 'IN',
    type: 'input',
    selectable:false,
    className:'io-node',
    data: { label: 'Input' },
    position: { x: 0, y: 0 },
  },
  
  {
    id: 'OUT',
    type: 'output',
    data: { label: 'Output' },
    className:'io-node',
    selectable:false,
    position: { x: 25, y: 150 },
  },
];

const initialEdges = [
  /* { id: 'e1-2', source: '1', target: '2', type: 'wire', markerEnd: { type: MarkerType.ArrowClosed}},
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed}}, */
];


function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [idCounter, setIdCounter] = useState(0);
  const [constValues, setConstValues] = useState({});

  useEffect(() => {console.log('CVs:', constValues)}, [constValues])

  const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes]
  );
  const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges]
  );
  const onConnect = useCallback(
      (connection) => {
          console.log(connection);
          connection.type = 'wire';
          connection.markerEnd = { type: MarkerType.ArrowClosed};
          setEdges((eds) => {

            const target = connection.targetHandle;
            // cancel the connection if the input already has an incoming wire
            if (eds.some( x => x.targetHandle && x.targetHandle === target)
                || eds.some(x => x.target === "OUT" && connection.target === "OUT")) { // or disallow output from having multiple inputs
              console.log('CANT', eds, target);
              return eds;
            }
            console.log('CAN', nodes);
            
            return addEdge(connection, eds);
          });
      },
      [setEdges]
  );

  document.addEventListener('contextmenu', event => event.preventDefault());

  function changeConstantNodeValue(id, val) {
    //const value = e.target.value;
    console.log('Constant value change: ', id, val, nodes);
    let nVs = {...constValues};
    nVs[id] = val;
    //console.log(nVs, constValues);
    setConstValues(nVs);
    //setHistory(history + 1);
    /* let nodeIndex = nodes.findIndex(x => x.id === id);
    //console.log(nodeIndex, id);
    let nCopy = [...nodes];
    console.log(nCopy, nodes);
    nCopy[nodeIndex].data.value = val; */
    
    
    //nCopy[id].data = value;
    //setNodes(nCopy);
  }    

  /**
   * 
   * @param {FuncData | String} data 
   */
  function createNode(data) {
    if (data === "constant") {
      createConstantNode();
      return;
    }
    const ID = `${idCounter}`;
    const dataClone = structuredClone(data);
    dataClone.id = ID;
    setIdCounter(idCounter+1);
    const newNode = {
        id: ID,
        type:'dspNode',
        data: dataClone,
        className:'test',
        position: { x: 50*Math.random()-50, y: 50*Math.random()-50 },
    };
    const nodeList = [...nodes];
    nodeList.push(newNode);
    setNodes(nodeList);
  }

  function createConstantNode() {
    const ID = `${idCounter}`;
    setIdCounter(idCounter+1);
    const newNode = {
      id: ID,
      type:'constantNode',
      data: {
        value:0,
        onChange:changeConstantNodeValue
      },
      className:'test',
      position: { x: 50*Math.random()-50, y: 50*Math.random()-50 },
    };
    const nodeList = [...nodes];
    nodeList.push(newNode);
    console.log(nodeList);
    setNodes(nodeList);
  }

  function compile() {
    let nodeParser = new NodeParser();
    console.table(nodes);
    nodeParser.build(nodes, edges, constValues);
  }

  return (
    <div className='App'>
      
      <div className='section mt-0 pt-5'>
        <ActionBar compile={compile}/>
        <div className="columns">

          <div className="column">
            <div className='editor'>
              <Editor 
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange} 
                onConnect={onConnect} 
                nodes={nodes} 
                edges={edges} 
                setNodes={setNodes} 
                setEdges={setEdges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
              />
            </div>
          </div>

          <DspList createNode={createNode}/>
          
        </div>
      </div>
      
    </div>
  );
}

export default App;

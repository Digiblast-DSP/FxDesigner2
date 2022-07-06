import './App.css';
import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from 'react-flow-renderer';
import DspNode from './nodes/DspNode';
import WireEdge from './nodes/WireEdge';
import DspList from './components/DspList';
import Editor from './components/Editor';
import { v4 as uuidv4 } from 'uuid';
import { SIN } from './lang/FuncData';

const nodeTypes = {
  dspNode: DspNode,
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
          
          connection.type = 'wire';
          connection.markerEnd = { type: MarkerType.ArrowClosed};
          setEdges((eds) => {

            const target = connection.targetHandle;
            // cancel the connection if the input already has an incoming wire
            if (eds.some( x => x.targetHandle && x.targetHandle === target)) {
              console.log('CANT', eds, target);
              return eds;
            }
            console.log('CAN', target);
            return addEdge(connection, eds);
          });
      },
      [setEdges]
  );

  document.addEventListener('contextmenu', event => event.preventDefault());

  
  function createNode(data) {
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

  return (
    <div className='App'>
      <div className='section mt-0 pt-5'>
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

import logo from './logo.svg';


import { useCallback, useState } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, MarkerType } from 'react-flow-renderer';
import DspListItem from './core/DspListItem'
import './App.css';
import DspNode from './core/DspNode';

const nodeTypes = {
  dspNode: DspNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    type:'dspNode',
    // you can also pass a React component as a label
    data: { name: 'low pass filter' },
    className:'test',
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed}},
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed}},
];


function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background variant="lines" gap={32} size={1} />
      </ReactFlow>
  );
}



function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <div className='App'>
      <div className='section mt-0 pt-5'>
        <div className="columns">
          <div className="column">
            Functions
            
              <div className='columns pt-4 is-multiline'>
                <DspListItem name='sin'></DspListItem>
                <DspListItem name='cos'></DspListItem>
                <DspListItem name='tan'></DspListItem>
                <DspListItem name='clip'></DspListItem>
                <DspListItem name='lpf'></DspListItem>
                <DspListItem name='hpf'></DspListItem>
              </div>
            
          </div>
          <div className="column">
            <div className='editor'>
              <Flow></Flow>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;

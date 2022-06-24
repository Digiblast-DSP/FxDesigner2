
import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, MarkerType } from 'react-flow-renderer';
import DspNode from '../nodes/DspNode';
import WireEdge from '../nodes/WireEdge';

const nodeTypes = {
    dspNode: DspNode,
};
const edgeTypes = {
    wire: WireEdge,
};

const initialNodes = [
{
    id: '1',
    type: 'input',
    selectable:false,
    className:'io-node',
    data: { label: 'Input' },
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
    data: { label: 'Output' },
    className:'io-node',
    selectable:false,
    position: { x: 250, y: 250 },
},
];

const initialEdges = [
{ id: 'e1-2', source: '1', target: '2', type: 'wire', markerEnd: { type: MarkerType.ArrowClosed}},
{ id: 'e2-3', source: '2', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed}},
];


function Editor() {
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
    const onConnect = useCallback(
        (connection) => {
            connection.type = 'wire';
            connection.markerEnd = { type: MarkerType.ArrowClosed};
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    return (
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        >
        <Background variant="lines" gap={32} size={1} />
        </ReactFlow>
    );
}

export default Editor;
import ReactFlow, { Background, useEdges, useNodes } from 'react-flow-renderer';
import { useEffect } from 'react';

function EdgeLogger() {
    const edges = useEdges();

    useEffect(() => {
        console.log(edges);
    }, [edges]);

    return null;
}

function NodeLogger() {
    const nodes = useNodes();

    useEffect(() => {
        console.log(nodes);
    }, [nodes]);

    return null;
}
  
function Editor({onNodesChange, onEdgesChange, onConnect, nodeTypes, edgeTypes, nodes, edges, setEdges, setNodes}) {
    
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
        <EdgeLogger/>
        
        </ReactFlow>
    );
}

export default Editor;
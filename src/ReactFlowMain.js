import { useState, useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './Components/TextNode';
import PrintNode from './Components/PrintNode';
import { Container } from 'react-bootstrap';

const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const initialNodes = [
    {
        id: '0',
        type: 'textUpdater',
        position: { x: -100, y: -100 },
    },    
    {
        id: '1',
        type: 'printFunction',
        position: { x: 100, y: 100 },
    },
];


const initialEdges = [];
const nodeTypes = { textUpdater: TextUpdaterNode, printFunction: PrintNode };

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
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const RunOnclick = () => {
        console.log(new TextUpdaterNode("0", 300, 300));
        edges.forEach(edge => {
           let node = nodes.find(node => node.id === edge.source && node.type === 'textUpdater');
        });
    };

    return (
        <Container style={{ width: '1000px', height: "1000px" }}>
            <button type="button" className="btn btn-primary" onClick={() => { RunOnclick() }}>Run</button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={rfStyle}
            >
                <Controls />

            </ReactFlow>
        </Container>
    );
}

export default Flow;

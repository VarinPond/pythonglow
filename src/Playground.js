import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    useNodesState, useEdgesState,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import PrintNode from './Components/PrintNode';
import Assign from './Components/Assign';
import "./Components/TextNode.css";

const nodeTypes = {
    printFunction: PrintNode,
    assign: Assign
};


function Playground() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [assignData, setAssignData] = useState({
        value: "",
        name: "",
        type: "text",
        code: "",
    });
    useEffect(() => {

        const onAssignChange = (data) => {
            setAssignData(data);
        };



        setNodes([
            {
                id: '0',
                type: 'assign',
                position: { x: -100, y: -100 },
                data: {
                    onChange: onAssignChange,
                    name: assignData.name,
                    type: assignData.type,
                    value: assignData.value

                },

            },
            {
                id: '6',
                type: 'printFunction',
                data: { value: "Hello World" },
                position: { x: 100, y: 100 },
            },

        ]);

        setEdges([

        ]);
    }, []);


    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
        []
    );



    return (
        <div className='row d-flex justify-content-center'>
            <div className='col-10'>
                <h3>Low-Code data science</h3>
                <div className="btn-group my-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success">Get code</button>
                    <button type="button" className="btn btn-primary">Add</button>
                    <button type="button" className="btn btn-danger">Reset</button>
                </div>
                <div>
                <h3>Code</h3>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3">
                    </textarea>
                </div>
                <div>
                <h3>Result</h3>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3">
                    </textarea>
                </div>
            </div>
            <div className='col-10 ' style={{ height: "800px" }}>
                <h3>Flow</h3>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    style={{ background: "#B8CEBF" }}
                >
                    <Controls />

                </ReactFlow>
            </div>
        </div>
    );
}

export default Playground;

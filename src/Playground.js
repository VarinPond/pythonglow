import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './Styles/BlockStyle.css'

import PrintNode from './Blocks/PrintNode';
import StartNode from './Blocks/StartNode';
import EndNode from './Blocks/EndNode';
import Assign from './Blocks/Assign';
import simplifyDataFlow from './Utils/SimplifyJSON';
import ImportNode from './Blocks/ImportNode';
import SelectColumnNode from './Blocks/SelectColumnNode';

const minX = -100;
const maxX = 100;
const minY = -100;
const maxY = 100;

class Node {
    constructor(data) {
        this.id = data.id;
        this.data = {
            ...data,
            onChange: data.onChange || (() => { }),
        };
        this.position = { x: 0, y: 0 };

    }
}


const nodeTypes = {
    printFunction: PrintNode,
    assign: Assign,
    start: StartNode,
    end: EndNode,
    import: ImportNode,
    selectcolumn: SelectColumnNode,
};

function flattenArrayOfObjects(arrayOfObjects) {
    const flatArray = [];

    arrayOfObjects.map((item) => {
        if (item.source && item.target) {
            flatArray.push(item.source.id);
            flatArray.push(item.target.id);
        }
    });

    return [...new Set(flatArray)];
}



function Playground() {
    const [toggleShow, setToggleShow] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([
    ]);
    const [strcode, setStrcode] = useState("");
    const [NodeDatas, setNodeDatas] = useState([

    ]);


    const onNodesDataChange = (id, newData) => {
        setNodeDatas((nds) => {
            const nodeData = nds.find((item) => item.id === id);
            nodeData.data = newData;
            return [...nds];
        });
    };


    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
        []
    );


    const createNode = (data = {}) => {
        const newNodeId = nodes.length.toString();
        data.id = newNodeId;
        const newNodeData = new Node(data);

        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        const newNode = {
            id: newNodeId,
            type: data.type,
            position: { x: randomX, y: randomY },
            data: {
                ...data,
                onChange: onNodesDataChange,
            },
        };


        setNodes([...nodes, newNode]);
        NodeDatas.push(newNodeData);
    };


    const ResetFlow = () => {
        setNodes([]);
        setEdges([]);
        setNodeDatas([]);
        setStrcode("");
        localStorage.clear();

    };

    const getAllBlocks = () => {
        const blocks = nodes.map((item) => {
            return {
                id: item.id,
                type: item.type,
                position: item.position,
                data: NodeDatas.find((nd) => nd.id === item.id).data,
            };
        });

        return blocks;
    };
    const getCode = () => {
        const blocks = getAllBlocks();
        var connected_node = edges.map((item) => {
            return {
                source: blocks.find((block) => block.id === item.source),
                target: blocks.find((block) => block.id === item.target),
            };
        });
        var flowlist = flattenArrayOfObjects(connected_node);
        var flowData = blocks.filter((item) => flowlist.includes(item.id));

        var code_string = '';
        flowData.map((item) => {
            if (item.data.type == 'start') {

            } else if (item.data.type == 'end') {

            } else {
                code_string += item.data.code + '\n';

            }
        });

        setStrcode(code_string);
    };

    const RunCode = () => {
        const blocks = getAllBlocks();
        const code = blocks.map((item) => {
            return item.data.code;
        });
        setStrcode(code);
    };





    return (
        <div className='row d-flex justify-content-center'>
            <div className='col-10 p-2'>
                <h3>Low-Code No-Code</h3>
                <div className=' d-flex justify-content-between'>
                    <div className="btn-group my-3" role="group" aria-label="Basic example">
                    </div>
                    <div className=''>
                        <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Show panel</button>

                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: "start" })}>Start</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: "end" })}>End</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: 'import' })}>Import csv</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: 'selectcolumn' })}>Select column</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }}>Select row</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: 'assign' })}>Assign</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }}>Fill na</button>
                        <button type="button" className="btn btn-primary " style={{ marginInline: 10 }} onClick={() => createNode({ type: "printFunction" })}>Print</button>
                    </div>
                </div>

                <div class="offcanvas offcanvas-start p-2" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style={{ maxHeight: "100vh", overflow: "auto" }}>
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasScrollingLabel"></h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="btn-group my-3 col-12" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" onClick={getCode}>Get code</button>
                        <button type="button" className="btn btn-info" onClick={RunCode}>Run</button>
                        <button type="button" className="btn btn-danger" onClick={ResetFlow}>Reset</button>
                    </div>

                    <div>
                        <h4>Code</h4>
                        <textarea className="form-control" id="code-string" value={strcode} onChange={() => { }} rows="20">
                        </textarea>
                    </div>
                    <div>
                        <h4>Result</h4>
                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={() => { }} rows="3">
                        </textarea>
                    </div>

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

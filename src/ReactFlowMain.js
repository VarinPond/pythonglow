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

import TextUpdaterNode from './Components/TextNode';
import PrintNode from './Components/PrintNode';
import ColorSelectorNode from './Components/ColorSelectorNode';
import Assign from './Components/Assign';

import { Container } from 'react-bootstrap';

const initBgColor = '#B8CEFF';

const nodeTypes = {
    textUpdater: TextUpdaterNode,
    printFunction: PrintNode,
    selectorNode: ColorSelectorNode,
    assign: Assign
};
const getCode = (type, data) => {
    var datatype = "";
    if (type === "assign") {
        if (data.type === "text") {
            datatype = "str";
        } else if (data.type === "number") {
            datatype = "float";
        } else if (data.type === "boolean") {
            datatype = "bool";
        }
        var res = `${data.name} = ${datatype}(${data.value})`
    } else if (type === "printFunction") {
        var val = data
        if (data.type === "text") {
            val = `'${data}'`
        }
        res = `print(${data})`
    }

    return res;
};

function Flow() {
    const [gencode, setGencode] = useState("");
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [bgColor, setBgColor] = useState(initBgColor);
    const [assignData, setAssignData] = useState({
        value: "",
        name: "",
        type: "text",
        code: "",
    });
    const [result, setResult] = useState("");
    useEffect(() => {
        const onChange = (event) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== '2') {
                        return node;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color,
                        },
                    };
                })
            );
        };
        const onAssignChange = (data) => {
            setAssignData(data);
            console.log(data);
        };



        setNodes([
            // {
            //     id: '2',
            //     type: 'selectorNode',
            //     data: { onChange: onChange, color: initBgColor },
            //     style: { border: '1px solid #777', padding: 10 },
            //     position: { x: 200, y: 80 },
            // },
            {
                id: '0',
                type: 'assign',
                position: { x: -100, y: -100 },
                data: {
                    onChange: onAssignChange,
                    getCode: getCode,
                    name: assignData.name,
                    type: assignData.type,
                    value: assignData.value

                },

            },
            {
                id: '6',
                type: 'printFunction',
                data: { getCode: getCode, value: "Hello World" },
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


    const RunOnclick = () => {
        edges.forEach((edge) => {
            var snode = (nodes.filter(node => node.id === edge.source));
            var tnode = (nodes.filter(node => node.id === edge.target));
            console.log(snode[0].data)
            console.log(tnode[0].data)
            var p1 = (snode[0].data.getCode(snode[0].type, assignData))
            var p2 = (tnode[0].data.getCode(tnode[0].type, assignData.name))
            setGencode(p1 + "\n" + p2)
        });
        setResult(assignData.value)

    };

    return (
        <Container style={{ width: '1000px', height: "1000px" }}>

            <div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={() => { RunOnclick() }}>Execute</button>
            <h3>Code</h3>
                <textarea className='mb-2 w-100 pe-none ' rows="3" value={gencode} >
                </textarea>
            </div>
            <h3>Result</h3>
            <div  >
                <textarea className='mb-2 w-100 pe-none ' rows="3" value={result} >
                </textarea>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={{ background: bgColor }}
            >
                <Controls />

            </ReactFlow>
        </Container>
    );
}

export default Flow;

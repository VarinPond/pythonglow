import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Styles/BlockStyle.css";

import PrintNode from "./Blocks/PrintNode";
import StartNode from "./Blocks/StartNode";
import EndNode from "./Blocks/EndNode";
import Assign from "./Blocks/Assign";
import ImportNode from "./Blocks/ImportNode";
import SelectColumnNode from "./Blocks/SelectColumnNode";
import ExportNode from "./Blocks/ExportNode";
import SelectColumnNew from "./Blocks/SelectColumn";

const minX = -100;
const maxX = 100;
const minY = -100;
const maxY = 100;

class csvFile {
  constructor(data) {
    this.name = data.name;
    this.data = data.data;
  }
}

const convertTextToCSV = (textData) => {
  const csvData = textData.split("\n").map((line) => line.split(","));
  return csvData.map((row) => row.join(",")).join("\n");
};

const ExportOnClick = (id) => {
  if (localStorage.getItem(`${"FileData" + id}`) === null) {
  } else {
    const csvData = convertTextToCSV(
      localStorage.getItem(`${"FileData" + id}`)
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvData
    )}`;
    downloadLink.download = localStorage.getItem(`${"Filename" + id}`);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

const nodeTypes = {
  printFunction: PrintNode,
  assign: Assign,
  start: StartNode,
  end: EndNode,
  import: ImportNode,
  selectcolumn: SelectColumnNode,
  selectcolumnnew: SelectColumnNew,
  exportnode: ExportNode,
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
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [strcode, setStrcode] = useState("");

  const GetNodeByID = (id) => {
    return nodes.find((nd) => nd.id === id);
  };
  const UpdateNodeByID = (id, data) => {
    nodes.find((nd) => nd.id === id).setSelf(data);
    setNodes((nds) => {
      const nodeData = nds.find((item) => item.id === id);
      nodeData.data = data;
      return [...nds];
    });
  };

  const forwardData = useCallback(
    (sourceID, targetID) => {
      const sourceNode = GetNodeByID(sourceID);
      const targetNode = GetNodeByID(targetID);
      if (sourceNode && targetNode) {
        setNodes((nds) => {
          const nodeData = nds.find((item) => item.id === targetID);
          nodeData.data.give = sourceNode.data;
          return [...nds];
        });

        console.log(
          "forwardData",
          nodes.find((item) => item.id === targetID)
        );

      } else {
        console.error("Source or target node not found.");
      }
    },
    [nodes]
  );

  const onNodesDataChange = (id, newData) => {
    console.log("onNodesDataChange");
    UpdateNodeByID(id, newData);
  };

  const onConnect =
    ({ source, target }) => {
      setEdges((eds) =>
        addEdge(
          { source, target, animated: true, style: { stroke: "#fff" } },
          eds
        )
      );
      forwardData(source, target);
    };

  const onNodeClick = useCallback((event, node) => {
    console.log(node);
  }, []);

  class Node {
    constructor(data) {
      this.id = data.id;
      this.data = {
        self: {},
        ...data,
        onChange: onNodesDataChange || (() => {}),
      };
      this.position = { x: 0, y: 0 };
    }
    setSelf(data) {
      this.data.self = data;
    }
  }

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
    nodes.push(newNodeData);
  };

  const ResetFlow = () => {
    setNodes([]);
    setEdges([]);
    setStrcode("");
    localStorage.clear();
  };

  const getAllBlocks = () => {
    const blocks = nodes.map((item) => {
      return {
        id: item.id,
        type: item.type,
        position: item.position,
        data: nodes.find((nd) => nd.id === item.id).data,
      };
    });

    return blocks;
  };

  const getConnectedNode = () => {
    const blocks = getAllBlocks();
    var connected_node = edges.map((item) => {
      return {
        source: blocks.find((block) => block.id === item.source),
        target: blocks.find((block) => block.id === item.target),
      };
    });
    return connected_node;
  };
  const getFlowList = () => {
    var flowlist = flattenArrayOfObjects(getConnectedNode());
    var flowData = getAllBlocks().filter((item) => flowlist.includes(item.id));
    flowData.sort((a, b) => {
      const indexA = flowlist.indexOf(a.id);
      const indexB = flowlist.indexOf(b.id);
      return indexA - indexB;
    });

    return flowData;
  };

  const excuteFlow = () => {
    const flowData = getFlowList();
    flowData.map((item) => {
      if (item.data && item.data.give && item.data.give.id) {
        var lastItemId = item.data.give.id;
        switch (item.type) {
          case "exportnode":
            ExportOnClick(lastItemId);
            break;
          default:
            break;
        }
      } else {
      }
    });
  };

  const getCode = () => {
    excuteFlow();
    setStrcode(JSON.stringify(getFlowList()));
  };

  const RunCode = () => {
    setStrcode(55);
  };

  const debug = () => {
    console.log("debug-------------");
    console.log(nodes);
    console.log(getFlowList());
    console.log(getConnectedNode());
  };
  return (
    <ReactFlowProvider>
      <div className="row d-flex justify-content-center">
        <div className="col-10 p-2">
          <h3>Low-Code No-Code</h3>
          <div className=" d-flex justify-content-between">
            <div
              className="btn-group my-3"
              role="group"
              aria-label="Basic example"
            ></div>
            <div className="">
              <button
                className="btn btn-success"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                Show panel
              </button>

              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "start" })}
              >
                Start
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "end" })}
              >
                End
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "import" })}
              >
                Import csv
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "selectcolumnnew" })}
              >
                Select column
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
              >
                Select row
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "assign" })}
              >
                Assign
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
              >
                Fill na
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "printFunction" })}
              >
                Print
              </button>
              <button
                type="button"
                className="btn btn-primary "
                style={{ marginInline: 5 }}
                onClick={() => createNode({ type: "exportnode" })}
              >
                Export
              </button>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-start p-2"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasScrollingLabel"></h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="btn-group my-3 col-12"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-success"
                onClick={getCode}
              >
                Get code
              </button>
              <button type="button" className="btn btn-info" onClick={RunCode}>
                Run
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={ResetFlow}
              >
                Reset
              </button>
              <button type="button" className="btn btn-danger" onClick={debug}>
                debug
              </button>
            </div>


            <div>
              <h4>Code</h4>
              <textarea
                className="form-control"
                id="code-string"
                value={strcode}
                onChange={() => {}}
                rows="20"
              ></textarea>
            </div>
            <div>
              <h4>Result</h4>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                onChange={() => {}}
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-10 " style={{ height: "800px" }}>
          <h3>Flow</h3>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            style={{ background: "#B8CEBF" }}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default Playground;

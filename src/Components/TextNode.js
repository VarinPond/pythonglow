import React, { useState, useEffect, memo } from 'react';
import { Handle, Position } from 'reactflow';
import './TextNode.css';
import './PrintNode.css';

function TextUpdaterNode(props) {
    const [blockData, setBlockData] = useState({
        value: '',
        name: '',
        type: 'text',
    });

    useEffect(() => {
        if (props.data) {
            setBlockData(props.data);
        }
    }, [props.data]);

    const handleTypeChange = (evt) => {
        setBlockData({
            ...blockData,
            type: evt.target.value,
        });
    };

    const handleNameChange = (evt) => {
        setBlockData({
            ...blockData,
            name: evt.target.value,
        });
    };

    const handleValueChange = (evt) => {
        setBlockData({
            ...blockData,
            value: evt.target.value,
        });
    };

    const { isConnectable } = props;

    return (
        <div className="accordion text-updater-node" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="title accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Variable
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body">
                        <div>
                            <label htmlFor="type">Type:</label>
                            <select
                                name="type"
                                id="type"
                                value={blockData.type}
                                onChange={handleTypeChange}
                            >
                                <option value="text">String</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={blockData.name}
                                onChange={handleNameChange}
                                className="nodrag"
                            />
                        </div>
                        <div>
                            <label htmlFor="value">Value:</label>
                            <input
                                type={blockData.type}
                                id="value"
                                name="value"
                                value={blockData.value}
                                onChange={handleValueChange}
                                className="nodrag"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default TextUpdaterNode;

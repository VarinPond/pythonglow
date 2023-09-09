import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    const [blockData, setBlockData] = useState({
        id: data.id,
        value: data.value,
        name: data.name,
        type_var: 'text',
        code: '{} = {}({})',
    });
    const onChange = (evt) => {
        setBlockData({
            ...blockData,
            [evt.target.name]: evt.target.value,
        });

        data.onChange(data.id, {
            ...blockData,
            [evt.target.name]: evt.target.value,
        });
    };


    return (
        <>
            <div className="accordion text-updater-node" id={"accordion"+data.id} style={{ width: "90px" }}>
                <Handle
                    type="target"
                    position={Position.top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <div className="accordion-header" id={"headingOne"+data.id}>
                    <button
                        className="title accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse"+data.id}
                        aria-expanded="true"
                        aria-controls={"collapse"+data.id}
                        style={{ fontSize: "0.5rem", padding: "0.2rem", borderRadius: "0.2rem" }}
                    >
                        Variable
                    </button>
                </div>
                <div className="accordion-item">

                    <div
                        id={"collapse"+data.id}
                        className="accordion-collapse collapse show"
                        aria-labelledby={"headingOne"+data.id}
                        data-bs-parent={"#accordion"+data.id}
                    >
                        <div className="accordion-body" style={{ padding: "5px" }}>
                            <div style={{ fontSize: "5px" }}>
                                <label htmlFor="type_var" style={{ fontSize: "5px" }}>Type:</label>
                                <select
                                    name="type_var"
                                    id="type_var"
                                    value={blockData.type_var}
                                    onChange={onChange}
                                    style={{ fontSize: "5px", width: "100%" }}
                                >
                                    <option value="text">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                </select>
                            </div>
                            <div style={{ fontSize: "5px" }}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={blockData.name}
                                    onChange={onChange}
                                    className="nodrag"
                                />
                            </div>
                            <div style={{ fontSize: "5px" }}>
                                <label htmlFor="value">Value:</label>
                                <input
                                    type={blockData.type}
                                    id="value"
                                    name="value"
                                    value={blockData.value}
                                    onChange={onChange}
                                    className="nodrag"
                                />
                            </div>

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
        </>

    );
});

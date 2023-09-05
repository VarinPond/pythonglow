import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    const [blockData, setBlockData] = useState({
        value: data.value,
        name: data.name,
        type: data.type,
        code: '',
    });
    // all field onChange
    const onChange = (evt) => {
        setBlockData({
            ...blockData,
            [evt.target.name]: evt.target.value,
        });

        data.onChange(blockData);

    };
    

    return (
        <>
            <div className="accordion text-updater-node" id="accordionExample">
                <Handle
                    type="target"
                    position={Position.top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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

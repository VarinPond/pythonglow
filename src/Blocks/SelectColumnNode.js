import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

class fileData {
    constructor(data) {
        this.name = data.name;
        this.data = data.data;
    }
}

export default memo(({ data, isConnectable }) => {
    const [SelectColumnData, setSelectColumnData] = useState({
        id: data.id,
        dataframe: '',
    });
    const [options, setOptions] = useState([]);
    const onChange = (evt) => {
        setSelectColumnData({
            ...SelectColumnData,
            [evt.target.name]: evt.target.value,
        });

        data.onChange(data.id, {
            ...SelectColumnData,
            [evt.target.name]: evt.target.value,
        });
    };

    useEffect(() => {
        const fileList = data.fileList || [ new fileData({name: "No Data", data: ""})];

        const mappedOptions = fileList.map((file) => {
            return (
                <option  value={file.name} style={{fontSize:"18px"}}>
                    {file.name}
                </option>
            );
        });

        setOptions(mappedOptions);
    }, []);


    return (
        <>
            <div className="accordion text-updater-node " id={"accordion" + data.id} style={{ width: "120px" }}>
                <Handle
                    type="target"
                    position={Position.top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <div className="accordion-header" id={"headingOne" + data.id}>
                    <button
                        className="title accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + data.id}
                        aria-expanded="true"
                        aria-controls={"collapse" + data.id}
                        style={{ fontSize: "0.5rem", padding: "0.2rem", borderRadius: "0.2rem" }}
                    >
                        Select Column
                    </button>
                </div>
                <div className="accordion-item">

                    <div
                        id={"collapse" + data.id}
                        className="accordion-collapse collapse show"
                        aria-labelledby={"headingOne" + data.id}
                        data-bs-parent={"#accordion" + data.id}
                    >
                        <div className="accordion-body" style={{ padding: "5px" }}>
                            <div>
                                <div style={{ fontSize: '5px' }}>
                                    <label htmlFor="dataframe" style={{ fontSize: '5px' }}>
                                        Type:
                                    </label>
                                    <select
                                        name="dataframe"
                                        id="dataframe"
                                        value={SelectColumnData.dataframe}
                                        onChange={onChange}
                                        style={{ fontSize: '5px', width: '100%' }}
                                    >
                                        {options}
                                    </select>
                                </div>
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

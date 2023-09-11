import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

class varData {
    constructor(data) {
        this.name = data.name;
        this.data = data.data;
    }
}

function PrintNode({ data, isConnectable }) {
    const [options, setOptions] = useState([]);
    const [selectedVar, setSelectedVar] = useState({ name: "No Data", data: "" });
    useEffect(() => {
        data.onChange(data.id, {
            id: data.id,
            code: `print("{}".format(?,))`,
        });
    }, []);

    const onChange = useCallback(
        (evt) => {
            data.onChange(data.id, {
                ...data,
                [evt.target.name]: evt.target.value,
                code: `print("{}".format(${evt.target.value},))`,
            });
        },
        [data]
    );

    useEffect(() => {
        const fileList = false || [new varData({ name: "No Data", data: "" })];

        const mappedOptions = fileList.map((file) => {
            return (
                <option value={file.name} style={{ fontSize: "18px" }}>
                    {file.name}
                </option>
            );
        });

        setOptions(mappedOptions);
    }, []);

    return (
        <>
            <div className="print-node" id={"print" + data.id}>
                <span className='fw-bold'>Print</span>
                <div>
                    <div style={{ fontSize: '5px' }}>
                        <label htmlFor="dataframe" style={{ fontSize: '5px' }}>
                            select
                        </label>
                        <select
                            name="dataframe"
                            id="dataframe"
                            value={selectedVar.name}
                            onChange={onChange}
                            style={{ fontSize: '5px', width: '100%' }}
                        >
                            {options}
                        </select>
                    </div>
                </div>
                <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
                <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />

            </div>
        </>
    );
}

export default PrintNode;

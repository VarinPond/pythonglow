import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    const [SelectedColumn, setSelectedColumn] = useState({
        id: data.id,
        code: '',
        colname: [],
        onChange: data.onChange,

    });
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [colList, setColList] = useState([]);

   const onCheck = (col) => {

        if (selectedColumns.includes(col)) {
            setSelectedColumns(selectedColumns.filter((item) => item !== col));
        } else {
            setSelectedColumns([...selectedColumns, col]);
        }
    };
    
    useEffect(() => {
        const colList = data.cols || ['No Data'];

        const mappedOptions = colList.map((col) => (
            <div key={col.name} style={{ fontSize: "2px" }}>
                <div className='d-flex justify-content-between'>
                    <input
                        type="checkbox"
                        value={col}
                        checked={selectedColumns.includes(col)}
                        onChange={() => onCheck(col)}
                        style={{fontSize: "2px", width: "20px", height: "20px"}}
                    />
                    {col}
                </div>
            </div>
        ));
        setColList(mappedOptions);

    }, [ ]);

    useEffect(() => {
        console.log(data);
        data.onChange(data.id, {
            ...SelectedColumn,
            colname: selectedColumns,
        });
        
    }, [selectedColumns]);



    
    return (
        <>
            <div className="accordion text-updater-node " id={'accordion' + data.id} style={{ width: '120px' }}>
                <Handle
                    type="target"
                    position={Position.top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <div className="accordion-header" id={'headingOne' + data.id}>
                    <button
                        className="title accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#collapse' + data.id}
                        aria-expanded="true"
                        aria-controls={'collapse' + data.id}
                        style={{ fontSize: '0.5rem', padding: '0.2rem', borderRadius: '0.2rem' }}
                    >
                        Select Column
                    </button>
                </div>
                <div className="accordion-item">
                    <div
                        id={'collapse' + data.id}
                        className="accordion-collapse collapse show"
                        aria-labelledby={'headingOne' + data.id}
                        data-bs-parent={'#accordion' + data.id}
                    >
                        <div className="accordion-body" style={{ padding: '5px' }}>
                            <div>
                                <div>
                                    {colList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
        </>
    );
});

import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

function ExportNode({ data, isConnectable }) {
    const [exportData, setExportData] = useState({
        id: data.id,
        URL: "/select-columns",
    });
    useEffect(() => {
        data.onChange(data.id, {
            ...data,
            exportData: exportData,
        });
    }, [exportData]);
    
    return (
        <>
            <div className="print-node" id={"export"+data.id}>
                <span className='fw-bold'>Export</span>
                <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
            </div>
        </>
    );
}

export default ExportNode;

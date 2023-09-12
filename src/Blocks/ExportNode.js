import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

function ExportNode({ data, isConnectable }) {
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

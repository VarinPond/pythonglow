import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './PrintNode.css'

function PrintNode({ data, isConnectable }) {
    return (
        <div className="print-node">

            <span className='title'>print()</span>
            <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
        </div>
    );
}

export default PrintNode;

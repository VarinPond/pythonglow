import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

function PrintNode({ data, isConnectable }) {
    useEffect(() => {
        data.onChange(data.id, {
            id: data.id,
            code: "print({})",
        });
    }, []);

    return (
        <>
            <div className="print-node"  id={"print"+data.id}>

                <span className='fw-bold'>Print</span>
                <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />
                <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />

            </div>
        </>
    );
}

export default PrintNode;

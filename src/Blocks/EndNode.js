import { Handle, Position } from 'reactflow';

function EndNode({ data, isConnectable }) {
    return (
        <>
            <div className="print-node"  id={"end"+data.id}>

                <span className='fw-bold'>End</span>
                <Handle type="target" position={Position.Top} id="a" isConnectable={isConnectable} />

            </div>
        </>
    );
}

export default EndNode;

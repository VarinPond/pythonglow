import { Handle, Position } from 'reactflow';

function StartNode({ data, isConnectable }) {
    return (
        <>
            <div className="print-node" id={"start"+data.id}>
                <span className='fw-bold'>Start</span>
                <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
            </div>
        </>
    );
}

export default StartNode;

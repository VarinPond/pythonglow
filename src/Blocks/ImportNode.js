import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
    const [ImportData, setImportData] = useState({
        id: data.id,
        code: '',
        fileData: '',
    });
    const onChange = (evt) => {
        setImportData({
            ...ImportData,
            [evt.target.name]: evt.target.value,
        });

        data.onChange(data.id, {
            ...ImportData,
            [evt.target.name]: evt.target.value,
        });
    };

    useEffect   (() => {
        data.onChange(data.id, {
            ...ImportData,
        });
    }, [ImportData]);

    function displayFileName(event) {
        const input = event.target;
        const fileNameDisplay = document.getElementById("fileNameDisplay");
    
        if (input.files.length > 0) {
            const file = input.files[0];
            const fileName = file.name;
    
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileContents = e.target.result;
    
                localStorage.setItem(`${'Filename'+data.id}`, fileName);
                localStorage.setItem(`${"FileData"+data.id}`, fileContents);
    
                setImportData({
                    fileData: fileContents,
                });
    
                fileNameDisplay.innerText = fileName;
            };
            reader.readAsText(file);
        } 
    }
    

    return (
        <>
            <div className="accordion text-updater-node" id={"accordion" + data.id} style={{ width: "90px" }}>
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
                        Import Csv
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
                                <input className="" type="file" id="formFile" style={{ fontSize: "15px", padding: "2px" }} onChange={displayFileName} />
                            </div>
                            <div id="fileNameDisplay" style={{ fontSize: "12px", marginTop: "5px" }}></div>
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

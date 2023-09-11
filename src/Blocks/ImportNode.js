import React, { memo, useCallback, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

const getAllColumn = (csvData) => {
  const csvDataArray = csvData.split("\n").map((line) => line.split(","));
  const header = csvDataArray[0].map((column) => column.replace(/\r/g, ""));
  return header;
};

export default memo(({ data, isConnectable }) => {
  const [ImportData, setImportData] = useState({
    id: data.id,
    code: "",
    fileData: "",
    fileName: "",
    cols: [],
    onChange: data.onChange,
  });

  function displayFileName(event) {
    const input = event.target;
    const fileNameDisplay = document.getElementById(
      `fileNameDisplay${data.id}`
    );

    if (input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name;
      try {
        const reader = new FileReader();
        reader.onload = function (e) {
          const fileContents = e.target.result;
          saveDataToLocalStorage(data.id, fileName, fileContents);
          fileNameDisplay.innerText = fileName;
        };
        reader.readAsText(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  }

  function saveDataToLocalStorage(id, fileName, fileContents) {
    localStorage.setItem(`Filename${id}`, fileName);
    localStorage.setItem(`FileData${id}`, fileContents);
    setImportData((prevImportData) => ({
      ...prevImportData,
      fileData: fileContents,
      fileName: fileName,
      code: `import pandas as pd\n` + `df = pd.read_csv('${fileName}')`,
      cols: getAllColumn(fileContents),
    }));

  }

  useEffect(() => {
    console.log(ImportData);
    data.onChange(data.id, {
      ...ImportData,
    });
  }, [ImportData]);

  return (
    <>
      <div
        className="accordion text-updater-node"
        id={"accordion" + data.id}
        style={{ width: "90px" }}
      >
        <Handle
          type="target"
          position={Position.top}
          style={{ background: "#555" }}
          onConnect={(params) => console.log("handle onConnect", params)}
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
            style={{
              fontSize: "0.5rem",
              padding: "0.2rem",
              borderRadius: "0.2rem",
            }}
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
                <input
                  className=""
                  type="file"
                  id={"formFile" + data.id}
                  style={{ fontSize: "15px", padding: "2px" }}
                  onChange={displayFileName}
                />
              </div>
              <div
                id={"fileNameDisplay" + data.id}
                style={{ fontSize: "12px", marginTop: "5px" }}
              ></div>
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

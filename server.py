from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

class SelectColumnReq(BaseModel):
    data: dict
    columns: list

class SelectRowsReq(BaseModel):
    data: dict
    start: int
    end: int

class FillnaReq(BaseModel):
    data: dict
    method: str

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/select-columns")
def read_root(request_data: SelectColumnReq):
    data = request_data.data
    columns = request_data.columns
    for column in data.keys():
        data[column] = {k: v.strip() for k, v in data[column].items() if v.strip() != ''}
    
    df = pd.DataFrame(data)
    df = df[columns]
    return_df = df.to_dict()
    return {"data": return_df}

@app.post("/select-rows")
def read_root(request_data: SelectRowsReq):
    data = request_data.data
    start = request_data.start
    end = request_data.end
    df = pd.DataFrame(data)
    try:
        df = df[start:end]
        return_df = df.to_dict()
    except:
        return {"error": "Something wrong with start and end"} 
    return {"data": return_df}

@app.post("/fillna")
def read_root(request_data: FillnaReq):
    data = request_data.data
    method = request_data.method
    df = pd.DataFrame(data)
    try:
        df = df.fillna(method=method)
        return_df = df.to_dict()
    except:
        return {"error": "Something wrong with fill na method"}
    return {"data": return_df}

@app.post("/execute")
def ExecCode(code_string):
    try:
        result = exec(code_string)
        return {"result": result}
    except:
        return {"error": "Code not executed"}


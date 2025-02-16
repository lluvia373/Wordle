from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

answer_list = ['APPLE', 'TRAIN', 'SNAKE', 'SLEEP']

@app.get("/answer")
def get_answer():
    answer = random.choice(answer_list)
    return {"answer": answer}

app.mount("/", StaticFiles(directory="wordle_package", html = True), name="static")
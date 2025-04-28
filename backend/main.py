from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Liberar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Banco de dados fake na memória (lista de tarefas)
tasks = []

# Rota para pegar todas as tarefas
@app.get("/tasks")
def get_tasks():
    return tasks

# Rota para adicionar uma nova tarefa
@app.post("/tasks")
def add_task(task: dict):
    tasks.append(task)
    return {"message": "Tarefa adicionada com sucesso!"}

# Rota para deletar uma tarefa (opcional)
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
        return {"message": "Tarefa deletada com sucesso!"}
    return {"error": "ID inválido"}

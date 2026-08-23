from fastapi import FastAPI
from database import get_connection
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskCreate(BaseModel):
    title: str


class TaskUpdate(BaseModel):
    title: str




@app.get("/")
def root():
    return {"message": "TaskFlow API is running"}


@app.get("/db-test")
def db_test():
    connection = get_connection()
    connection.close()

    return {"message": "Database connection successful"}


@app.get("/tasks")
def get_tasks():
    connection = get_connection()

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT id, title, completed FROM tasks ORDER BY id DESC"
        )
        tasks = cursor.fetchall()

    connection.close()

    return [
        {
            "id": task[0],
            "title": task[1],
            "completed": task[2],
        }
        for task in tasks
    ]


@app.post("/tasks")
def create_task(task: TaskCreate):
    connection = get_connection()

    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO tasks (id, title, completed)
            VALUES (%s, %s, %s)
            """,
            (int(__import__("time").time() * 1000), task.title, False),
        )

    connection.commit()
    connection.close()

    return {"message": "Task created successfully"}



@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    connection = get_connection()

    with connection.cursor() as cursor:
        cursor.execute(
            "DELETE FROM tasks WHERE id = %s",
            (task_id,),
        )

    connection.commit()
    connection.close()

    return {"message": "Task deleted successfully"}  



@app.patch("/tasks/{task_id}")
def toggle_task(task_id: int):
    connection = get_connection()

    with connection.cursor() as cursor:
        cursor.execute(
            """
            UPDATE tasks
            SET completed = NOT completed
            WHERE id = %s
            """,
            (task_id,),
        )

    connection.commit()
    connection.close()

    return {"message": "Task updated successfully"}   



@app.put("/tasks/{task_id}")
def edit_task(task_id: int, task: TaskUpdate):
    connection = get_connection()

    with connection.cursor() as cursor:
        cursor.execute(
            """
            UPDATE tasks
            SET title = %s
            WHERE id = %s
            """,
            (task.title, task_id),
        )

    connection.commit()
    connection.close()

    return {"message": "Task edited successfully"}
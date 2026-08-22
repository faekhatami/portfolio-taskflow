from fastapi import FastAPI
from database import get_connection

app = FastAPI()


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
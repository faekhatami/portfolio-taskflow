import psycopg

DATABASE_URL = "postgresql://postgres:TaskFlow123!@localhost:5432/taskflow"


def get_connection():
    return psycopg.connect(DATABASE_URL)
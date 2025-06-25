import sqlite3

DB_NAME = "teredeverde.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Tabela de admins
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );
    """)
    cursor.execute("PRAGMA table_info(admins);")
    columns = [row[1] for row in cursor.fetchall()]
    if "email" not in columns:
        try:
            cursor.execute("ALTER TABLE admins ADD COLUMN email TEXT;")
        except:
               pass

    # Tabela de eventos
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT,
        location TEXT,
        available INTEGER DEFAULT 1
    );
    """)

    # Tabela de trilhas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS trails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        park TEXT,
        description TEXT,
        difficulty TEXT,
        estimated_time TEXT,
        ideal_for TEXT,
        safety_tips TEXT,
        map_url TEXT,
        image_url TEXT
    );
    """)
    # Garante que as colunas novas existem mesmo em bancos antigos
    cursor.execute("PRAGMA table_info(trails);")
    columns = [row[1] for row in cursor.fetchall()]
    for col in ["park", "ideal_for", "image_url"]:
        if col not in columns:
            try:
                cursor.execute(f"ALTER TABLE trails ADD COLUMN {col} TEXT;")
            except:
                pass

    # Tabela de parques
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS parks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        map_url TEXT,
        image_url TEXT,
        created TEXT,
        area TEXT,
        highlights TEXT
    );
    """)
    cursor.execute("PRAGMA table_info(parks);")
    columns = [row[1] for row in cursor.fetchall()]
    for col in ["image_url", "created", "area", "highlights"]:
        if col not in columns:
            try:
                cursor.execute(f"ALTER TABLE parks ADD COLUMN {col} TEXT;")
            except:
                pass

    # Tabela biodiversidade
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS biodiversidade (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        species TEXT,
        map_url TEXT,
        image_url TEXT,
        mamiferos TEXT,
        anfibios TEXT,
        aves TEXT,
        conclusao TEXT,
        parque TEXT
    );
    """)
    # Garante que as colunas novas existem mesmo em bancos antigos
    cursor.execute("PRAGMA table_info(biodiversidade);")
    columns = [row[1] for row in cursor.fetchall()]
    for col in ["image_url", "mamiferos", "anfibios", "aves", "conclusao", "parque"]:
        if col not in columns:
            try:
                cursor.execute(f"ALTER TABLE biodiversidade ADD COLUMN {col} TEXT;")
            except:
                pass

    # Tabela cachoeiras
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cachoeiras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        height TEXT,
        map_url TEXT,
        image_url TEXT
    );
    """)
    cursor.execute("PRAGMA table_info(cachoeiras);")
    columns = [row[1] for row in cursor.fetchall()]
    if "image_url" not in columns:
        try:
            cursor.execute("ALTER TABLE cachoeiras ADD COLUMN image_url TEXT;")
        except:
            pass

    # Cria admin padrão se não existir
    cursor.execute("SELECT * FROM admins WHERE username='admin'")
    if not cursor.fetchone():
        from auth_utils import get_password_hash
        cursor.execute(
            "INSERT INTO admins (username, password_hash) VALUES (?, ?)",
            ("admin", get_password_hash("admin123"))
        )
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
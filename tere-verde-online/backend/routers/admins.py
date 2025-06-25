from fastapi import APIRouter, Depends, HTTPException
from database import get_db_connection
from schemas import AdminCreate, AdminOut, ChangePasswordRequest
from auth_utils import get_password_hash, verify_password, decode_access_token
from routers.auth import get_current_admin
from typing import List

router = APIRouter(
    prefix="/admins",
    tags=["admins"]
)

@router.get("/", response_model=List[AdminOut])
def list_admins(username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, username FROM admins")
    admins = [dict(row) for row in cur.fetchall()]
    conn.close()
    return admins

@router.post("/", response_model=AdminOut)
def create_admin(admin: AdminCreate, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    password_hash = get_password_hash(admin.password)
    try:
        cur.execute("INSERT INTO admins (username, password_hash) VALUES (?, ?)",
                    (admin.username, password_hash))
        conn.commit()
        admin_id = cur.lastrowid
        conn.close()
        return {"id": admin_id, "username": admin.username}
    except Exception:
        conn.close()
        raise HTTPException(status_code=400, detail="Usuário já existe.")

@router.put("/change-password")
def change_password(
    data: ChangePasswordRequest,
    current_admin: str = Depends(get_current_admin)
):
    conn = get_db_connection()
    cur = conn.cursor()
    # Só permite trocar senha se for o próprio ou se for admin master (opcional lógica extra)
    password_hash = get_password_hash(data.new_password)
    cur.execute("UPDATE admins SET password_hash=? WHERE username=?", (password_hash, data.username))
    conn.commit()
    rows_affected = cur.rowcount
    conn.close()
    if rows_affected == 0:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return {"ok": True}

@router.delete("/{admin_id}")
def delete_admin(admin_id: int, username: str = Depends(get_current_admin)):
    # Impede auto-exclusão do último admin do sistema
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) as total FROM admins")
    total = cur.fetchone()["total"]
    if total <= 1:
        conn.close()
        raise HTTPException(status_code=400, detail="Não é possível excluir o último admin.")
    cur.execute("DELETE FROM admins WHERE id=?", (admin_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
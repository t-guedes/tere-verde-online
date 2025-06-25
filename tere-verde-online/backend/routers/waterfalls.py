from fastapi import APIRouter, Depends, HTTPException, Query
from database import get_db_connection
from schemas import WaterfallBase, WaterfallOut
from typing import List, Optional
from routers.auth import get_current_admin

router = APIRouter(
    prefix="/cachoeiras",
    tags=["cachoeiras"]
)

@router.get("/", response_model=List[WaterfallOut])
def list_waterfalls(
    name: Optional[str] = Query(None),
    height: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM cachoeiras WHERE 1=1"
    params = []
    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    if height:
        query += " AND height LIKE ?"
        params.append(f"%{height}%")
    cur.execute(query, tuple(params))
    items = [dict(row) for row in cur.fetchall()]
    conn.close()
    return items

@router.post("/", response_model=WaterfallOut)
def create_waterfall(item: WaterfallBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    image_url = item.image_url or ""  # garante sempre string
    cur.execute(
        "INSERT INTO cachoeiras (name, description, location, height, map_url, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        (item.name, item.description, item.location, item.height, getattr(item, "map_url", ""), image_url)
    )
    conn.commit()
    item_id = cur.lastrowid
    conn.close()
    # devolve image_url corretamente
    return {**item.dict(), "image_url": image_url, "id": item_id}

@router.put("/{cachoeiras_id}", response_model=WaterfallOut)
def update_waterfall(cachoeiras_id: int, item: WaterfallBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    image_url = item.image_url or ""
    cur.execute(
        "UPDATE cachoeiras SET name=?, description=?, location=?, height=?, map_url=?, image_url=? WHERE id=?",
        (item.name, item.description, item.location, item.height, getattr(item, "map_url", ""), image_url, cachoeiras_id)
    )
    conn.commit()
    conn.close()
    return {**item.dict(), "image_url": image_url, "id": cachoeiras_id}

@router.delete("/{cachoeiras_id}")
def delete_waterfall(cachoeiras_id: int, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM cachoeiras WHERE id=?", (cachoeiras_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
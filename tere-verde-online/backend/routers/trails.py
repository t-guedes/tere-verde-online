from fastapi import APIRouter, Depends, Query
from database import get_db_connection
from schemas import TrailBase, TrailOut
from typing import List, Optional
from routers.auth import get_current_admin

router = APIRouter(
    prefix="/trails",
    tags=["trails"]
)

@router.get("/", response_model=List[TrailOut])
def list_trails(
    name: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM trails WHERE 1=1"
    params = []
    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    cur.execute(query, tuple(params))
    trails = [dict(row) for row in cur.fetchall()]
    conn.close()
    return trails

@router.post("/", response_model=TrailOut)
def create_trail(trail: TrailBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO trails (name, park, description, difficulty, estimated_time, ideal_for, safety_tips, map_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            trail.name,
            getattr(trail, "park", ""),
            trail.description,
            trail.difficulty,
            trail.estimated_time,
            getattr(trail, "ideal_for", ""),
            trail.safety_tips,
            getattr(trail, "map_url", ""),
            getattr(trail, "image_url", "")
        )
    )
    conn.commit()
    trail_id = cur.lastrowid
    conn.close()
    return {**trail.dict(), "id": trail_id}

@router.put("/{trail_id}", response_model=TrailOut)
def update_trail(trail_id: int, trail: TrailBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE trails SET name=?, park=?, description=?, difficulty=?, estimated_time=?, ideal_for=?, safety_tips=?, map_url=?, image_url=? WHERE id=?",
        (
            trail.name,
            getattr(trail, "park", ""),
            trail.description,
            trail.difficulty,
            trail.estimated_time,
            getattr(trail, "ideal_for", ""),
            trail.safety_tips,
            getattr(trail, "map_url", ""),
            getattr(trail, "image_url", ""),
            trail_id
        )
    )
    conn.commit()
    conn.close()
    return {**trail.dict(), "id": trail_id}

@router.delete("/{trail_id}")
def delete_trail(trail_id: int, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM trails WHERE id=?", (trail_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
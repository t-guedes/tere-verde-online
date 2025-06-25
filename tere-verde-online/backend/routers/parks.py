from fastapi import APIRouter, Depends, HTTPException, Query
from database import get_db_connection
from schemas import ParkBase, ParkOut
from typing import List, Optional
from routers.auth import get_current_admin

router = APIRouter(
    prefix="/parks",
    tags=["parks"]
)

@router.get("/", response_model=List[ParkOut])
def list_parks(
    name: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM parks WHERE 1=1"
    params = []
    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    cur.execute(query, tuple(params))
    parks = [dict(row) for row in cur.fetchall()]
    conn.close()
    return parks

@router.post("/", response_model=ParkOut)
def create_park(park: ParkBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO parks (
            name, description, location, map_url, image_url, created, area, highlights
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            park.name,
            park.description,
            park.location,
            getattr(park, "map_url", ""),
            getattr(park, "image_url", ""),
            getattr(park, "created", ""),
            getattr(park, "area", ""),
            getattr(park, "highlights", ""),
        )
    )
    conn.commit()
    park_id = cur.lastrowid
    conn.close()
    return {**park.dict(), "id": park_id}

@router.put("/{park_id}", response_model=ParkOut)
def update_park(park_id: int, park: ParkBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        UPDATE parks SET
            name=?, description=?, location=?, map_url=?, image_url=?, created=?, area=?, highlights=?
        WHERE id=?
        """,
        (
            park.name,
            park.description,
            park.location,
            getattr(park, "map_url", ""),
            getattr(park, "image_url", ""),
            getattr(park, "created", ""),
            getattr(park, "area", ""),
            getattr(park, "highlights", ""),
            park_id
        )
    )
    conn.commit()
    conn.close()
    return {**park.dict(), "id": park_id}

@router.delete("/{park_id}")
def delete_park(park_id: int, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM parks WHERE id=?", (park_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
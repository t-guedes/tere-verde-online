from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from database import get_db_connection
from schemas import EventBase, EventOut
from routers.auth import get_current_admin

router = APIRouter(
    prefix="/events",
    tags=["events"]
)

@router.get("/", response_model=List[EventOut])
def list_events(
    title: Optional[str] = Query(None),
    date: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM events WHERE 1=1"
    params = []
    if title:
        query += " AND title LIKE ?"
        params.append(f"%{title}%")
    if date:
        query += " AND date = ?"
        params.append(date)
    cur.execute(query, tuple(params))
    events = [dict(row) for row in cur.fetchall()]
    conn.close()
    return events

@router.post("/", response_model=EventOut)
def create_event(event: EventBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO events (title, description, date, location, available) VALUES (?, ?, ?, ?, ?)",
        (event.title, event.description, event.date, event.location, int(event.available))
    )
    conn.commit()
    event_id = cur.lastrowid
    conn.close()
    return {**event.dict(), "id": event_id}

@router.put("/{event_id}", response_model=EventOut)
def update_event(event_id: int, event: EventBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE events SET title=?, description=?, date=?, location=?, available=? WHERE id=?",
        (event.title, event.description, event.date, event.location, int(event.available), event_id)
    )
    conn.commit()
    conn.close()
    return {**event.dict(), "id": event_id}

@router.delete("/{event_id}")
def delete_event(event_id: int, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM events WHERE id=?", (event_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
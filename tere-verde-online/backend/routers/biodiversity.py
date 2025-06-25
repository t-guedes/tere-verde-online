from fastapi import APIRouter, Depends, HTTPException, Query
from database import get_db_connection
from schemas import BiodiversityBase, BiodiversityOut
from typing import List, Optional
from routers.auth import get_current_admin
import json

router = APIRouter(
    prefix="/biodiversidade",
    tags=["biodiversidade"]
)

def _serialize_field(field):
    if field is None:
        return ""
    if isinstance(field, (list, dict)):
        return json.dumps(field, ensure_ascii=False)
    return str(field)

def _deserialize_field(field):
    if not field:
        return []
    try:
        return json.loads(field)
    except Exception:
        return field

@router.get("/", response_model=List[BiodiversityOut])
def list_biodiversity(
    name: Optional[str] = Query(None),
    species: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM biodiversidade WHERE 1=1"
    params = []
    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    if species:
        query += " AND species LIKE ?"
        params.append(f"%{species}%")
    cur.execute(query, tuple(params))
    rows = cur.fetchall()
    items = []
    for row in rows:
        data = dict(row)
        # Desserializa listas JSON
        data["mamiferos"] = _deserialize_field(data.get("mamiferos", ""))
        data["anfibios"] = _deserialize_field(data.get("anfibios", ""))
        data["aves"] = _deserialize_field(data.get("aves", ""))
        items.append(data)
    conn.close()
    return items

@router.post("/", response_model=BiodiversityOut)
def create_biodiversity(item: BiodiversityBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO biodiversidade 
        (name, description, location, species, map_url, image_url, mamiferos, anfibios, aves, conclusao, parque)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            item.name,
            item.description,
            getattr(item, "location", ""),
            getattr(item, "species", ""),
            getattr(item, "map_url", ""),
            getattr(item, "image_url", ""),
            _serialize_field(getattr(item, "mamiferos", "")),
            _serialize_field(getattr(item, "anfibios", "")),
            _serialize_field(getattr(item, "aves", "")),
            getattr(item, "conclusao", ""),
            getattr(item, "parque", "")
        )
    )
    conn.commit()
    item_id = cur.lastrowid
    conn.close()
    # Retorna já desserializado
    return {
        **item.dict(),
        "id": item_id,
        "mamiferos": item.mamiferos or [],
        "anfibios": item.anfibios or [],
        "aves": item.aves or []
    }

@router.put("/{biodiversidade_id}", response_model=BiodiversityOut)
def update_biodiversity(biodiversidade_id: int, item: BiodiversityBase, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        UPDATE biodiversidade 
        SET name=?, description=?, location=?, species=?, map_url=?, image_url=?, mamiferos=?, anfibios=?, aves=?, conclusao=?, parque=?
        WHERE id=?
        """,
        (
            item.name,
            item.description,
            getattr(item, "location", ""),
            getattr(item, "species", ""),
            getattr(item, "map_url", ""),
            getattr(item, "image_url", ""),
            _serialize_field(getattr(item, "mamiferos", "")),
            _serialize_field(getattr(item, "anfibios", "")),
            _serialize_field(getattr(item, "aves", "")),
            getattr(item, "conclusao", ""),
            getattr(item, "parque", ""),
            biodiversidade_id
        )
    )
    conn.commit()
    conn.close()
    return {
        **item.dict(),
        "id": biodiversidade_id,
        "mamiferos": item.mamiferos or [],
        "anfibios": item.anfibios or [],
        "aves": item.aves or []
    }

@router.delete("/{biodiversidade_id}")
def delete_biodiversity(biodiversidade_id: int, username: str = Depends(get_current_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM biodiversidade WHERE id=?", (biodiversidade_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
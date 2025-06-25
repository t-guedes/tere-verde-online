from pydantic import BaseModel
from typing import Optional, List, Any

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminCreate(BaseModel):
    username: str
    password: str

class AdminOut(BaseModel):
    id: int
    username: str

class Token(BaseModel):
    access_token: str
    token_type: str

class EventBase(BaseModel):
    title: str
    description: Optional[str] = ""
    date: Optional[str] = ""
    location: Optional[str] = ""
    available: Optional[bool] = True

class EventOut(EventBase):
    id: int

class TrailBase(BaseModel):
    name: str
    park: Optional[str] = ""
    description: Optional[str] = ""
    difficulty: Optional[str] = ""
    estimated_time: Optional[str] = ""
    ideal_for: Optional[str] = ""
    safety_tips: Optional[str] = ""
    map_url: Optional[str] = ""
    image_url: Optional[str] = ""

class TrailOut(TrailBase):
    id: int

class ParkBase(BaseModel):
    name: str
    description: Optional[str] = ""
    location: Optional[str] = ""
    map_url: Optional[str] = ""
    image_url: Optional[str] = ""
    created: Optional[str] = ""
    area: Optional[str] = ""
    highlights: Optional[str] = ""

class ParkOut(ParkBase):
    id: int

class BiodiversityBase(BaseModel):
    name: str
    description: Optional[str] = ""
    location: Optional[str] = ""
    species: Optional[str] = ""
    map_url: Optional[str] = ""
    image_url: Optional[str] = ""
    mamiferos: Optional[List[str]] = [] # list or JSON string
    anfibios: Optional[List[str]]= [] # list or JSON string
    aves: Optional[List[str]] = []    # list or JSON string
    conclusao: Optional[str] = ""
    parque: Optional[str] = ""

class BiodiversityCreate(BiodiversityBase):
    pass

class BiodiversityOut(BiodiversityBase):
    id: int

class WaterfallBase(BaseModel):
    name: str
    description: Optional[str] = ""
    location: Optional[str] = ""
    height: Optional[str] = ""
    map_url: Optional[str] = ""
    image_url: Optional[str] = ""

class WaterfallOut(WaterfallBase):
    id: int
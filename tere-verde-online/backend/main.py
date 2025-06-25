from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, events, trails, parks, admins, biodiversity, waterfalls
from database import create_tables

app = FastAPI(
    title="Terê Verde Online API",
    description="API RESTful para a plataforma de ecoturismo de Teresópolis.",
    version="1.0.0"
)

# Ajuste o CORS para permitir só o frontend do Codespaces
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://upgraded-succotash-5gq975pwrpxqh7r6-5173.app.github.dev",
        "https://upgraded-succotash-5gq975pwrpxqh7r6-8000.app.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão das rotas dos módulos
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(trails.router)
app.include_router(parks.router)
app.include_router(admins.router)
app.include_router(biodiversity.router)
app.include_router(waterfalls.router)

@app.on_event("startup")
def on_startup():
    create_tables()
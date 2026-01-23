from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import events, calendar, gallery, team, auth
import contextlib

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown

app = FastAPI(lifespan=lifespan)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://fyfp-website-hthb.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(calendar.router)
app.include_router(gallery.router)
app.include_router(team.router)

@app.get("/api")
async def root():
    return {"message": "FYFP API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

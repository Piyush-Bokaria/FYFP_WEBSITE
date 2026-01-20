from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas
from database import get_db

router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.Event])
async def read_events(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    events = await crud.get_events(db, skip=skip, limit=limit)
    return events

@router.post("/", response_model=schemas.Event)
async def create_event(event: schemas.EventCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_event(db=db, event=event)

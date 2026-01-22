from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas, dependencies
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
async def create_event(event: schemas.EventCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    return await crud.create_event(db=db, event=event)

@router.put("/{event_id}", response_model=schemas.Event)
async def update_event(event_id: int, event: schemas.EventCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_event = await crud.update_event(db, event_id=event_id, event=event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.delete("/{event_id}", response_model=schemas.Event)
async def delete_event(event_id: int, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_event = await crud.delete_event(db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

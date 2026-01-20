from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas
from database import get_db

router = APIRouter(
    prefix="/calendar",
    tags=["calendar"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.CalendarActivity])
async def read_calendar_activities(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    activities = await crud.get_calendar_activities(db, skip=skip, limit=limit)
    return activities

@router.post("/", response_model=schemas.CalendarActivity)
async def create_calendar_activity(activity: schemas.CalendarActivityCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_calendar_activity(db=db, activity=activity)

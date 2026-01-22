from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas, dependencies
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
async def create_calendar_activity(activity: schemas.CalendarActivityCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    return await crud.create_calendar_activity(db=db, activity=activity)

@router.put("/{activity_id}", response_model=schemas.CalendarActivity)
async def update_calendar_activity(activity_id: int, activity: schemas.CalendarActivityCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_activity = await crud.update_calendar_activity(db, activity_id=activity_id, activity=activity)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Calendar activity not found")
    return db_activity

@router.delete("/{activity_id}", response_model=schemas.CalendarActivity)
async def delete_calendar_activity(activity_id: int, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_activity = await crud.delete_calendar_activity(db, activity_id=activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Calendar activity not found")
    return db_activity

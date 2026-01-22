from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas, dependencies
from database import get_db

router = APIRouter(
    prefix="/team",
    tags=["team"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.TeamMember])
async def read_team_members(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    members = await crud.get_team_members(db, skip=skip, limit=limit)
    return members

@router.post("/", response_model=schemas.TeamMember)
async def create_team_member(member: schemas.TeamMemberCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    return await crud.create_team_member(db=db, member=member)

@router.put("/{member_id}", response_model=schemas.TeamMember)
async def update_team_member(member_id: int, member: schemas.TeamMemberCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_member = await crud.update_team_member(db, member_id=member_id, member=member)
    if db_member is None:
        raise HTTPException(status_code=404, detail="Team member not found")
    return db_member

@router.delete("/{member_id}", response_model=schemas.TeamMember)
async def delete_team_member(member_id: int, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_member = await crud.delete_team_member(db, member_id=member_id)
    if db_member is None:
        raise HTTPException(status_code=404, detail="Team member not found")
    return db_member

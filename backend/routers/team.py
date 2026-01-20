from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas
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
async def create_team_member(member: schemas.TeamMemberCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_team_member(db=db, member=member)

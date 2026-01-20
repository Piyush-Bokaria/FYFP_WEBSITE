from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas
from database import get_db

router = APIRouter(
    prefix="/gallery",
    tags=["gallery"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.GalleryItem])
async def read_gallery_items(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    items = await crud.get_gallery_items(db, skip=skip, limit=limit)
    return items

@router.post("/", response_model=schemas.GalleryItem)
async def create_gallery_item(item: schemas.GalleryItemCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_gallery_item(db=db, item=item)

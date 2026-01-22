from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud, schemas, dependencies
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
async def create_gallery_item(item: schemas.GalleryItemCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    return await crud.create_gallery_item(db=db, item=item)

@router.put("/{item_id}", response_model=schemas.GalleryItem)
async def update_gallery_item(item_id: int, item: schemas.GalleryItemCreate, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_item = await crud.update_gallery_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return db_item

@router.delete("/{item_id}", response_model=schemas.GalleryItem)
async def delete_gallery_item(item_id: int, db: AsyncSession = Depends(get_db), current_user: schemas.AdminUser = Depends(dependencies.get_current_user)):
    db_item = await crud.delete_gallery_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return db_item

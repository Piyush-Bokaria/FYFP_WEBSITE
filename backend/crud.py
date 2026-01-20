from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import models, schemas

# Events
async def get_events(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.Event).offset(skip).limit(limit))
    return result.scalars().all()

async def create_event(db: AsyncSession, event: schemas.EventCreate):
    db_event = models.Event(**event.model_dump())
    db.add(db_event)
    await db.commit()
    await db.refresh(db_event)
    return db_event

# Calendar
async def get_calendar_activities(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.CalendarActivity).offset(skip).limit(limit))
    return result.scalars().all()

async def create_calendar_activity(db: AsyncSession, activity: schemas.CalendarActivityCreate):
    db_activity = models.CalendarActivity(**activity.model_dump())
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    return db_activity

# Gallery
async def get_gallery_items(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.GalleryItem).offset(skip).limit(limit))
    return result.scalars().all()

async def create_gallery_item(db: AsyncSession, item: schemas.GalleryItemCreate):
    db_item = models.GalleryItem(**item.model_dump())
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

# Team
async def get_team_members(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.TeamMember).offset(skip).limit(limit))
    return result.scalars().all()

async def create_team_member(db: AsyncSession, member: schemas.TeamMemberCreate):
    db_member = models.TeamMember(**member.model_dump())
    db.add(db_member)
    await db.commit()
    await db.refresh(db_member)
    return db_member

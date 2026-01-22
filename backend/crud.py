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

async def get_event(db: AsyncSession, event_id: int):
    result = await db.execute(select(models.Event).where(models.Event.id == event_id))
    return result.scalars().first()

async def update_event(db: AsyncSession, event_id: int, event: schemas.EventCreate):
    db_event = await get_event(db, event_id)
    if db_event:
        for key, value in event.model_dump().items():
            setattr(db_event, key, value)
        await db.commit()
        await db.refresh(db_event)
    return db_event

async def delete_event(db: AsyncSession, event_id: int):
    db_event = await get_event(db, event_id)
    if db_event:
        await db.delete(db_event)
        await db.commit()
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

async def get_calendar_activity(db: AsyncSession, activity_id: int):
    result = await db.execute(select(models.CalendarActivity).where(models.CalendarActivity.id == activity_id))
    return result.scalars().first()

async def update_calendar_activity(db: AsyncSession, activity_id: int, activity: schemas.CalendarActivityCreate):
    db_activity = await get_calendar_activity(db, activity_id)
    if db_activity:
        for key, value in activity.model_dump().items():
            setattr(db_activity, key, value)
        await db.commit()
        await db.refresh(db_activity)
    return db_activity

async def delete_calendar_activity(db: AsyncSession, activity_id: int):
    db_activity = await get_calendar_activity(db, activity_id)
    if db_activity:
        await db.delete(db_activity)
        await db.commit()
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

async def get_gallery_item(db: AsyncSession, item_id: int):
    result = await db.execute(select(models.GalleryItem).where(models.GalleryItem.id == item_id))
    return result.scalars().first()

async def update_gallery_item(db: AsyncSession, item_id: int, item: schemas.GalleryItemCreate):
    db_item = await get_gallery_item(db, item_id)
    if db_item:
        for key, value in item.model_dump().items():
            setattr(db_item, key, value)
        await db.commit()
        await db.refresh(db_item)
    return db_item

async def delete_gallery_item(db: AsyncSession, item_id: int):
    db_item = await get_gallery_item(db, item_id)
    if db_item:
        await db.delete(db_item)
        await db.commit()
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

async def get_team_member(db: AsyncSession, member_id: int):
    result = await db.execute(select(models.TeamMember).where(models.TeamMember.id == member_id))
    return result.scalars().first()

async def update_team_member(db: AsyncSession, member_id: int, member: schemas.TeamMemberCreate):
    db_member = await get_team_member(db, member_id)
    if db_member:
        for key, value in member.model_dump().items():
            setattr(db_member, key, value)
        await db.commit()
        await db.refresh(db_member)
    return db_member

async def delete_team_member(db: AsyncSession, member_id: int):
    db_member = await get_team_member(db, member_id)
    if db_member:
        await db.delete(db_member)
        await db.commit()
    return db_member

# Admin User
# Admin User
import security

async def get_admin_user_by_username(db: AsyncSession, username: str):
    result = await db.execute(select(models.AdminUser).where(models.AdminUser.username == username))
    return result.scalars().first()

async def create_admin_user(db: AsyncSession, user: schemas.AdminUserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.AdminUser(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def authenticate_user(db: AsyncSession, username: str, password: str):
    user = await get_admin_user_by_username(db, username)
    if not user:
        return False
    if not security.verify_password(password, user.hashed_password):
        return False
    return user

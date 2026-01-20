from pydantic import BaseModel
from typing import Optional, List

# Event Schemas
class EventBase(BaseModel):
    title: str
    date: str
    description: str
    is_upcoming: bool = True

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    class Config:
        from_attributes = True

# Calendar Schemas
class CalendarActivityBase(BaseModel):
    month: str
    title: str
    description: str
    type: str
    color: str

class CalendarActivityCreate(CalendarActivityBase):
    pass

class CalendarActivity(CalendarActivityBase):
    id: int
    class Config:
        from_attributes = True

# Gallery Schemas
class GalleryItemBase(BaseModel):
    title: str
    date: str
    link: str
    image_url: Optional[str] = None

class GalleryItemCreate(GalleryItemBase):
    pass

class GalleryItem(GalleryItemBase):
    id: int
    class Config:
        from_attributes = True

# Team Schemas
class TeamMemberBase(BaseModel):
    name: str
    role: str
    image_url: Optional[str] = None
    category: str = "core"

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMember(TeamMemberBase):
    id: int
    class Config:
        from_attributes = True

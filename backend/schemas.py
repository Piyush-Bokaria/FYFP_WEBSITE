from pydantic import BaseModel
from typing import Optional, List

# Event Schemas
class EventBase(BaseModel):
    title: str
    date: str
    description: str
    is_upcoming: bool = True

class EventCreate(EventBase):
    title: str
    date: str
    description: str
    is_upcoming: bool = True

class Event(EventBase):
    id: int
    class Config:
        from_attributes = True

# Calendar Schemas
class CalendarActivityBase(BaseModel):
    month: str
    title: str
    description: str

class CalendarActivityCreate(CalendarActivityBase):
    month: str
    title: str
    description: str

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
    title: str
    date: str
    link: str
    image_url: Optional[str] = None

class GalleryItem(GalleryItemBase):
    id: int
    class Config:
        from_attributes = True

# Team Schemas
class TeamMemberBase(BaseModel):
    name: str
    role: str
    image_url: Optional[str] = None
    profile_link: Optional[str] = None
    category: str = "core"

class TeamMemberCreate(TeamMemberBase):
    name: str
    role: str
    image_url: Optional[str] = None
    profile_link: Optional[str] = None
    category: str = "core"

class TeamMember(TeamMemberBase):
    id: int
    class Config:
        from_attributes = True

# Admin User Schemas
class AdminUserBase(BaseModel):
    username: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: int
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

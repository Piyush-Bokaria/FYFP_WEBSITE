from sqlalchemy import Column, Integer, String, Boolean, Text, Date
from database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(String)  # Keeping as string to match frontend loose format for now, or could parse to Date
    description = Column(Text)
    is_upcoming = Column(Boolean, default=True)

class CalendarActivity(Base):
    __tablename__ = "calendar_activities"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String)
    title = Column(String)
    description = Column(Text)

class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    date = Column(String)
    link = Column(String)
    image_url = Column(String, nullable=True) # Future proofing

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    image_url = Column(String, nullable=True)
    profile_link = Column(String, nullable=True)
    category = Column(String) # 'core' or 'multimedia' etc, to distinguish grid placement

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

import asyncio
from database import AsyncSessionLocal, engine, Base
import models
from sqlalchemy import select
import security
from dotenv import load_dotenv

load_dotenv()

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        
        events_data = [
            models.Event(title="15 year's anniversary", date="January 24, 2026", description="Join us for 15th year's anniversary celebration of foundation of the club.", is_upcoming=True),
            models.Event(title="National Science Day", date="February 28, 2026", description="A event focused on creating awareness and collaborating with the schools to promote innovation among the students.", is_upcoming=True),
            models.Event(title="Project Swayamika", date="January 3, 2026", description="A event focused on creating awareness among the female students about menstrual health, hygiene, Good & Bad Touch", is_upcoming=False),
            models.Event(title="Project Vikas - Digital Bootcamp", date="December 27, 2025", description="A gathering of school students from Sarika Government School for a hands-on computer learning session.", is_upcoming=False),
            models.Event(title="Project Kitab", date="October 24, 2025", description="Distribution of books and neccessities to school students.", is_upcoming=False),
        ]
        db.add_all(events_data)

        calendar_data = [
            models.CalendarActivity(month='JULY 2025', title='Project Nidhesh', description='Consectetur adipiscing elit sed do eiusmod'),
            models.CalendarActivity(month='AUG 2025', title='Independence day Celebrations', description='Ut labore et dolore magna aliqua'),
            models.CalendarActivity(month='OCT 2025', title='Project Kitab', description='Veniam quis nostrud exercitation ullamco'),
            models.CalendarActivity(month='DEC 2025', title='Project Vakankur', description='Aliquip ex ea commodo consequat duis'),
            models.CalendarActivity(month='DEC 2025', title='Digital Bootcamp', description='In reprehenderit in voluptate velit esse'),
            models.CalendarActivity(month='JAN 2026', title='Project Swayamika', description='Fugiat nulla pariatur excepteur sint'),
            models.CalendarActivity(month='JAN 2026', title='Camps for Training on CPR', description='Fugiat nulla pariatur excepteur sint'),
            models.CalendarActivity(month='JAN 2026', title='Cloth Donation camp', description='Ut labore et dolore magna aliqua'),
            models.CalendarActivity(month='JAN 2026', title='15th anniversary celebrations', description='Veniam quis nostrud exercitation ullamco'),
            models.CalendarActivity(month='JAN 2026', title='Republic Day Celebrations', description='Aliquip ex ea commodo consequat duis'),
            models.CalendarActivity(month='FEB 2026', title='Project Vikas', description='In reprehenderit in voluptate velit esse'),
            models.CalendarActivity(month='FEB 2026', title='National Science Day Celebrations', description='Fugiat nulla pariatur excepteur sint'),
            models.CalendarActivity(month='MAR 2026', title='Annual Day Stall', description='Fugiat nulla pariatur excepteur sint'),
            models.CalendarActivity(month='MAR 2026', title='Next Academic year team elections', description='Ut labore et dolore magna aliqua'),
        ]
        db.add_all(calendar_data)

        # Gallery
        gallery_data = [
            models.GalleryItem(title='Project Nidesh', date='JULY 2025', link="https://drive.google.com/drive/folders/1VLT9pCch-V3Qhv-59XVatTb9FOLrPy1q"),
            models.GalleryItem(title='Independence day Celebrations', date='AUG 2025', link="https://drive.google.com/drive/folders/1VgHbBqYt5mXq1YEy3tG6kbbtkRZntQBK"),
            models.GalleryItem(title='Project Kitab', date='OCT 2025', link="https://drive.google.com/drive/folders/1vlaG183pgFQPrJMXBIq1V6XJkJZ75Ylb"),
            models.GalleryItem(title='Project Vakankur', date='DEC 2025', link="https://drive.google.com/drive/folders/1a_t6np3tABJ5hMFc91R9nhtZDTNyME1u"),
            models.GalleryItem(title='Digital Bootcamp', date='DEC 2025', link="https://drive.google.com/drive/folders/1quebjhzKVUBD04SoEzxjtiMPUeiP3hSC"),
            models.GalleryItem(title='Project Swayamika', date='JAN 2025', link="https://drive.google.com/drive/folders/1BEbZ_paQuN50SdBBJX1WY_b9_fcLABGC"),
            models.GalleryItem(title='Camps for Training on CPR', date='JAN 2025', link="#"),
            models.GalleryItem(title='Cloth Donation camp', date='JAN 2025', link="#"),
        ]
        db.add_all(gallery_data)

        # Team
        team_data = [
            models.TeamMember(name='Dr. K Satyanarayana Raju', role='FYFP Convenor', category='convenor', image_url='./assets/ksraju.jpg', profile_link='https://mvgrce.edu.in/faculty-of-mvgr/?dept=ECE&fid=59'),
            models.TeamMember(name='L. Prasanth', role='President', category='core'),
            models.TeamMember(name='K V Navadeep Kumar', role='Secretary', category='core'),
            models.TeamMember(name='K.Bharat', role='Treasurer', category='core'),
            models.TeamMember(name='S.Vennela', role='Multimedia Design Head', category='extended'),
            models.TeamMember(name='K.Hima Bindu', role='PR & Outreach', category='extended'),
        ]
        db.add_all(team_data)

        admin_password = os.getenv("ADMIN_PASSWORD")
        hashed_password = security.get_password_hash(admin_password)
        admin_user = models.AdminUser(username=os.getenv("ADMIN_USERNAME"), hashed_password=hashed_password)
        db.add(admin_user)

        await db.commit()
        print("Data seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())

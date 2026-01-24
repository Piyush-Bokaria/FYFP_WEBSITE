import asyncio
from database import AsyncSessionLocal, engine, Base
import models
from sqlalchemy import select
import security
from dotenv import load_dotenv
import os

load_dotenv()

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        
        events_data = [
            models.Event(title="Project Nidhesh", date="July 2025", description="Career guidance sessions for school students on competitive exams and future opportunities.", is_upcoming=False),
            models.Event(title="Independence Day Celebrations", date="August 15, 2025", description="Conducting games and competitions for school students, along with distributing mementos and certificates to the winners.", is_upcoming=False),
            models.Event(title="Project Kitab", date="October 2025", description="Annual event providing textbooks, notebooks, stationery, and other educational essentials to school children.", is_upcoming=False),
            models.Event(title="Project Vakankur", date="December 20, 2025", description="Building a greener tomorrow by engaging school students in tree plantation and environmental conservation activities.", is_upcoming=False),
            models.Event(title="Project Vikas - Digital Bootcamp", date="December 27, 2025", description="A hands-on computer learning session for school students from Sarika Government School.", is_upcoming=False),
            models.Event(title="Project Swayamika", date="January 3, 2026", description="Empowerment sessions for female students covering menstrual health, personal safety (Good Touch-Bad Touch), and related topics.", is_upcoming=False),
            models.Event(title="15 Year's Anniversary", date="January 24, 2026", description="Celebrating the 15th anniversary of FYFP and its journey of social impact.", is_upcoming=False),
            models.Event(title="Republic Day Celebrations", date="January 26, 2026", description="Presenting certificates of appreciation to final year students who volunteered with FYFP for their valuable support towards the club and its initiatives.", is_upcoming=True),
            models.Event(title="Project Vikas", date="February 2026", description="Academic support for school students and awareness programs on various educational topics.", is_upcoming=True),
            models.Event(title="National Science Day", date="February 28, 2026", description="An event focused on creating awareness and collaborating with schools to promote innovation among students, along with helping and displaying projects at schools.", is_upcoming=True),
            models.Event(title="Annual Day Stall", date="March 2026", description="Showcasing the achievements of the club at the annual day celebration.", is_upcoming=True),
            models.Event(title="Next Academic Year Team Elections", date="March 2026", description="Elections conducted to select the team for the next academic year.", is_upcoming=True),
        ]
        db.add_all(events_data)

        calendar_data = [
            models.CalendarActivity(month='JULY 2025', title='Project Nidhesh', description='Career guidance sessions for school students on competitive exams and future opportunities.'),
            models.CalendarActivity(month='AUG 2025', title='Independence day Celebrations', description='Conducting games and competitions for school students, along with distributing momentos, certificates to the winners.'),
            models.CalendarActivity(month='OCT 2025', title='Project Kitab', description='Annual event providing textbooks, notebooks, stationery, and other educational essentials to school children.'),
            models.CalendarActivity(month='DEC 2025', title='Project Vakankur', description='Building a greener tomorrow by engaging school students in tree plantation and environmental conservation activities.'),
            models.CalendarActivity(month='DEC 2025', title='Digital Bootcamp', description='A hands-on computer learning session for school students.'),
            models.CalendarActivity(month='JAN 2026', title='Project Swayamika', description='Empowerment sessions for female students covering menstrual health, personal safety (Good Touch-Bad Touch), and related topics.'),
            models.CalendarActivity(month='JAN 2026', title='15th anniversary celebrations', description='Selebrating the 15th anniversary of the FYFP.'),
            models.CalendarActivity(month='JAN 2026', title='Camps for Training on CPR', description='Training students in CPR and first aid to prepare them for future emergencies.'),
            models.CalendarActivity(month='JAN 2026', title='Republic Day Celebrations', description='Presenting certificates of appreciation to final year students who volunteered with FYFP for their valuable support towards the club and its initiatives.'),
            models.CalendarActivity(month='FEB 2026', title='Project Vikas', description='Academic support for school students and awareness programs on various educational topics.'),
            models.CalendarActivity(month='FEB 2026', title='National Science Day Celebrations', description='A event focused on creating awareness and collaborating with the schools to promote innovation among the students, along helping and displaying projects at schools.'),
            models.CalendarActivity(month='MAR 2026', title='Annual Day Stall', description='Showcasing the achievements of the club at the annual day.'),
            models.CalendarActivity(month='MAR 2026', title='Next Academic year team elections', description='Elections conducted to select the team for the next academic year.'),
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
            models.TeamMember(name='L. Prasanth', role='President', category='core', image_url='./assets/President.jpeg'),
            models.TeamMember(name='K V Navadeep Kumar', role='Secretary', category='core', image_url="./assets/Secretary.jpeg"),
            models.TeamMember(name='K.Bharat', role='Treasurer', category='core', image_url="./assets/Treasurer.jpeg"),
            models.TeamMember(name='S.Vennela', role='Multimedia Design Head', category='extended', image_url="./assets/Design-Head.jpeg"),
            models.TeamMember(name='K.Hima Bindu', role='PR & Outreach', category='extended', image_url="./assets/PR-Head.jpeg"),
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

import React from 'react';

function FeaturedEvents() {
  const events = [
    {
      id: 1,
      title: 'Weekend Hiking Adventure',
      category: 'Sports',
      icon: '🥾',
      date: 'Saturday, 9:00 AM',
      location: 'Mountain Trail Park',
      attendees: 12,
      maxAttendees: 15
    },
    {
      id: 2,
      title: 'Morning Yoga in the Park',
      category: 'Fitness',
      icon: '🧘',
      date: 'Sunday, 7:00 AM',
      location: 'Central Park',
      attendees: 8,
      maxAttendees: 20
    },
    {
      id: 3,
      title: 'Coffee & Conversations',
      category: 'Social',
      icon: '☕',
      date: 'Friday, 5:00 PM',
      location: 'Downtown Cafe',
      attendees: 6,
      maxAttendees: 10
    },
    {
      id: 4,
      title: 'Basketball Pickup Game',
      category: 'Sports',
      icon: '🏀',
      date: 'Wednesday, 6:00 PM',
      location: 'Community Center',
      attendees: 10,
      maxAttendees: 12
    },
    {
      id: 5,
      title: 'Running Club Meetup',
      category: 'Fitness',
      icon: '🏃',
      date: 'Tuesday, 6:30 AM',
      location: 'Riverside Trail',
      attendees: 15,
      maxAttendees: 25
    },
    {
      id: 6,
      title: 'Book Club Discussion',
      category: 'Gathering',
      icon: '📚',
      date: 'Thursday, 7:00 PM',
      location: 'Local Library',
      attendees: 7,
      maxAttendees: 12
    }
  ];

  return (
    <section className="featured-events" id="events">
      <div className="container">
        <h2 className="section-title">Happening This Week</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.icon}</div>
              <div className="event-content">
                <span className="event-badge">{event.category}</span>
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <div>📅 {event.date}</div>
                  <div>📍 {event.location}</div>
                </div>
                <div className="event-attendees">
                  👥 {event.attendees}/{event.maxAttendees} going
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;

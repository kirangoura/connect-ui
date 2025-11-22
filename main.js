// Sample events data
const sampleEvents = [
    {
        id: 1,
        title: "Weekend Hiking Adventure",
        category: "Sports",
        icon: "🥾",
        date: "Saturday, 9:00 AM",
        location: "Mountain Trail Park",
        attendees: 12,
        maxAttendees: 15
    },
    {
        id: 2,
        title: "Morning Yoga in the Park",
        category: "Fitness",
        icon: "🧘",
        date: "Sunday, 7:00 AM",
        location: "Central Park",
        attendees: 8,
        maxAttendees: 20
    },
    {
        id: 3,
        title: "Coffee & Conversations",
        category: "Social",
        icon: "☕",
        date: "Friday, 5:00 PM",
        location: "Downtown Cafe",
        attendees: 6,
        maxAttendees: 10
    },
    {
        id: 4,
        title: "Basketball Pickup Game",
        category: "Sports",
        icon: "🏀",
        date: "Wednesday, 6:00 PM",
        location: "Community Center",
        attendees: 10,
        maxAttendees: 12
    },
    {
        id: 5,
        title: "Running Club Meetup",
        category: "Fitness",
        icon: "🏃",
        date: "Tuesday, 6:30 AM",
        location: "Riverside Trail",
        attendees: 15,
        maxAttendees: 25
    },
    {
        id: 6,
        title: "Book Club Discussion",
        category: "Gathering",
        icon: "📚",
        date: "Thursday, 7:00 PM",
        location: "Local Library",
        attendees: 7,
        maxAttendees: 12
    }
];

// Function to create event card HTML
function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-image">${event.icon}</div>
            <div class="event-content">
                <span class="event-badge">${event.category}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <div>📅 ${event.date}</div>
                    <div>📍 ${event.location}</div>
                </div>
                <div class="event-attendees">
                    👥 ${event.attendees}/${event.maxAttendees} going
                </div>
            </div>
        </div>
    `;
}

// Populate events grid
function loadEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        eventsGrid.innerHTML = sampleEvents.map(event => createEventCard(event)).join('');
    }
}

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click handlers for category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryName = card.querySelector('h3').textContent;
            console.log(`Clicked category: ${categoryName}`);
            // In a real app, this would filter events by category
        });
    });
    
    // Add click handlers for event cards
    document.addEventListener('click', (e) => {
        const eventCard = e.target.closest('.event-card');
        if (eventCard) {
            console.log('Event card clicked');
            // In a real app, this would show event details
        }
    });
});

console.log('Connect app loaded successfully!');

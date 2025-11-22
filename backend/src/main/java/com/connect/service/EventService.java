package com.connect.service;

import com.connect.model.Event;
import com.connect.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
    
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setTitle(eventDetails.getTitle());
        event.setCategory(eventDetails.getCategory());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setAttendees(eventDetails.getAttendees());
        return eventRepository.save(event);
    }
    
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    
    public Event joinEvent(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        if (event.getAttendees() < event.getMaxAttendees()) {
            event.setAttendees(event.getAttendees() + 1);
            return eventRepository.save(event);
        }
        throw new RuntimeException("Event is full");
    }
    
    public List<Event> filterEvents(String city, String zipcode, String area) {
        if (city != null && zipcode != null && area != null) {
            return eventRepository.findByCityAndZipcodeAndArea(city, zipcode, area);
        } else if (city != null && zipcode != null) {
            return eventRepository.findByCityAndZipcode(city, zipcode);
        } else if (city != null && area != null) {
            return eventRepository.findByCityAndArea(city, area);
        } else if (zipcode != null && area != null) {
            return eventRepository.findByZipcodeAndArea(zipcode, area);
        } else if (city != null) {
            return eventRepository.findByCity(city);
        } else if (zipcode != null) {
            return eventRepository.findByZipcode(zipcode);
        } else if (area != null) {
            return eventRepository.findByArea(area);
        } else {
            return eventRepository.findAll();
        }
    }
}

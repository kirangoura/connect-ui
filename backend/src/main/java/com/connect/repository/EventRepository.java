package com.connect.repository;

import com.connect.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCity(String city);
    List<Event> findByZipcode(String zipcode);
    List<Event> findByArea(String area);
    List<Event> findByCityAndZipcode(String city, String zipcode);
    List<Event> findByCityAndArea(String city, String area);
    List<Event> findByZipcodeAndArea(String zipcode, String area);
    List<Event> findByCityAndZipcodeAndArea(String city, String zipcode, String area);
}

DELIMITER //
CREATE TRIGGER valid_insert_on_events
  BEFORE INSERT ON events FOR EACH ROW
    BEGIN
      IF EXISTS(SELECT * FROM events e WHERE new.id <> e.id AND e.end_time >= (new.start_time - INTERVAL 2 HOUR) AND (new.end_time + INTERVAL 1 HOUR) >= e.start_time LIMIT 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Trying to insert event with overlapping time period!';
      END IF;
    END
  //
DELIMITER ;

CREATE TRIGGER match_attendance_to_events_on_insert_on_events
  AFTER INSERT ON events FOR EACH ROW
    UPDATE attendance
    SET attendance.event_id = new.id
    WHERE attendance.event_id IS NULL AND attendance.time between (new.start_time - INTERVAL 1 HOUR) AND (new.end_time + INTERVAL 1 HOUR);
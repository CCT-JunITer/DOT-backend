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
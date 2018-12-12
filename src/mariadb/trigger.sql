CREATE TRIGGER valid_insert_on_events
  BEFORE INSERT ON events FOR EACH ROW
    BEGIN
      IF EXISTS(SELECT * FROM events e WHERE new.id <> e.id AND e.end_time >= new.start_time AND new.end_time >= e.start_time LIMIT 1) THEN
        SIGNAL SQLSTATE '45000' MESSAGE_TEXT='Trying to insert event with overlapping time period!';
      END IF;
    END;
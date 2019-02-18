INSERT INTO events (title, start_time, end_time, type)
VALUES (:title, :start_time, :end_time, :type);
INSERT INTO eventsDevices (event_id, device_id)
VALUES ((SELECT MAX(events.id) FROM events), :mac_address);
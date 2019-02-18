START TRANSACTION;
INSERT INTO attendance (rfid_id, device_id, time, event_id)
VALUES (:rfid_id, :device_id, :time, (SELECT id
                  FROM events
                  WHERE :time between (events.start_time - INTERVAL 1 HOUR) AND (events.end_time + INTERVAL 1 HOUR) LIMIT 1))
SELECT e.*,
       e.id,
       e.title,
       DATE_FORMAT(e.start_time, '%d/%m/%Y %H:%i') as start_time,
       DATE_FORMAT(e.end_time, '%d/%m/%Y %H:%i') as end_time,
       CONCAT(first_name,' ', last_name) as participant,
       e.type
FROM events e
JOIN attendance a on e.id = a.event_id and a.time between (e.start_time - INTERVAL 1 HOUR) AND (e.end_time + INTERVAL 1 HOUR) and a.id = (SELECT LAST_INSERT_ID() from attendance)
JOIN rfid r on a.rfid_id = r.id
JOIN people  p on r.people_id = p.id
;

COMMIT;
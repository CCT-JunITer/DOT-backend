SELECT
  e.*,
  e.id,
  e.title,
  DATE_FORMAT(e.start_time, '%d/%m/%Y %H:%i') as start_time,
  DATE_FORMAT(e.end_time, '%d/%m/%Y %H:%i') as end_time,
  CONCAT(first_name,' ', last_name) as participant,
  e.type
FROM events e
JOIN eventsDevices D on e.id = D.event_id
JOIN attendance a on e.id = a.event_id and D.mac_address = a.device_id and a.time between (e.start_time - INTERVAL 1 HOUR) AND (e.end_time + INTERVAL 1 HOUR)
JOIN rfid r on a.rfid_id = r.id
JOIN people FOR SYSTEM_TIME AS OF TIMESTAMP e.start_time p on r.people_id = p.id
WHERE e.
;

SELECT e.*, GROUP_CONCAT(first_name,' ', last_name)
FROM events e
JOIN attendance a on e.id = a.event_id and a.time
JOIN rfid r on a.rfid_id = r.id
JOIN people FOR SYSTEM_TIME AS OF TIMESTAMP e.start_time p on r.people_id = p.id
GROUP BY e.id;
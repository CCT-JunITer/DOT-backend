INSERT INTO events (title, type, start_time, end_time)
VALUES
	('Testevent', 'DoSi', '2017-02-02 11:00:00', '2017-02-02 15:00:00'),
	('PR Schulung', 'Schulung', '2016-12-15 10:40:00', '2016-12-15 14:50:00'),
	('DoSi am 19.12', 'DoSi', '2018-12-19 18:30:00', '2018-12-19 22:30:00');

INSERT INTO devices (name, mac_address)
VALUES 
	('Ultimator','AF:CC:90:AA:32:43'),
	('Hemmingway', '62:C6:3F:00:27:FD');

INSERT INTO rfid (id, people_id)
VALUES 
	(1, 1),
  (2, 2);

INSERT INTO attendance (rfid_id, event_id, device_id, time)
VALUES
	(1, 1, 'AF:CC:90:AA:32:43', '2016-12-12 18:40:00'),
	(2, 1, 'AF:CC:90:AA:32:43', '2016-12-12 18:20:15'),
	(2, 3, '62:C6:3F:00:27:FD', '2016-12-19 17:20:15'),
	(1, 3, '62:C6:3F:00:27:FD', '2016-12-19 17:20:15');
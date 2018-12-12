INSERT INTO attendance (rfid_id, device_id, time, )
VALUES (:rfid_id, :device_id, :time, (SELECT id
                                      FROM events
                                      WHERE :time between (events.start_time - INTERVAL 1 HOUR) AND (events.end_time + INTERVAL 1 HOUR))
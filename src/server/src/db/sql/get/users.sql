SELECT people.id,
       people.first_name,
       people.last_name,
       r.id
FROM people
JOIN rfid r on people.id = r.people_id;
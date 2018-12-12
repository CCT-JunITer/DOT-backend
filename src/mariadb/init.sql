CREATE TABLE people (
   id INT PRIMARY KEY AUTO_INCREMENT,
   first_name VARCHAR(100) NOT NULL,
   last_name VARCHAR(100) NOT NULL,
   department VARCHAR(100),
   sex CHAR(1),
   email VARCHAR(100),
   university VARCHAR(100),
   status VARCHAR(10) NOT NULL
) WITH SYSTEM VERSIONING;

CREATE TABLE peopleTemp (
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   department VARCHAR(100),
   sex CHAR(1),
   email VARCHAR(100),
   university VARCHAR(100),
   exact_status VARCHAR(100),
   status VARCHAR(10)
);

LOAD DATA LOCAL INFILE "data/people.csv"
INTO TABLE peopleTemp
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ','
ENCLOSED BY '\"'
LINES TERMINATED BY '\n';

INSERT INTO people (first_name, last_name, department, sex, email, university, status)
SELECT first_name, last_name, department, sex, email, university, status
FROM peopleTemp;

DROP TABLE peopleTemp;

CREATE TABLE events (
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   start_time DATETIME NOT NULL,
   end_time DATETIME NOT NULL,
   type VARCHAR(100),
   CHECK (end_time > start_time)
);

CREATE TABLE devices (
   mac_address VARCHAR(17) PRIMARY KEY
);

CREATE TABLE rfid (
   id INT PRIMARY KEY,
   people_id INT NOT NULL,
   FOREIGN KEY (people_id) REFERENCES people(id)
);

CREATE TABLE attendance (
   rfid_id INT NOT NULL,
   event_id INT NOT NULL REFERENCES events(id),
   device_id VARCHAR(17) NOT NULL,
   time DATETIME NOT NULL,
   FOREIGN KEY (rfid_id) REFERENCES rfid(id),
   FOREIGN KEY (event_id) REFERENCES events(id),
   FOREIGN KEY (device_id) REFERENCES devices(mac_address)
);
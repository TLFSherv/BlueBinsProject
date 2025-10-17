--CREATE DATABASE BlueBins;
-- use \i filename to execute queries in file
 
CREATE TABLE locations(
    id VARCHAR(40) PRIMARY KEY,
    formattedAddress VARCHAR(40) NOT NULL,
    parish VARCHAR(30) NOT NULL,
    route VARCHAR(40) NOT NULL,
    streetNumber CHAR(2) NOT NULL,
    latitude VARCHAR(20), --should round lat and long
    longitude VARCHAR(20),
    distanceMeters INT);
    
CREATE TABLE bookings(
    id SERIAL PRIMARY KEY,  
    locationId VARCHAR(125) REFERENCES locations(id),
    details VARCHAR(500),
    collectionDate TIMESTAMP NOT NULL,
    quantity SMALLINT NOT NULL,
    dateModified TIMESTAMP,
    dateCreated TIMESTAMP NOT NULL);

CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    bookingId INT REFERENCES bookings(id),
    email VARCHAR(64) NOT NULL,
    message VARCHAR(500) NOT NULL,
    dateCreated TIMESTAMP NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(64) NOT NULL, 
    bookingId INT NOT NULL,
    PRIMARY KEY(bookingId)
);

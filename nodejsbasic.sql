CREATE DATABASE nodejsbasic;

USE nodejsbasic;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255)CHARACTER SET UTF8MB4 NOT NULL,
    `firstName` VARCHAR(255)CHARACTER SET UTF8MB4 NOT NULL,
    `lastName` VARCHAR(255)CHARACTER SET UTF8MB4 NOT NULL,
    CONSTRAINT PK_Person PRIMARY KEY (id)
);    

INSERT INTO `user` (email,address,firstName,lastName)
VALUES ('Vinh@gmail.com','Ha Noi','Phung Ngoc Vinh','PNV'),
('Dieu@gmail.com','Bac Ninh','Ngo Thi Huyen Dieu','Ngo');

select * from user;
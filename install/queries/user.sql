DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE account
(
    id          serial       NOT NULL   PRIMARY KEY,
    name        varchar(64)  NOT NULL,
    email       varchar(64)  NOT NULL   UNIQUE,
    username    varchar(64)  NOT NULL   UNIQUE,
    password    char(60)     NOT NULL,
    uuid        uuid         NOT NULL,

    registered  timestamp with time zone DEFAULT (now() at time zone 'utc')
);

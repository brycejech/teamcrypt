DROP TABLE IF EXISTS keyfile CASCADE;

CREATE TABLE keyfile
(
    id           serial   NOT NULL PRIMARY KEY,
    account      int      NOT NULL REFERENCES account(id),
    keyfile      text,
    salt         char(64) NOT NULL,

    created  timestamp with time zone DEFAULT (now() at time zone 'utc'),
    modified timestamp with time zone
);

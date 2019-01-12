
INSERT INTO account
( name, email, username, password, uuid, salt )

VALUES
( $1, $2, $3, $4, $5, $6 )

RETURNING *
;

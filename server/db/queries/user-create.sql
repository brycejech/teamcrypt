
INSERT INTO account
( name, email, username, password, uuid )

VALUES
( $1, $2, $3, $4, $5 )

RETURNING *
;

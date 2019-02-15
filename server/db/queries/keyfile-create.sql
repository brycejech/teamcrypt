
INSERT INTO keyfile
( account, keyfile, salt, modified )

VALUES
( $1, $2, $3, now() at time zone 'utc' )

RETURNING *
;

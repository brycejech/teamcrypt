
INSERT INTO keyfile
( account, keyfile, modified )

VALUES
( $1, $2, now() at time zone 'utc' )

RETURNING *
;


UPDATE keyfile

SET
    keyfile  = $2,
    salt     = $3,
    modified = now() at time zone 'utc'

WHERE
    account = $1

RETURNING *;

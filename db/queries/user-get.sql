
SELECT
      account.id
    , account.name
    , account.email
    , account.username
    , account.password
    , account.uuid
    , account.registered
    , account.salt

    , keyfile.keyfile
    , keyfile.id          AS "keyfileID"
    , keyfile.modified    AS "keyfileLastModified"

FROM account

LEFT OUTER JOIN keyfile on keyfile.account = account.id

WHERE
       account.username = $1
    OR account.email    = $1
;

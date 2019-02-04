SELECT
      account.id
    , account.name
    , account.email
    , account.username
    , account.password
    , account.uuid
    , account.registered

    , keyfile.keyfile
    , keyfile.id          AS "keyfileID"
    , keyfile.modified    AS "keyfileLastModified"

FROM account

LEFT OUTER JOIN keyfile on keyfile.account = account.id;

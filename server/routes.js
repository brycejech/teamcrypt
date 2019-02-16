'use strict';

const router = require('express').Router();

const app = require('./app')
const { User } = require('./models');

router.get('/user', async (req, res, next) => {

    if(!req.session.user){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { username } = req.session.user;

    try{
        const user = await User.get({ username });

        return res.json(user.getPublicObject());
    }
    catch(e){
        console.log(e);
        return res.json({ e: e.message });
    }
});

router.post('/user/keyfile', async (req, res, next) => {

    if(!req.session.user){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.session.user, { data, salt } = req.body;

    try{
        const newKeyfile = await User.updateKeyfile(id, data, salt);

        return res.json(newKeyfile);
    }
    catch(e){
        return res.status(500).json({ e: e.message });
    }
});

router.get('/users', async (req, res, next) => {

    console.log(req.session.user);

    try{
        const users = (await User.getAll()).map(u => u.getPublicObject());

        return res.json([...users]);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ e: e.message })
    }
});

router.post('/login', async (req, res, next) => {
    const username = req.body.username || req.body.email,
          password = req.body.password;

    const user   = await User.get({ username }),
          authed = await app.crypto.verifyPassword(password, user.password);

    if(authed === true){

        req.session.user = user;

        res.json(user.getPublicObject());
    }
    else{
        res.json({ message: 'Incorrect username/password' });
    }
});

router.post('/register', async (req, res, next) => {

    const {
        name, email, username, password, confirm, salt
    } = req.body;

    if(!(
           name
        && email
        && username
        && password
        && confirm
        && salt
    )){
        return res.status(400).json({
            message: 'Missing required parameters'
        });
    }

    if(password !== confirm){
        return res.status(400).json({
            message: 'Passwords do not match'
        });
    }

    try{
        const user = await app.registerUser(name, email, username, password, salt);

        return res.json(user);
    }
    catch(e){
        if(e.message === 'duplicate-key'){

            res.status(400);

            switch(e.field){
                case 'email':
                    return res.send({ message: 'email-exists' });
                case 'username':
                    return res.send({ message: 'username-exists' });
                default:
                    return res.send({ message: `${ field }-exists` });
            }
        }
        return res.status(500).send({ message: 'Server error' });
    }

});

router.use((req, res, next) => {
    return res.redirect('/');
});

module.exports = router;

'use strict';

import { Keyfile } from './controllers';
import { genSalt } from './lib/crypto';


const kf = window.kf = new Keyfile();

kf.add({ title: 'my key', username: 'bryce@brycejech.com', password: 'somePass' });

(async () => {
    const salt = genSalt();

    await kf.setKey('someDecryptionPass', salt);

    await kf.encrypt();

    console.log(kf.keyfile);

    await kf.decrypt();

    kf.decrypt().then(t => console.log(t));

    // console.log(kf.keyfile);
})();

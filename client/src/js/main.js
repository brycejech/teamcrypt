'use strict';

import { Keyfile } from './controllers';
import * as crypto from './lib/crypto';

window.crypt = crypto;
window.Keyfile = Keyfile;

'use strict';

import { Keyfile } from './controllers';
import * as crypto from './lib/crypto';

window.crypt = crypto;

const kf = window.kf = new Keyfile();

import * as migration_20260904_214224_initial from './20260904_214224_initial';
import * as migration_20260917_173409 from './20260917_173409';
import * as migration_20261020_102237_security_auth from './20261020_102237_security_auth';

export const migrations = [
  {
    up: migration_20260904_214224_initial.up,
    down: migration_20260904_214224_initial.down,
    name: '20260904_214224_initial',
  },
  {
    up: migration_20260917_173409.up,
    down: migration_20260917_173409.down,
    name: '20260917_173409',
  },
  {
    up: migration_20261020_102237_security_auth.up,
    down: migration_20261020_102237_security_auth.down,
    name: '20261020_102237_security_auth'
  },
];

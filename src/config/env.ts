import { resolve, join } from 'path';
import { config } from 'dotenv';

const basePath = resolve(__dirname, '..', '..');

const whichEnvFileToUse =
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

config({
  path: join(basePath, whichEnvFileToUse)
});

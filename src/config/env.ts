import { resolve, join } from 'path';
import { config } from 'dotenv';

const basePath = resolve(__dirname, '..', '..');

const handleEnv = {
  test: join(basePath, '.env.test'),
  development: join(basePath, '.env.dev'),
  production: join(basePath, '.env.prod')
};

config({
  path: handleEnv[process.env.NODE_ENV]
});

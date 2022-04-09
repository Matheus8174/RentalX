/* eslint-disable @typescript-eslint/naming-convention */
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: number | string;
      JWT_SECRET: Secret;
      EXPIRES_IN: string | number;

      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}

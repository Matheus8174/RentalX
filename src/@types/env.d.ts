/* eslint-disable @typescript-eslint/naming-convention */
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: number | string;

      JWT_SECRET: Secret;
      EXPIRES_IN: string | number;

      EXPIRES_REFRESH_TOKEN_DAYS: number;
      SECRET_REFRESH_TOKEN: Secret;
      EXPIRES_IN_REFRESH_TOKEN: string | number;

      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;

      ADMIN_PASSWORD: string;
      ADMIN_EMAIL: string;

      FORGOT_MAIL_URL: string;
    }
  }
}

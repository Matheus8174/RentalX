import 'reflect-metadata';
import 'express-async-errors';

import '@config/env';
import '@shared/infra/typeorm/connection';
import '@shared/container';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../docs/swagger.json';
import routes from './routes';
import handleError from '@shared/infra/http/middlewares/handleError';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(routes);

app.use(handleError);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;

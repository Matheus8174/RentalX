import { getConnection } from 'typeorm';

import app from '@shared/infra/http/app';

const port = process.env.PORT || 3000;

const server = app.listen(port);

// Disparado no Ctrl + C no terminal -> multi plataforma
process.on('SIGINT', () => {
  server.close(() => {
    getConnection()
      .close()
      .then(() => {
        process.exit(0);
      });
  });
});

// Disparado no kill
process.on('SIGTERM', () => {
  server.close(() => {
    getConnection()
      .close()
      .then(() => {
        process.exit(0);
      });
  });
});

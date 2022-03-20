import { app } from './app';

const PORT = process.env.PORT || 8080;
const SERVER_MESSAGE = process.env.PORT
  ? `Express listens on https:<NameOfDomain>:${PORT}`
  : `Express listens on http://127.0.0.1:${PORT}`;

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(SERVER_MESSAGE));

// Importação

import app from './app.js';

// App

const PORTA = Number(process.env.PORT);

app.listen(PORTA, () => {
  console.log(`Servidor iniciado na porta ${PORTA}`);
});

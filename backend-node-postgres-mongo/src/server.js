require('dotenv').config();

const app = require('./app');
const { testPostgresConnection } = require('./database/postgres');
const { connectMongo } = require('./database/mongo');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    // Antes de levantar Express comprobamos ambas conexiones.
    await testPostgresConnection();
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No fue posible iniciar el backend.');
    console.error(error.message);
    process.exit(1);
  }
}

iniciarServidor();

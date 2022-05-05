import express from 'express';
import products from './Container.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Desafio Express');
});

app.get('/productos', async (req, res) => {
  try {
    const productos = await products.getAll();
    res.send(productos);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const productos = await products.getAll();
    const producto = productos[Math.floor(Math.random() * productos.length)];
    res.send(producto);
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import fs from 'fs';

class Container {
  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }

  save = async (product) => {
    try {
      if (!fs.existsSync(this.fileRoute)) {
        fs.promises.writeFile(this.fileRoute, '[]');
      }
      const data = await fs.promises.readFile(this.fileRoute, "utf-8");
      const products = JSON.parse(data);
      product = { ...product, id: products.length + 1 };
      products.push(product);
      await fs.promises.writeFile(this.fileRoute, JSON.stringify(products));
    } catch (error) {
      console.log('El producto no se pudo guardar: ' + error);
    }
  }

  getById = async (id) => {
    try {
      const data = await fs.promises.readFile(this.fileRoute, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        throw new Error("El producto no existe");
      }
    } catch (error) {
      console.log('El producto no se pudo obtener: ' + error);
    }
  }

  getAll = async () => {
    try {
      const data = await fs.promises.readFile(this.fileRoute, "utf8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.log('No se obtuvo ningun producto: ' + error);
    }
  }

  deleteById = async (id) => {
    try {
      const data = await fs.promises.readFile(this.fileRoute, "utf8");
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);
      if (product) {
        const index = products.indexOf(product);
        products.splice(index, 1);
        await fs.promises.writeFile(this.fileRoute, JSON.stringify(products));
      } else {
        throw new Error("El producto no existe");
      }
    } catch (error) {
      console.log('El producto no se pudo eliminar: ' + error);
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.fileRoute, '[]');
    } catch (error) {
      console.log('El producto no se pudo eliminar: ' + error);
    }
  }
}

const products = new Container("files/products.json");

/* products.save({
  name: "ZAPATILLAS DURAMO SL 2.0",
  price: 12.999,
  thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/53d8d412b2b6439c843ead6600ac24fc_9366/Zapatillas_Duramo_SL_2.0_Negro_GW8336.jpg",
}); */
/* products.save({
  name: "ZAPATILLAS SUPERSTAR",
  price: 20.999,
  thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4bc064f2ff6c4d848308aad801165d86_9366/Zapatillas_Superstar_Negro_EG4957.jpg",
}); */
/* products.save({
  name: "ZAPATILLAS GALAXY 5",
  price: 11.499,
  thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/a6a1607701c94b669824aba5014ef340_9366/Zapatillas_Galaxy_5_Azul_FW5705.jpg",
}); */

export default products;
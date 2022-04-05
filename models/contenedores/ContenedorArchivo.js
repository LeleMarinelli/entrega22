// CONTENEDOR // MENSAJES.

class ContenedorArchivo {
  constructor(config, table) {
    this.config = config;
    this.table = table;
  }

  async listarAll() {
    try {
      const data = await this.config.from(this.table).select("*");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async listar(idBuscado) {
    try {
      const data = await this.config
        .from(this.table)
        .select("*")
        .where({ id: idBuscado });
      console.table(data);
      return data;
    } catch (error) {
      console.log("Elemento no encontrado");
      throw error;
    }
  }

  async guardar(elem) {
    try {
      const newProductAdded = elem;
      await this.config(this.table).insert(newProductAdded);
      console.log("Se agrego un producto!");
      return newProductAdded;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async actualizar(elem, idElemento) {
    try {
      await this.config.from(this.table).where({ id: idElemento }).update(elem);
      console.table("Se ha actualizado un elemento");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async borrar(idBorrar) {
    try {
      await this.config.from(this.table).where({ id: idBorrar }).del();
      console.table("Entry deleted!");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async borrarAll() {
    try {
      await this.config.from(this.table).del();
      console.table("Se ha borrado todo!");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ContenedorArchivo;

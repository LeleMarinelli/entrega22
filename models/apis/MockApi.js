const MemoryContainer = require("../contenedores/MemoryContainer");
const { createProduct } = require("../../utils/index");

class MockApi extends MemoryContainer {
  constructor(resource) {
    super(resource);
  }

  populate(qty = 50) {
    const mockedItems = [];
    for (let i = 1; i <= +qty; i++) {
      const newItem = this.createItem(this.resource);
      const savedItem = this.save(newItem);
      mockedItems.push(savedItem);
    }
    return mockedItems;
  }

  createItem(resource) {
    const newProduct = {
      product: createProduct(),
    };
    return newProduct[resource];
  }
}

module.exports = MockApi;

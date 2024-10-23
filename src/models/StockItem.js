export const CATEGORIES = ["Jogos", "Livros", "Brinquedos", "Acessórios"];

export default class StockItem {
  constructor({ name, description, quantity, price, category }) {
    this.id = Math.floor(Math.random() * 100000); // gera um ID aleatório
    this.name = name;
    this.description = description;
    this.quantity = Number(quantity); // converte a string em número
    this.price = Number(price);
    this.category = category;
    this.createdAt = new Date(); // data atual da criação
    this.updatedAt = new Date();

    this.#validate();
  }

  #validate() {
    const validName = typeof this.name === "string";
    const validDescription = typeof this.description === "string";
    const validQuantity =
      typeof this.quantity === "number" && Number.isInteger(this.quantity);
    const validPrice = typeof this.price === "number";
    const validCategory = CATEGORIES.includes(this.category);
    if (
      !(
        validName &&
        validDescription &&
        validQuantity &&
        validPrice &&
        validCategory
      )
    ) {
      throw new Error("Invalid item!");
    }
  }
}

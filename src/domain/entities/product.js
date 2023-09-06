class Product
{
  constructor(props)
  {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
    this.thumbnail = props.thumbnail;
    this.code = props.code;
    this.stock = props.stock;
    this.owner = props.owner;
    this.enable = props.enable;
  }
}

export default Product;

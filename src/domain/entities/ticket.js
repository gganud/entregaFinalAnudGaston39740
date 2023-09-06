class Ticket
{
  constructor(props)
  {
    this.id = props.id;
    this.code = props.code;
    this.purchase_datetime = props.purchase_datetime;
    this.amount = props.amount;
    this.purchaser = props.purchaser;
    this.products = props.products;
    this.orderCompleted = props.orderCompleted;
    this.orderCompleted_datetime = props.orderCompleted_datetime;
  }
}

export default Ticket;

import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ticketCollection = 'ticket';

const ticketSchema = new Schema(
{
    code: { type: Schema.Types.String, require: true, unique: true },
    purchase_datetime: { type: Schema.Types.Date, require: true, default: Date.now },
    amount: { type: Schema.Types.Number, require: true },
    purchaser: { type: Schema.Types.String, require: true },
    products: { type: Schema.Types.Array, require: true },
    orderCompleted: { type: Schema.Types.Boolean, default: false },
    orderCompleted_datetime: { type: Schema.Types.Date, default: null }
});

ticketSchema.plugin(paginate);

export default mongoose.model(ticketCollection, ticketSchema);

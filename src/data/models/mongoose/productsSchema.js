import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new Schema({
title: { type: Schema.Types.String, require: true },
description: { type: Schema.Types.String, require: true },
code: { type: Schema.Types.String, require: true },
price: { type: Schema.Types.Number, require: true },
stock: { type: Schema.Types.Number, require: true },
thumbnail: { type: Schema.Types.String, require: true },
owner: { type: Schema.Types.String, ref: 'users', default: 'admin' },
enable: { type: Schema.Types.Boolean, default: true }
});

productSchema.plugin(paginate);

export default mongoose.model(productCollection, productSchema);

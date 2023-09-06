import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const roleCollection = 'roles';

const roleSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  permissions: [{ type: Schema.Types.String }]
});

roleSchema.plugin(paginate);

export default mongoose.model(roleCollection, roleSchema);

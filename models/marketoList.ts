import { model, Schema, Model, Document} from 'mongoose'
  
const MarketoListSchema: Schema = new Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true }
});
  
const MarketoList = model('MarketoList', MarketoListSchema);

export default MarketoList
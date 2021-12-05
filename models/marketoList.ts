import { model, Schema } from "mongoose";

const MarketoListSchema: Schema = new Schema({
  url: {
    type: String,
    required: true,
  },
  coins: [
    {
      name: String,
      ticker: String,
      date: String,
      last_price: Number,
    },
  ],
});

const MarketoList = model("MarketoList", MarketoListSchema);

export default MarketoList;

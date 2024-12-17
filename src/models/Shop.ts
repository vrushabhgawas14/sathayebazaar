import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: false },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      productImage: { type: String, required: true },
    },
  ],
  imageURL: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  ratedUsers: [{ type: String }],
  ratingsArray: [{ type: Number }],
  bayesianScore: { type: Number, required: false },
  sortingType: { type: Number, required: false },
});

export const Shops =
  mongoose.models.Shops || mongoose.model("Shops", shopSchema);

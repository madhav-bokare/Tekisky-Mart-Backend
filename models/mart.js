import mongoose from "mongoose";

const MartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,          
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      index: true,          
    },

    content: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
      index: true,          
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,  
  }
);

MartSchema.index({ category: 1, link: 1 });

const Mart = mongoose.model("Mart", MartSchema);
export default Mart;

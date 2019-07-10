const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const sourceSchema = new Schema({
  id: String,
  name: String,
  description: String,
  url: String,
  category: {
    type: String,
    enum: ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  },
  language: {
    type: String,
    enum: ["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "se", "ud", "zh"]
  },
  country: {
    type: String
    // enum: ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu",
    // "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it",
    // "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", 
    // "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"] // "pk" "es"
  },
  reputation: Number,
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment"
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Review"
  },
  politicalBias: String,
  fundingSources: [String],
  profileImg: {
    type: String,
    default: 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg'
  },
  rating: Number
});

module.exports = mongoose.model('Source', sourceSchema);

const { default: mongoose } = require("mongoose");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
const dbConnect = () => {
  let url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
  try {
    const conn = mongoose.connect(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;

import mongoose from "mongoose";

type TInput = {
  db: string;
}

export default ({db}: TInput) => {
  const connect = () => {
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        return process.exit(1);
      });
  }

  connect();

  mongoose.connection.on('disconnected', connect);
}
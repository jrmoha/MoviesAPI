import mongoose from 'mongoose';
import config from '../config';

const connectDatabase = async () => {
  return await mongoose
    .connect(`${config.db.url_local}${config.db.database}`)
    // .connect(`${config.db.url_global}${config.db.database}`)
    .then(() => {
      console.log('Database Connected');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;

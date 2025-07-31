// PORT = 3000
// MONGO_URI="mongodb+srv://balajikumar7061:balajikumar70@cluster0.jxckgrw.mongodb.net/group1"

import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import { connectDb } from './config/db.js'
import studentRoute from './routes/studentRoute.js';
import courseRoute from './routes/courseRoute.js';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', studentRoute);
app.use('/api', courseRoute);
connectDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

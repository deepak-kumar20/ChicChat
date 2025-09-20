const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb=require('./config/dbConnect')

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Hello world');
})

//connect to database
connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
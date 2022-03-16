require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require ('cookie-parser')
const bodyParser = require('body-Parser')


const app = express()
app.use(express.json())

// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );
app.use(bodyParser.json());

app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))


// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, { 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
}, err => {
   if(err) throw err;
   console.log('Connected to MongoDB!!!')
})



const port = process.env.PORT || 5000;
app.listen(port,function() {
    console.log("Server started successfully");

});

// const PORT = process.env.PORT || 5001
// app.listen(PORT,() => {
//     console.log('Server is running on port', PORT)
// })


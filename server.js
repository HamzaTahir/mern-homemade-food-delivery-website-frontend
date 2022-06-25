// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const expressValidator = require('express-validator');
// const cors = require('cors');

// // app
// const app = express(); 
// const routes = require('./src/Routes') 
// // PORT
// // step 1
// const port = process.env.POPT || 8000

// // database
// // step 2
// mongoose.connect(process.env.DATABASE || 'mongodb+srv://admin:admin@clustor0-ck2pa.mongodb.net/khansama', {
//      useNewUrlParser: true,
//      useCreateIndex: true
// }).then(()=>{
//     console.log("Database Connected.")
// })

// // step 3
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('build'))
//     const path = require('path')
//     app.get('*', function(req, res) {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//     });
    
// }

// //middleware 
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(expressValidator());
// app.use(cors());

// // // routes middleware

// app.use("/api", routes);

// app.listen(port, ()=>{
//     console.log(`Server is running on ${port}`);
// });


const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});


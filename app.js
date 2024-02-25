const express = require('express');
const routes = require('express').Router();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

routes.get('/',(req,res)=>{
    return res.status(200).send("Welcome to News Aggregator API")
})

async function connectToDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/admin", { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
    
    }
    connectToDB();
    
routes.use('/', newsInfo);

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to the news aggregator api app!");
});

routes.post('/register', register);
routes.post('/login', login);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;
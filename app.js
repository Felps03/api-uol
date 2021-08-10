const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./config/routes');
const port = 5151;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.json());
app.use(routes);


app.listen(port, ()=>{
	console.log('Servidor rodando na porta: '+port);
});
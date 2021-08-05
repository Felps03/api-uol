//routes.js
const express  = require('express');
const route = express.Router();
var dbCidades  = require('./dbCidades.json');
var dbClientes = require('./dbClientes.json');

// * Cadastrar cidade
// * Cadastrar cliente
// * Consultar cidade pelo nome (ok)
// * Consultar cidade pelo estado (ok)
// * Consultar cliente pelo nome (ok)
// * Consultar cliente pelo Id (ok)
// * Remover cliente
// * Alterar o nome do cliente
/*
route.get('/cidade', (req,res)=>{
	return res.json(dbCidades);
});
*//*
route.get('/cidade/:nome', (req,res)=>{
	var resultados = {};

	if( req.params.nome ){
		resultados = dbCidades.filter((el)=>{
			return el.nome == req.params.nome;
		});
	}
	res.send(resultados);
});

route.get('/cidade/estado/:estado', (req,res)=>{
	var resultados = {};

	if( req.params.estado ){
		resultados = dbCidades.filter((el)=>{
			return el.estado == req.params.estado;
		});
	}
	res.send(resultados);
});
*/
route.get(['/cidade', '/cidade/', '/cidade/:nome', '/cidade/estado/:estado'], (req,res)=>{
	var resultados = {};

	if( req.params.nome ){
		resultados = dbCidades.filter((el)=>{
			return el.nome == req.params.nome;
		});
		res.send(resultados);
	}

	if( req.params.estado ){
		resultados = dbCidades.filter((el)=>{
			return el.estado == req.params.estado;
		});
		res.send(resultados);
	}

	if( !req.params.nome && !req.params.estado ){
		res.send(dbCidades);
	}	
});

/*
route.get('/cliente', (req,res)=>{
	res.send(dbClientes);
});
*/
/*
route.get('/cliente/:id', (req,res)=>{
	var resultados = dbClientes.filter((el)=>{
		return el.id == req.params.id;
	});
	res.send(resultados);
});
*/


route.get(['/cliente', '/cliente/', '/cliente/nome/:nome', '/cliente/:id'], (req,res)=>{
	var resultados = {};

	if( req.params.id ){
		var resultados = dbClientes.filter((el)=>{
			return el.id == req.params.id;
		});
		res.send(resultados);
	}

	if( req.params.nome ){
		var resultados = dbClientes.filter((el)=>{
			return el.nome == req.params.nome;
		});
		res.send(resultados);
	}

	if( !req.params.id && !req.params.nome ){
		res.send(dbClientes);
	}
});

route.delete('/cliente/:id', (req,res)=>{
	var index = dbClientes.findIndex((el)=>{ if(el.id == req.params.id) return true; });
	dbClientes.splice(cli.id,1);
	res.send(index);
});

/*
route.get('/cidade/estado/:estado', (req,res,next)=>{
	res.send(req.params.estado);
});

*/
module.exports = route;
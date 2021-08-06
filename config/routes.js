const express  = require('express');
const route = express.Router();
var dbCidades  = require('./dbCidades.json');
var dbClientes = require('./dbClientes.json');

// * Cadastrar cidade(ok)
// * Cadastrar cliente(ok)
// * Consultar cidade pelo nome (ok)
// * Consultar cidade pelo estado (ok)
// * Consultar cliente pelo nome (ok)
// * Consultar cliente pelo Id (ok)
// * Remover cliente(ok)
// * Alterar o nome do cliente
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

route.post('/cidade', (req,res)=>{
	var id = (dbCidades.length+1);
	if( !req.body ){
		return res.status(400).end();
	}
	dbCidades.push({id:id, nome:req.body.nome, estado:req.body.estado});
	res.send(dbCidades);
});

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

route.post('/cliente', (req,res)=>{
	console.log(req.body, dbClientes.length, (dbClientes.length+1));
	var id = (dbClientes.length+1);

	if( !req.body ){
		return res.status(400).end();
	}
	dbClientes.push({id:id, nome:req.body.nome, sexo:req.body.sexo, data_nascimento:req.body.data_nascimento, idade:req.body.idade,cidade:req.body.cidade});
	res.send(dbClientes);
});

route.put('/cliente/:id', (req,res)=>{
	var index = dbClientes.findIndex((el)=>{ return el.id == req.params.id; });

	if( !req.body ){
		return res.status(400).end();
	}

	dbClientes[index].nome = req.body.nome;
	res.send(dbClientes[index]);
});

route.delete('/cliente/:id', (req,res)=>{
	var index = dbClientes.findIndex((el)=>{ return el.id == req.params.id; });
	dbClientes.splice(index,1);
	res.send(dbClientes);
});

module.exports = route;
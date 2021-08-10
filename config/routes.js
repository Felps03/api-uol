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
// * Alterar o nome do cliente(ok)
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
	var id = 1;

	if( dbCidades.length > 0 ){
		var id = dbCidades[dbCidades.length-1].id + 1;
	}

	if( !req.body ){
		return res.status(400).end();
	}
	dbCidades.push({id:id, nome:req.body.nome, estado:req.body.estado});
	res.send({id:id, nome:req.body.nome, estado:req.body.estado});
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
	var id = 1;

	if( dbClientes.length > 0 ){
		var id = dbClientes[dbClientes.length-1].id + 1;
	}

	if( !req.body ){
		return res.status(400).end();
	}

	if( !req.body.nome || !req.body.sexo || !req.body.data_nascimento || !req.body.idade || !req.body.cidade){
		return res.status(400).send({
			error:{
					msg:'Campo obrigatório em branco!'
			}
		});
	}

	if( !['F','M'].includes(req.body.sexo.toUpperCase()) ){
		return res.status(400).send({
			error:{
					msg:'Campo Sexo - Opção inválida!'
			}
		});
	}

	dbClientes.push({id:id, nome:req.body.nome, sexo:req.body.sexo, data_nascimento:req.body.data_nascimento, idade:req.body.idade,cidade:req.body.cidade});
	res.send({id:id, nome:req.body.nome, sexo:req.body.sexo, data_nascimento:req.body.data_nascimento, idade:req.body.idade,cidade:req.body.cidade});
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

	if(index >= 0 ){
		dbClientes.splice(index,1);
	}

	res.send(dbClientes);
});

route.use((req,res, next)=>{
	const erro = new Error('Rota não encontrada');	
	erro.status = 404;
	next(erro);
});

route.use((error,req,res, next)=>{
	res.status(error.status|| 500);
	return res.send({
		erro:{
			msg:error.message
		}
	});
});

module.exports = route;
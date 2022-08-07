const express = require('express')
const app = express()
const port = 3000
const util = require('util')
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'mydb',
	port: '3307'
};

app.set('view engine', 'ejs');

function getConnection() {
	const mysql = require('mysql')
	return mysql.createConnection(config) 
}

function executeQuery(command, callback) {
	const connection = getConnection()
	connection.query(command, function(err, result) {
		if(err) {
			throw err;
		}
		callback(result)
		connection.end()
	});
}

function executeCommands(insertCom, queryCom, callback) {
	const connection = getConnection()
	connection.query(insertCom)
	connection.query(queryCom, function(err, result) {
		if(err) {
			throw err;
		}		
		callback(result)
		connection.end()
	});
}

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.get('/init', (req,res) => {
	var listaInicial;
	executeQuery(`SELECT * FROM people`, (result) => {
		res.render('index', {results: result})
	})
})

app.get('/newList', (req,res) => {
	var listaNova;
	executeCommands(`INSERT INTO people(name) values('Wesley')`, `SELECT * FROM people`, (result) => {
		res.render('index', {results: result})
	})
	
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
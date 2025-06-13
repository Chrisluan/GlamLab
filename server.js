// server.js

// 1. Importação dos módulos necessários
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Adicionado ObjectId para buscar por ID
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// 2. Configuração inicial do Express
const app = express();
const port = process.env.PORT || 3000; // Define a porta do servidor, com 3000 como padrão

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// 3. Configuração da Conexão com o MongoDB Atlas
// A sua string de conexão deve estar em um arquivo .env na raiz do projeto
// Exemplo: MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
const uri = process.env.MONGODB_URI;

// Validação para garantir que a URI de conexão foi definida
if (!uri) {
    console.error("Erro: A variável de ambiente MONGODB_URI não foi definida.");
    process.exit(1); // Encerra o processo se a URI não estiver configurada
}

// Cria uma instância do MongoClient com as opções da API Estável
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db; // Variável para armazenar a instância do banco de dados

// 4. Função para conectar ao banco de dados
async function connectToDatabase() {
  try {
    // Conecta o cliente ao servidor
    await client.connect();
    
    // Define qual banco de dados você quer usar. Troque "meuBancoDeDados" pelo nome do seu DB.
    db = client.db("operacional"); 
    
    // Confirma a conexão enviando um ping
    await db.command({ ping: 1 });
    console.log("Conectado com sucesso ao MongoDB Atlas!");
    
  } catch (err) {
    console.error("Não foi possível conectar ao MongoDB", err);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  }
}

// 5. Definição das Rotas (Endpoints da API)

// Rota principal para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando corretamente. Conectado ao MongoDB.' });
});

// --- ROTAS PARA APPOINTMENTS (AGENDAMENTOS) ---

/**
 * @api {get} /appointments Busca todos os agendamentos
 */
app.get('/appointments', async (req, res) => {
    try {
        const collection = db.collection('appointments');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
        res.status(500).json({ message: 'Erro ao buscar dados no servidor.' });
    }
});

/**
 * @api {post} /appointments Cria um novo agendamento
 */
app.post('/appointments', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ message: 'Dados do agendamento não podem ser vazios.' });
        }
        const collection = db.collection('appointments');
        const result = await collection.insertOne(newData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao adicionar agendamento:", err);
        res.status(500).json({ message: 'Erro ao adicionar dados no servidor.' });
    }
});

// --- ROTAS PARA PROFESSIONALS (PROFISSIONAIS) ---

/**
 * @api {get} /professionals Busca todos os profissionais
 */
app.get('/professionals', async (req, res) => {
    try {
        const collection = db.collection('professionals');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro ao buscar profissionais:", err);
        res.status(500).json({ message: 'Erro ao buscar dados no servidor.' });
    }
});

/**
 * @api {post} /professionals Cria um novo profissional
 */
app.post('/professionals', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ message: 'Dados do profissional não podem ser vazios.' });
        }
        const collection = db.collection('professionals');
        const result = await collection.insertOne(newData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao adicionar profissional:", err);
        res.status(500).json({ message: 'Erro ao adicionar dados no servidor.' });
    }
});

// --- ROTAS PARA SERVICES (SERVIÇOS) ---

/**
 * @api {get} /services Busca todos os serviços
 */
app.get('/services', async (req, res) => {
    try {
        const collection = db.collection('services');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro ao buscar serviços:", err);
        res.status(500).json({ message: 'Erro ao buscar dados no servidor.' });
    }
});

/**
 * @api {post} /services Cria um novo serviço
 */
app.post('/services', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ message: 'Dados do serviço não podem ser vazios.' });
        }
        const collection = db.collection('services');
        const result = await collection.insertOne(newData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao adicionar serviço:", err);
        res.status(500).json({ message: 'Erro ao adicionar dados no servidor.' });
    }
});

// --- ROTAS PARA TRANSACTIONS (TRANSAÇÕES) ---

/**
 * @api {get} /transactions Busca todas as transações
 */
app.get('/transactions', async (req, res) => {
    try {
        const collection = db.collection('transactions');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro ao buscar transações:", err);
        res.status(500).json({ message: 'Erro ao buscar dados no servidor.' });
    }
});

/**
 * @api {post} /transactions Cria uma nova transação
 */
app.post('/transactions', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ message: 'Dados da transação não podem ser vazios.' });
        }
        const collection = db.collection('transactions');
        const result = await collection.insertOne(newData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao adicionar transação:", err);
        res.status(500).json({ message: 'Erro ao adicionar dados no servidor.' });
    }
});

// --- ROTAS PARA CLIENTS (CLIENTES) ---

/**
 * @api {get} /clients Busca todos os clientes
 */
app.get('/clients', async (req, res) => {
    try {
        const collection = db.collection('clients');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        res.status(500).json({ message: 'Erro ao buscar dados no servidor.' });
    }
});

/**
 * @api {post} /clients Cria um novo cliente
 */
app.post('/clients', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
            return res.status(400).json({ message: 'Dados do cliente não podem ser vazios.' });
        }
        const collection = db.collection('clients');
        const result = await collection.insertOne(newData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao adicionar cliente:", err);
        res.status(500).json({ message: 'Erro ao adicionar dados no servidor.' });
    }
});

// Opcional: Garante que a conexão com o cliente será fechada quando o app for encerrado
process.on('SIGINT', async () => {
  await client.close();
  console.log("Conexão com o MongoDB fechada.");
  process.exit(0);
});
module.exports = app;

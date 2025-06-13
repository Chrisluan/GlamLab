const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Erro: MONGODB_URI não definida.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Conexão com cache por execução

let cachedDb = null;
async function getDatabase() {
  if (!cachedDb) {
    await client.connect();
    const db = client.db("operacional");
    await db.command({ ping: 1 });
    console.log("Conectado ao MongoDB Atlas.");
    cachedDb = db;
  }
  return cachedDb;
}

// --- ROTAS ---

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando corretamente.' });
});

app.get('/appointments', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.collection('appointments').find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.post('/appointments', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'Dados do agendamento não podem ser vazios.' });
    }
    const db = await getDatabase();
    const result = await db.collection('appointments').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao adicionar agendamento:", err);
    res.status(500).json({ message: 'Erro ao adicionar dados.' });
  }
});

// Professionals
app.get('/professionals', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.collection('professionals').find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar profissionais:", err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.post('/professionals', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'Dados do profissional não podem ser vazios.' });
    }
    const db = await getDatabase();
    const result = await db.collection('professionals').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao adicionar profissional:", err);
    res.status(500).json({ message: 'Erro ao adicionar dados.' });
  }
});

// Services
app.get('/services', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.collection('services').find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar serviços:", err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.post('/services', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'Dados do serviço não podem ser vazios.' });
    }
    const db = await getDatabase();
    const result = await db.collection('services').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao adicionar serviço:", err);
    res.status(500).json({ message: 'Erro ao adicionar dados.' });
  }
});

// Transactions
app.get('/transactions', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.collection('transactions').find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar transações:", err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'Dados da transação não podem ser vazios.' });
    }
    const db = await getDatabase();
    const result = await db.collection('transactions').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao adicionar transação:", err);
    res.status(500).json({ message: 'Erro ao adicionar dados.' });
  }
});

// Clients
app.get('/clients', async (req, res) => {
  try {
    const db = await getDatabase();
    const data = await db.collection('clients').find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.post('/clients', async (req, res) => {
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'Dados do cliente não podem ser vazios.' });
    }
    const db = await getDatabase();
    const result = await db.collection('clients').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao adicionar cliente:", err);
    res.status(500).json({ message: 'Erro ao adicionar dados.' });
  }
});

process.on('SIGINT', async () => {
  await client.close();
  console.log("Conexão com o MongoDB fechada.");
  process.exit(0);
});

module.exports = app;

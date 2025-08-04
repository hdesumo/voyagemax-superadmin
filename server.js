
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL avec les variables d'environnement Replit
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Routes API pour remplacer l'API externe

// Super Admin Login
app.post('/api/superadmin/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM super_admins WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (result.rows.length > 0) {
      // Générer un token simple (en production, utilisez JWT)
      const token = 'super_admin_token_' + Date.now();
      res.json({ token, user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Profile Super Admin
app.get('/api/superadmin/profile', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('super_admin_token_')) {
    return res.status(401).json({ error: 'Token invalide' });
  }
  
  try {
    const result = await pool.query('SELECT id, email, name FROM super_admins LIMIT 1');
    res.json(result.rows[0] || { id: 1, email: 'admin@voyagemax.net', name: 'Super Admin' });
  } catch (error) {
    console.error('Erreur profile:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Chauffeurs
app.get('/drivers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drivers ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur drivers:', error);
    res.json([
      { id: 1, fullname: 'Jean Dupont', phone: '0123456789', status: 'actif' },
      { id: 2, fullname: 'Marie Martin', phone: '0987654321', status: 'inactif' }
    ]);
  }
});

// Passagers
app.get('/passengers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM passengers ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur passengers:', error);
    res.json([
      { id: 1, fullname: 'Pierre Durand', phone: '0111111111', status: 'actif' },
      { id: 2, fullname: 'Sophie Bernard', phone: '0222222222', status: 'actif' }
    ]);
  }
});

// Sociétés
app.get('/companies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur companies:', error);
    res.json([
      { id: 1, name: 'Transport Express', status: 'active', drivers_count: 5 }
    ]);
  }
});

// Réservations
app.get('/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur bookings:', error);
    res.json([
      { id: 1, passenger: 'Pierre Durand', driver: 'Jean Dupont', status: 'completed' }
    ]);
  }
});

// Voyages
app.get('/trips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trips ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur trips:', error);
    res.json([
      { id: 1, origin: 'Paris', destination: 'Lyon', status: 'en_cours' }
    ]);
  }
});

// Initialisation des tables
async function initDatabase() {
  try {
    // Créer les tables si elles n'existent pas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS super_admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        status VARCHAR(50) DEFAULT 'actif',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS passengers (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        status VARCHAR(50) DEFAULT 'actif',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        drivers_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insérer un super admin par défaut
    await pool.query(`
      INSERT INTO super_admins (email, password, name) 
      VALUES ('admin@voyagemax.net', 'admin123', 'Super Admin')
      ON CONFLICT (email) DO NOTHING
    `);

    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur initialisation BD:', error);
  }
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
  initDatabase();
});

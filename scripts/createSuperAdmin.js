const bcrypt = require('bcrypt');
const { SuperAdmin } = require('../models'); // adapte le chemin si nécessaire
const { v4: uuidv4 } = require('uuid');

async function createSuperAdmin() {
  const email = 'admin@voyagemax.net';
  const plainPin = '123456';
  const hashedPin = await bcrypt.hash(plainPin, 10);

  try {
    const existing = await SuperAdmin.findOne({ where: { email } });
    if (existing) {
      console.log('❌ SuperAdmin already exists.');
      return;
    }

    await SuperAdmin.create({
      id: uuidv4(),
      email,
      pin: hashedPin,
    });

    console.log('✅ SuperAdmin created with email:', email);
  } catch (error) {
    console.error('🚨 Error creating SuperAdmin:', error);
  }
}

createSuperAdmin();


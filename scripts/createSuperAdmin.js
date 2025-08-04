const bcrypt = require('bcrypt');
const { SuperAdmin } = require('../models');
const { sequelize } = require('../models');

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash('password123', 10);

    const [admin, created] = await SuperAdmin.findOrCreate({
      where: { email: 'superadmin@voyagemax.net' },
      defaults: {
        fullname: 'Super Admin', // ✅ correction ici
        password: hashedPassword,
      },
    });

    if (created) {
      console.log('✅ SuperAdmin created with email: superadmin@voyagemax.net and password: password123');
    } else {
      console.log('ℹ️ SuperAdmin already exists.');
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error creating SuperAdmin:', error);
  }
};

run();


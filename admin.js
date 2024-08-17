// admin.js

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const createCustomToken = async (uid, claims = {}) => {
  try {
    const token = await admin.auth().createCustomToken(uid, claims);
    return token;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

module.exports = {
  createCustomToken,
};

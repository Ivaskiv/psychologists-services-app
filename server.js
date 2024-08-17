import express from 'express';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByKey, startAt, limitToFirst, get } from 'firebase/database';

// Ініціалізуємо Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseURL: 'https://psychologists-57c33-default-rtdb.firebaseio.com/',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const server = express();
const ITEMS_PER_PAGE = 3;

server.get('/psychologists', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const startKey = String((page - 1) * ITEMS_PER_PAGE);
  const dataRef = query(
    ref(db, '/psychologists'),
    orderByKey(),
    startAt(startKey),
    limitToFirst(ITEMS_PER_PAGE + 1) // Додаємо один додатковий для перевірки наявності більше даних
  );

  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val() || {};
    const psychologists = Object.entries(data).map(([key, value]) => ({
      ...value,
      id: key,
    }));

    const hasMoreData = psychologists.length > ITEMS_PER_PAGE;
    if (hasMoreData) psychologists.pop(); // Видаляємо додатковий елемент

    const totalSnapshot = await get(ref(db, '/'));
    const totalCount = Object.keys(totalSnapshot.val() || {}).length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    res.json({
      psychologists: psychologists,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

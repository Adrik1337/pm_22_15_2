const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// CORS дозволяє нашому Angular-додатку (localhost:4200) звертатися до цього сервера (localhost:3000)
app.use(cors());

// Мідлвар для автоматичного парсингу JSON у тілі POST-запитів
app.use(express.json());

// 1. GET Ендпоінт: Зчитування даних із файлу data.json
app.get('/api/resume', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Помилка читання файлу:', err);
      return res.status(500).json({ message: 'Внутрішня помилка сервера при читанні даних' });
    }
    res.json(JSON.parse(data));
  });
});

// 2. POST Ендпоінт: Запис та оновлення даних у файлі data.json
app.post('/api/resume', (req, res) => {
  const updatedData = req.body;

  // Записуємо дані у файл з відступами у 2 пробіли для гарного форматування
  fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Помилка запису у файл:', err);
      return res.status(500).json({ message: 'Внутрішня помилка сервера при збереженні даних' });
    }
    res.json({ message: 'Дані успішно оновлено на сервері!', data: updatedData });
  });
});

// Запуск сервера на порту 3000
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Бекенд сервер успішно запущено!                   `);
  console.log(` Адреса API: http://localhost:${PORT}/api/resume  `);
  console.log(`===================================================`);
});
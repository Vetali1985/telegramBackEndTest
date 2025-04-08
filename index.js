import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import process from 'process';  // Импортируем process для использования переменных окружения
import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.TELEGRAM_TOKEN; // Получаем токен из переменной окружения
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const WEBHOOK_PATH = process.env.WEBHOOK_PATH || '/webhook'; // Получаем путь вебхука из переменной окружения
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Обработка сообщений от Telegram
app.post(WEBHOOK_PATH, async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const text = message.text;

    // Простой ответ
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Вы написали: ${text}`
    });
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Бот работает!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
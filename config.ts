export const corsConfig = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    `https://linkdin-auto-bot-back.herokuapp.com`,
    'https://linkedin-autobot-client.herokuapp.com'
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

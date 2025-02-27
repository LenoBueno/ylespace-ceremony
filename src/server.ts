import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 
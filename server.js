import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv'; 

dotenv.config(); 

const app = express();
const PORT = 3000;
const bearerToken = process.env.ACCESS_TOKEN;     

// Используйте CORS
app.use(cors());

app.use('/api', async (req, res) => {
  try {
    const apiPath = req.path;
    const url = `https://api.themoviedb.org/3${apiPath}?language=en-US&api_key=${bearerToken}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

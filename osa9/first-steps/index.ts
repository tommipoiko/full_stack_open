import express from 'express';
const app = express();
import { parseArguments, calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const h = String(req.query.height);
  const w = String(req.query.weight);
  try {
    const { height, weight } = parseArguments([h, w]);
    const ret = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    };
    res.send(ret);
  } catch (error) {
    const ret = {
      error: 'malformatted parameters'
    };
    res.send(ret);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

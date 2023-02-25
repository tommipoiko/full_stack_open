import express from 'express';
const app = express();
app.use(express.json());

import { parseArguments, calculateBmi } from './bmiCalculator';
import {  checkArguments, calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  const arr = [target, ...daily_exercises]

  if (!target || arr.length < 2) {
    return res.send({error: 'parameters missing'});
  }

  const nums = arr.filter(v => !isNaN(Number(v)))
  if (nums.length !== arr.length) {
    return res.send({error: 'malformatted parameters'});
  }

  const args = checkArguments(arr);
  const ret = calculateExercises(args.exerciseDays, args.target);

  return res.send(ret);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

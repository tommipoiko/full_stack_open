interface exerciseValues {
  target: number;
  exerciseDays: number[];
}

const checkArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    args.slice(3).filter(n => !isNaN(Number(n)))
    if (args.slice(3).length !== args.slice(3).filter(n => !isNaN(Number(n))).length) {
      throw new Error('Provided values were not numbers!');
    }
    const d = args.slice(3).map(n => Number(n))
    return {
      target: Number(args[2]),
      exerciseDays: d
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const getRating = (avg: number, target: number): number => {
  const multiplier = avg / target
  let rating = 0
  if (multiplier > 1.2) {
    rating = 3
  } else if (multiplier < 0.8) {
    rating = 1
  } else {
    rating = 2
  }
  return rating
}

const getRatingDescription = (rating: number): string => {
  let ratingDescription = ''
  if (rating === 3) {
    ratingDescription = 'Amazing'
  } else if (rating === 2) {
    ratingDescription = 'Ok'
  } else {
    ratingDescription = 'Bad'
  }
  return ratingDescription
}

const calculateExercises = (dailyExercise: number[], target: number): Result => {
  const td = dailyExercise.filter(d => d !== 0).length
  const avg = dailyExercise.reduce((a, b) => a + b, 0) / dailyExercise.length
  const rating = getRating(avg, target)
  let ratingDescription = getRatingDescription(rating)
  const ret = {
    periodLength: dailyExercise.length,
    trainingDays: td,
    success: avg >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  }
  return ret
}

try {
  const { target, exerciseDays } = checkArguments(process.argv);
  console.log(calculateExercises(exerciseDays, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
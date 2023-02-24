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
  if (multiplier > 1.1) {
    rating = 3
  } else if (multiplier < 0.9) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
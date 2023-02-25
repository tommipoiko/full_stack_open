interface bmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100)**2;
  if ( bmi > 18.5 && bmi < 24.9 ) {
    return ('Normal (healthy weight)');
  } else if (bmi > 25) {
    return ('Overweight');
  } else {
    return ('String so TS is happy');
  }
};
const calculateBmi = (height: number, mass: number): string => {
  if ( mass / (height/100)**2 > 18.5 && mass / (height/100)**2 < 24.9 ) {
    return ('Normal (healthy weight)')
  }
}

console.log(calculateBmi(180, 74))
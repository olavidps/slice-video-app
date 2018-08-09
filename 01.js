// Thousands with commas: A function that will take any integer and return 
// a string representation of that integer with commas separating groups of three digits.
// Examples:
// thousands_with_commas(1234) == '1,234'
// thousands_with_commas(123456789) == '123,456,789'
// thousands_with_commas(12) == '12'

console.log(func(12))
console.log(func(1234))
console.log(func(1234567))

function func(n) {
  var str = n % 1000
  if(n >= 1000) {
    return func((n - n % 1000)/1000) + "," + str
  } else {
    return "" + n
  }
}
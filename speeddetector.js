const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function detectSpeed(speed) {
  const speedLimit = 70;
  const kmPerPoint = 5;

  if (speed <= speedLimit) {
    return "Ok";
  }

  const points = Math.floor((speed - speedLimit) / kmPerPoint);
  
  if (points >= 12) {
    return "License suspended";
  }

  return `Points: ${points}`;
}

function promptSpeed() {
  readline.question("Enter the car's speed (in km/h): ", (speed) => {
    const numericSpeed = parseFloat(speed);

    if (isNaN(numericSpeed) || numericSpeed < 0) {
      console.log("Invalid input. Please enter a positive number.");
    } else {
      const result = detectSpeed(numericSpeed);
      console.log(result);
    }

    readline.close();
  });
}

promptSpeed();
const { readFileSync, promises: fsPromises } = require("fs");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const gameRounds = syncReadFile("day2_input.txt");

  let totalScore = 0;
  //for each round in gameRounds
  for (round of gameRounds) {
    const roundGuide = round.split(" ");

    //Part 1: calculate score assuming round is "opponent choice" "my choice"
    //    totalScore += scoreRound(roundGuide[0], roundGuide[1]);

    //Part 2: calculate score where roundGuide is "opponent choice" "round outcome"
    const opponentPlay = roundGuide[0];
    const roundOutcome = roundGuide[1];
    const myPlay = determineMyPlay(opponentPlay, roundOutcome);
    totalScore += scoreRound(opponentPlay, myPlay);
  }

  //return total score
  console.log("totalScore: ", totalScore);
  return totalScore;
})();

function determineMyPlay(opponentPlay, outcomeWanted) {
  const drawPairings = {
    A: "X",
    B: "Y",
    C: "Z",
  };
  const winPairings = {
    A: "Y",
    B: "Z",
    C: "X",
  };
  const losePairings = {
    A: "Z",
    B: "X",
    C: "Y",
  };

  if (outcomeWanted == "X") {
    return losePairings[opponentPlay];
  }
  if (outcomeWanted == "Y") {
    return drawPairings[opponentPlay];
  }
  return winPairings[opponentPlay];
}

function scoreMyOutcome(opponent, me) {
  const scorePair = opponent + me;
  if (["AY", "BZ", "CX"].includes(scorePair)) return 6; //I win => 6pts
  if (["AX", "BY", "CZ"].includes(scorePair)) return 3; //Draw => 3pts
  return 0; //Lose => 0pts
}

function scoreRound(opponent, me) {
  const shapeValue = {
    X: 1, //rock
    Y: 2, //paper
    Z: 3, //scissors
  };

  //calculate outcome of lose/draw/win
  const outcomeScore = scoreMyOutcome(opponent, me);
  //calculate shape value
  const shapeValueScore = shapeValue[me];
  //return sum
  return outcomeScore + shapeValueScore;
}

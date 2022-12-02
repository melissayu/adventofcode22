/*
https://adventofcode.com/2022/day/1
*/
const fs = require("fs");
const readline = require("readline");

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("dec_1_input.txt"),
    crlfDelay: Infinity,
  });

  let elfTotals = [];
  let currentElfTotal = 0;

  //for each line
  rl.on("line", (line) => {
    //if blank => end of elf total
    if (line == "") {
      //add to elfTotals
      elfTotals.push(parseInt(currentElfTotal));
      //reset currentElfTotal to 0
      currentElfTotal = 0;
    }
    //else (not blank)
    else {
      //add value to currentElfTotal
      currentElfTotal += parseInt(line);
    }
  });

  await new Promise((res) => {
    rl.once("close", res);
  });
  //part 1: max elf total
  console.log("topMax: ", Math.max(...elfTotals));
  //part 2: sum of top 3 elf totals
  const topThree = elfTotals
    .sort(function (a, b) {
      return b - a;
    })
    .slice(0, 3);
  const topThreeSum = topThree.reduce((a, b) => a + b);
  console.log("topThreeSum: ", topThreeSum);
})();

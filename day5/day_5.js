const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const { split } = require("lodash");
const _ = require("lodash");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const filelines = syncReadFile("day5_input.txt");

  let i = 0;

  //figure out how many stacks
  const numStacks = (parseInt(filelines[0].length) + 1) / 4;
  const crates = {};

  //create obj with arrays for each column
  for (let j = 0; j < filelines.length; j++) {
    const fileline = filelines[i];
    if (fileline[1] == "1") break;

    i++;
    //add items to crates if they exist in the line
    for (let s = 0; s < numStacks; s++) {
      if (fileline[s * 4 + 1] != " ") {
        if (crates[s + 1]) crates[s + 1].unshift(fileline[s * 4 + 1]);
        else crates[s + 1] = [fileline[s * 4 + 1]];
      }
    }
  }

  //skip number line and blank line
  i += 2;

  //read the moves
  for (let k = i; k < filelines.length; k++) {
    const moveLine = filelines[k];
    //create array in the form [ numBoxesToMove, fromStack, toStack]
    var separators = ["move ", " from ", " to "];
    var splitMoveLine = moveLine.split(new RegExp(separators.join("|"), "g"));
    splitMoveLine.shift();
    const [numBoxesToMove, fromStack, toStack] = splitMoveLine;

    //Part 1: loop over number of crates to move
    // for (let m = 0; m < numBoxesToMove; m++) {
    //   const crateToMove = crates[fromStack].pop();
    //   crates[toStack].push(crateToMove);
    // }

    //Part 2:
    const cratesToMove = crates[fromStack].splice(-numBoxesToMove);
    crates[toStack].push(...cratesToMove);
  }

  let str = "";
  for (const [key, value] of Object.entries(crates)) {
    str += value.pop();
  }
  console.log("str:", str);
})();

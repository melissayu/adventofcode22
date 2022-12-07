const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const { split } = require("lodash");
const _ = require("lodash");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const filelines = syncReadFile("day6_input.txt");
  const inputStream = filelines[0];

  const markerLength = 13;
  const tempArray = [];
  let i = 0;

  for (; i < inputStream.length; i++) {
    const nextChar = inputStream[i];

    //if tempArray is empty, add next character and move on
    if (!tempArray.length) {
      tempArray.push(nextChar);
      continue;
    }

    const indexOfNextChar = tempArray.indexOf(nextChar);
    //if tempArray length is "full" (13 in this case) & next char doesnt appear in tempArray break cuz you're done;
    if (tempArray.length == markerLength && indexOfNextChar == -1) {
      break;
    }

    //if next char does exist, throw away everything in the tempArray up to and including the existing char
    if (indexOfNextChar != -1) {
      tempArray.splice(0, indexOfNextChar + 1);
      tempArray.push(nextChar);
    }
    //else char doesn't exist but packet length isn't full, so add it to tempArray
    else {
      tempArray.push(nextChar);
    }
  }

  console.log("i:", i + 1);
})();

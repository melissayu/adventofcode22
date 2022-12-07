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

  const markerLength = 14;
  const tempArray = [];
  let i = 0;

  for (; i < inputStream.length; i++) {
    const nextChar = inputStream[i];

    //if next char does exist, throw away everything in the tempArray up to and including the existing char
    const indexOfNextChar = tempArray.indexOf(nextChar);
    if (indexOfNextChar != -1) {
      tempArray.splice(0, indexOfNextChar + 1);
    }
    tempArray.push(nextChar);

    //if tempArray length is "full" & next char doesnt appear in tempArray break cuz you're done;
    if (tempArray.length == markerLength) break;
  }

  console.log("i:", i + 1);
})();

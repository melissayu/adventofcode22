const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const _ = require("lodash");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const assignmentPairs = syncReadFile("day4_input.txt");
  let numFullyContainedPairs = 0;
  let numOverlappedPairs = 0;

  //for each pair in assignmentPairs
  for (pair of assignmentPairs) {
    const splitPair = pair.split(/[-,]+/);
    const [firstLow, firstHigh, secondLow, secondHigh] = splitPair.map((p) =>
      parseInt(p)
    );

    /*
    combos with fully contained ranges:
      (low1 == low2)
      (high1 == high2)
      (low1 < low2 && high2 < high1)
      (low2 < low1 && high1 < high2)
    */

    // if any of the above combos, add 1 to numFullyContainedPairs
    if (
      firstLow == secondLow ||
      firstHigh == secondHigh ||
      (firstLow < secondLow && secondHigh < firstHigh) ||
      (secondLow < firstLow && firstHigh < secondHigh)
    ) {
      numFullyContainedPairs++;
    }

    /*
      combos with overlapped ranges:
      (low1 == low2) //overlaps by one on low end
      (high1 == high2) //overlaps by one on high end
      (low2 == high1) //overlaps by one at mid
      (low1 == high2) //overlaps by one at mid
      (low1 < low2 && high1 > low2) //overlapping low end
      (low2 < low1 && high2 > low1) //overlapping low end
    */

    if (
      firstLow == secondLow ||
      firstLow == secondHigh ||
      firstHigh == secondLow ||
      firstHigh == secondHigh ||
      (firstLow < secondLow && firstHigh > secondLow) ||
      (secondLow < firstLow && secondHigh > firstLow)
    ) {
      numOverlappedPairs++;
    }
  }
  console.log("numFullyContainedPairs: ", numFullyContainedPairs);
  console.log("numOverlappedPairs: ", numOverlappedPairs);
})();

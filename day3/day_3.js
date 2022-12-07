const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const _ = require("lodash");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const rucksacks = syncReadFile("day3_input.txt");
  let sum = 0;
  let groupRucksacks = [];

  //for each rucksack in rucksacks
  for (rucksack of rucksacks) {
    //Part 2: find badge common to set of 3 rucksacks

    //build set of 3 rucksacks
    groupRucksacks.push(rucksack.split(""));
    if (groupRucksacks.length < 3) continue;
    //when we have a set of 3, find common item
    const badge = _.intersection(...groupRucksacks);
    const badgePriority = getPriorityOf(badge[0]);
    sum += badgePriority;
    //reset group of rucksacks
    groupRucksacks = [];

    /*
    //Part 1: calculate priority of error items
    //split string into first & second half
    const compartments = [
      rucksack.slice(0, rucksack.length / 2).split(""),
      rucksack.slice(rucksack.length / 2, rucksack.length).split(""),
    ];

    //find common letter in the two strings
    const commonItem = _.intersection(compartments[0], compartments[1]);
    const priority = getPriorityOf(commonItem[0]);
    sum += priority;
    */
  }

  console.log("sum: ", sum);
  return sum;
})();

function getPriorityOf(letter) {
  const abcs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return abcs.indexOf(letter) + 1;
}

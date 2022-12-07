const { group } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const { split } = require("lodash");
const _ = require("lodash");

void (async () => {
  function syncReadFile(filename) {
    const contents = readFileSync(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

  const consoleLines = syncReadFile("day7_input.txt");

  const fileSystem = {};
  let currentDirPath = "";
  let currentDirSize = 0;

  for (let i = 0; i < consoleLines.length; i++) {
    const consoleLine = consoleLines[i];

    //if line starts with $ and there is a currentDirPath and currentDirSize, calculate totalsizes
    if (
      consoleLine.startsWith("$ ") &&
      currentDirPath &&
      currentDirSize &&
      !fileSystem[currentDirPath].totalSize
    ) {
      updateDirSizes(currentDirPath, currentDirSize, fileSystem);
      currentDirSize = 0;
    }

    //$ cd .. => currentDirPath = containingDirPath (slice currentDirName off the path)
    if (consoleLine == "$ cd ..") {
      currentDirPath = currentDirPath.slice(
        0,
        -fileSystem[currentDirPath].dirName.length
      );
      continue;
    }

    //$ cd <foo>
    if (consoleLine.startsWith("$ cd ")) {
      const targetDir = consoleLine.split("$ cd ")[1];
      const targetDirPath = currentDirPath + targetDir;
      //if foo doesn't exist in filesystem, add it
      if (!fileSystem[targetDirPath])
        fileSystem[targetDirPath] = { totalSize: 0, dirName: targetDir };

      //set currentDirPath = currentDirPath+<foo>
      currentDirPath = targetDirPath;
      continue;
    }

    //$ ls or dir <foo> => can we ignore?
    if (consoleLine == "$ ls" || consoleLine.startsWith("dir ")) {
      continue;
    }

    //is everything else a filename?
    //sum up those fileSizes
    const fileSize = parseInt(consoleLine.split(" ")[0]);
    currentDirSize += fileSize;
  }

  if (currentDirSize) {
    updateDirSizes(currentDirPath, currentDirSize, fileSystem);
  }

  //Part 1: find all the totalSizes that are < maxSize
  let sumFileSizes = 0;
  for (const [key, value] of Object.entries(fileSystem)) {
    if (value.totalSize <= 100000) {
      sumFileSizes += value.totalSize;
    }
  }
  console.log("sumFileSizes:", sumFileSizes);

  //Part 2: find the smallest dir to delete to run the update
  //find the current free space (total disk space 70000000 - root directory size)
  const currentFreeSpace = 70000000 - fileSystem["/"].totalSize;
  //find the needed free space (update size 30000000 - current free space)
  const neededFreeSpace = 30000000 - currentFreeSpace;
  //find the smallest dir with size > needed free space and return that size
  //loop over all dirs in filesystem and return smallest totalSize that is greater than neededFreeSpace
  let smallestSoFar = fileSystem["/"].totalSize;
  for (const [dirPath, dir] of Object.entries(fileSystem)) {
    if (dir.totalSize > neededFreeSpace && dir.totalSize < smallestSoFar)
      smallestSoFar = dir.totalSize;
  }
  console.log("smallestDirToDelete has size: ", smallestSoFar);
})();

function updateDirSizes(currentDirPath, currentDirSize, fileSystem) {
  //save the currentDirSize for the currentDirPath
  fileSystem[currentDirPath].totalSize = currentDirSize;

  //add that totalSize to the totalSizes of all the containing up to root
  const outerDirPath = getParentDirPath(currentDirPath, fileSystem);
  let tempDirPath = outerDirPath;
  while (tempDirPath) {
    fileSystem[tempDirPath].totalSize += currentDirSize;
    //remove dirName from tempDirPath
    tempDirPath = getParentDirPath(tempDirPath, fileSystem);
  }
}

function getParentDirPath(dirPath, fileSystem) {
  return dirPath.slice(0, -fileSystem[dirPath].dirName.length);
}

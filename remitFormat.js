const csv = require("fast-csv");
const writeFile = require("write");

// Promise, non-blocking
(async () => {
  let count = 0;
  let newTxt = "";
  const stream = await csv
    .parseFile("dataFromProduction.csv")
    .on("data", (data) => {
      newTxt = newTxt + "'" + data[0].trim() + "',\n";
      count++;
    })
    .on("end", () => {
      writeFile
        .promise("RemitFormatCompleted.txt", newTxt.slice(0, -2))
        .then(() => {
          console.log(`Task completed with ${count} records processed.`);
        });
    });
})();

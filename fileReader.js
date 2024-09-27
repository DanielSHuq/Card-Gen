import fs from "fs";
import csv from "csvtojson";

const fileReader = (filePath, destPath) => {
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      const dataArr = jsonObj.map((row, index) => {
        return {
          name: Stringrow["English Name (As shown in CUSIS)"],
          country: row["Country"],
          sid: row["Student ID"],
          college: row["College"],
          major: row["Major Program Code"],
        };
      });
      console.log(dataArr);
    });
};

fileReader("./CARD CSV GEN.csv");

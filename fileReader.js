import fs from "fs";
import csv from "csvtojson";
const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const fileReader = (filePath, destPath) => {
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      const dataArr = jsonObj.map((row, index) => {
        return {
          first_name: capitalizeWords(row["First Name"]),
          last_name: capitalizeWords(row["Last Name"]),
          country: row["Nationality"],

          sid: row["Student ID"],
          college: row["College"],
          major: row["Major"].toUpperCase(),
          MID: row["Membership Id"],
        };
      });
      console.log(dataArr);
    });
};

fileReader("./membership-2024-updated.csv");

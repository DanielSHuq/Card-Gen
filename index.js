const url =
  "https://docs.google.com/spreadsheets/d/1yCZdWdn9YlYoGeqtV-QrzT9d75_ewKfjezN7e5TEQ2w/gviz/tq?";

const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const memberIdElement = document.getElementById("memberId");
const memberNumberElement = document.getElementById("memberNumber");
const showButton = document.getElementById("showButton");
const nationalityElement = document.getElementById("nationalityText");
const majorElement = document.getElementById("majorText");
const collegeElement = document.getElementById("collegeAbbr");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const saveButton = document.getElementById("saveButton");

let searchID = document.getElementById("searchInput").value;

html2canvas(document.querySelector("#cardContainer")).then((canvas) => {
  document.body.appendChild(canvas);
});

saveButton.addEventListener("click", function () {
  const canvas = document.querySelector("canvas");
  let imageURI = canvas.toDataURL();
  let link = document.createElement("a");
  link.href = imageURI;
  let fileName = `member_${searchID}.png`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

showButton.addEventListener("click", function () {
  searchID = document.getElementById("searchInput").value;
  generateCard();
});

function generateCard() {
  let zeroPadding = 5 - searchID.toString().length;
  let zeros = "0".repeat(zeroPadding);

  fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      const data = JSON.parse(rep.substr(47).slice(0, -2));
      let rows = data.table.rows;

      for (let row of rows) {
        if (row.c[0].v == searchID) {
          let info = row.c;

          memberIdElement.innerHTML = info[6].f.trim();
          memberNumberElement.innerHTML = `[ ${zeros}${searchID} ]`;

          let country = info[7].v
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          nationalityElement.innerHTML = country;

          let fullName = info[2].v.trim().split(" ");
          let firstName = fullName.slice(0, -1).join(" ");
          let lastName = fullName[fullName.length - 1];
          firstNameElement.innerHTML = firstName;
          lastNameElement.innerHTML = lastName;

          majorElement.innerHTML = info[11].v.toUpperCase();
          collegeElement.innerHTML = mapCollegeName(info[9].v.trim());

          displayCard();
          return;
        }
      }

      firstNameElement.innerHTML = "----- Not Found ------";
      displayCard();
    });
}

function displayCard() {
  const canvas = document.querySelector("canvas");
  document.body.removeChild(canvas);
  html2canvas(document.querySelector("#cardContainer")).then((canvas) => {
    document.body.appendChild(canvas);
  });
}

nextButton.addEventListener("click", function () {
  searchID = searchID < 22163 ? 22163 : ++searchID;
  generateCard();
});

prevButton.addEventListener("click", function () {
  if (searchID >= 22164) searchID--;
  generateCard();
});

function mapCollegeName(college) {
  const collegeMap = {
    "Lee Woo Sing College": "LWS",
    "Chung Chi College": "CC",
    "United College": "UC",
    "New Asia College": "NA",
    "Shaw College": "Shaw",
    "S.H.Ho College": "SH Ho",
    "Morningside College": "MC",
    "Wu Yee Sun College": "WYS",
    "C.W.Chu College": "CW Chu",
  };

  return collegeMap[college] || college;
}

function generateCardWithInputs(
  firstName,
  lastName,
  memberId,
  memberNumber,
  nationality,
  major,
  college
) {
  firstNameElement.innerHTML = firstName;
  lastNameElement.innerHTML = lastName;
  memberIdElement.innerHTML = memberId;
  memberNumberElement.innerHTML = `[ ${memberNumber} ]`;
  nationalityElement.innerHTML = nationality;
  majorElement.innerHTML = major.toUpperCase();
  collegeElement.innerHTML = mapCollegeName(college);
  displayCard();
}

generateCardWithInputs(
  "Eve",
  "Suwannuraks, Noppharada (Eve)",
  "22550",
  "22550",
  "Thailand",
  "IBBA",
  "S.H.Ho College"
);

import dataArr from "./data.js";

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

showButton.addEventListener("click", function () {
  searchID = document.getElementById("searchInput").value;
  generateCard();
});

saveButton.addEventListener("click", function () {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    let imageURI = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = imageURI;
    link.download = `member_${searchID}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("Please generate the card first to save it.");
  }
});

function displayCard() {
  return new Promise((resolve) => {
    const existingCanvas = document.querySelector("canvas");
    if (existingCanvas && existingCanvas instanceof Node) {
      document.body.removeChild(existingCanvas);
    }
    html2canvas(document.querySelector("#cardContainer")).then((canvas) => {
      canvas.style.display = "none";
      canvas.classList.add("canvas");
      document.body.appendChild(canvas);
      resolve();
    });
  });
}

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
  nationality,
  major,
  college,
  MID
) {
  return new Promise((resolve) => {
    firstNameElement.innerHTML = firstName;
    lastNameElement.innerHTML = lastName;
    memberIdElement.innerHTML = ` ${memberId}`;
    nationalityElement.innerHTML = nationality;
    memberNumberElement.innerHTML = MID;
    majorElement.innerHTML = major.toUpperCase();
    collegeElement.innerHTML = mapCollegeName(college);
    displayCard().then(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        let imageURI = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.href = imageURI;
        link.download = `${MID}_${firstName} ${lastName}_${memberId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      resolve();
    });
  });
}

const generateCardsWithArr = async (data) => {
  for (const [index, dataElement] of data.entries()) {
    const { first_name, last_name, sid, college, major, country, MID } =
      dataElement;
    await generateCardWithInputs(
      first_name,
      last_name,
      sid,
      country,
      major,
      college,
      MID
    );
  }
};

generateCardsWithArr(dataArr);

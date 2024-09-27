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

          memberIdElement.innerHTML = `[ ${zeros}${searchID} ]`;
          memberNumberElement.innerHTML = info[6].f.trim();

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
  const existingCanvas = document.querySelector("canvas");
  if (existingCanvas && existingCanvas instanceof Node) {
    document.body.removeChild(existingCanvas);
  }

  html2canvas(document.querySelector("#cardContainer")).then((canvas) => {
    canvas.style.display = "none";
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
  memberIdElement.innerHTML = `[ ${memberId} ] `;
  memberNumberElement.innerHTML = `${memberNumber}`;
  nationalityElement.innerHTML = nationality;
  majorElement.innerHTML = major.toUpperCase();
  collegeElement.innerHTML = mapCollegeName(college);
  displayCard();
}

const dataArr = [
  {
    name: "Akshat Raut",
    country: "India",
    sid: "1155226100",
    college: "Chung Chi College",
    major: "BCSEN",
  },
  {
    name: "Arib Ridwan",
    country: "Bangladesh",
    sid: "1155229420",
    college: "New Asia College",
    major: "ELEG",
  },
  {
    name: "Arthi Ashok Rao",
    country: "India",
    sid: "1155231936",
    college: "CW Chu College",
    major: "IERG",
  },
  {
    name: "Au Yee Ting Annabelle",
    country: "Canada",
    sid: "1155221021",
    college: "Chung Chi College",
    major: "LDTE",
  },
  {
    name: "Audrey Bernice Mak",
    country: "Hong Kong SAR (China)",
    sid: "1155205498",
    college: "Shaw College",
    major: "PACCN",
  },
  {
    name: "BUI, Ngoc Tram",
    country: "Vietnam",
    sid: "1155224941",
    college: "United College",
    major: "GLEF",
  },
  {
    name: "CARIZO, Margaux Gagasa",
    country: "Philippines",
    sid: "1155227948",
    college: "Morningside College",
    major: "ARCHN",
  },
  {
    name: "CARIZO, Margaux Gagasa",
    country: "Philippines",
    sid: "1155227948",
    college: "Morningside College",
    major: "ARCHN",
  },
  {
    name: "Chan Hei Tong",
    country: "China",
    sid: "1155234137",
    college: "Wu Yee Sun College",
    major: "DSPS",
  },
  {
    name: "Chan Shi Ting",
    country: "HK/Malaysia",
    sid: "1155221029",
    college: "United College",
    major: "IBBA",
  },
  {
    name: "Chantel",
    country: "Macau",
    sid: "1155218729",
    college: "Morningside College",
    major: "4858",
  },
  {
    name: "Charlotte",
    country: "HK",
    sid: "1155220526",
    college: "United College",
    major: "LLB",
  },
  {
    name: "Cheung Tsun Ho Eddie",
    country: "Hong Kong",
    sid: "1155223213",
    college: "Shaw College",
    major: "BME",
  },
  {
    name: "Chloe Thanh Pace",
    country: "France",
    sid: "1155218822",
    college: "Chung Chi College",
    major: "LAWS",
  },
  {
    name: "Chow Yuet Kors",
    country: "HK",
    sid: "1155214296",
    college: "Wu Yee Sun College",
    major: "ENGE",
  },
  {
    name: "Chow Yuet Kors",
    country: "HK",
    sid: "1155214296",
    college: "Wu Yee Sun College",
    major: "ENGE",
  },
  {
    name: "Clarence Victorio Widiyanto",
    country: "Indonesia",
    sid: "1155221167",
    college: "Lee Woo Sing College",
    major: "SEEM",
  },
  {
    name: "DADLANI, Naisha Naresh",
    country: "Hong Kong",
    sid: "1155191853",
    college: "Chung Chi College",
    major: "CENGN",
  },
  {
    name: "Daphnie Leah Kurniawan",
    country: "Indonesia",
    sid: "1155224708",
    college: "New Asia College",
    major: "BSCIN",
  },
  {
    name: "DENG Haozhi",
    country: "HK",
    sid: "1155234338",
    college: "Chung Chi College",
    major: "LAWS",
  },
  {
    name: "DJAYASAPUTRA, Jessica Jolene",
    country: "Indonesia",
    sid: "1155219770",
    college: "Chung Chi College",
    major: "PACC",
  },
  {
    name: "Erin Larasati Angdika",
    country: "Indonesia",
    sid: "1155224536",
    college: "New Asia College",
    major: "SCIN",
  },
  {
    name: "FUJIMOTO Kanta",
    country: "Japan",
    sid: "1155226659",
    college: "S.H.Ho College",
    major: "BCSEN",
  },
  {
    name: "Galbadrakh Erdenetsogt",
    country: "Mongolia",
    sid: "1155229245",
    college: "Shaw College",
    major: "IBBA",
  },
  {
    name: "Graham Spencer",
    country: "Indonesia",
    sid: "1155163071",
    college: "New Asia College",
    major: "CSCI",
  },
  {
    name: "Hanah Ciccarelli",
    country: "United States",
    sid: "1155232893",
    college: "Chung Chi College",
    major: "IBCE",
  },
  {
    name: "Hedi Tapaszto",
    country: "Hungary",
    sid: "1155224396",
    college: "CW Chu College",
    major: "GRMDN",
  },
  {
    name: "Helen Vanessa Wahyudi",
    country: "Indonesia",
    sid: "1155219607",
    college: "Chung Chi College",
    major: "IBBA",
  },
  {
    name: "Hillary Hah Sir Chynn",
    country: "Malaysia",
    sid: "1155218824",
    college: "Shaw College",
    major: "IFAA",
  },
  {
    name: "Hing Ka Family Hong",
    country: "Hong Kong",
    sid: "1155220725",
    college: "Chung Chi College",
    major: "BBA - JD",
  },
  {
    name: "Hor Pak Kiu",
    country: "Hong Kong",
    sid: "1155221271",
    college: "Shaw College",
    major: "ESHE",
  },
  {
    name: "JENNY LI LIN",
    country: "USA",
    sid: "1155221801",
    college: "Shaw College",
    major: "BME",
  },
  {
    name: "KURNIAWAN, Quinncy Elaine",
    country: "Indonesia",
    sid: "1155219742",
    college: "Chung Chi College",
    major: "IBBA",
  },
  {
    name: "Lam See Sun",
    country: "Hong Kong",
    sid: "1155231690",
    college: "Morningside College",
    major: "BEHM",
  },
  {
    name: "Lan Tsz On",
    country: "HKSAR",
    sid: "1155234306",
    college: "Wu Yee Sun College",
    major: "Urban Studies",
  },
  {
    name: "LOUIS COHEN",
    country: "Indonesia",
    sid: "1155232511",
    college: "United College",
    major: "ECOTU",
  },
  {
    name: "Ma Wing Yan",
    country: "Hong Kong SAR",
    sid: "1155222856",
    college: "Lee Woo Sing College",
    major: "LLB",
  },
  {
    name: "Mak Hiu Tung",
    country: "China Hong Kong",
    sid: "1155236281",
    college: "Wu Yee Sun College",
    major: "BA Translation",
  },
  {
    name: "Michael hui",
    country: "Hong Kong",
    sid: "1155226880",
    college: "Chung Chi College",
    major: "Qfrm",
  },
  {
    name: "Nattaya Ngaothammatat",
    country: "Thailand",
    sid: "1155232944",
    college: "United College",
    major: "BBA",
  },
  {
    name: "Nicklaus Tristan Setiadi",
    country: "Indonesia",
    sid: "1155219736",
    college: "Shaw College",
    major: "BCSEN",
  },
  {
    name: "QU Zhicheng",
    country: "China",
    sid: "1155214593",
    college: "Shaw College",
    major: "PHPC",
  },
  {
    name: "Rintaro Fukada",
    country: "Japan",
    sid: "1155228561",
    college: "Shaw College",
    major: "HIST",
  },
  {
    name: "Samara Nathania Cheung",
    country: "Hong Kong",
    sid: "1155219880",
    college: "Chung Chi College",
    major: "Economics (Dual degree with Tsinghua)",
  },
  {
    name: "Shierina SAYOGO",
    country: "Indonesia",
    sid: "1155219772",
    college: "Wu Yee Sun College",
    major: "IBBA",
  },
  {
    name: "Sukrithi NADUVILEDATH",
    country: "Hong Kong",
    sid: "1155225690",
    college: "United College",
    major: "PSYC",
  },
  {
    name: "TANG CHUN CHUNG",
    country: "HongKong",
    sid: "1155231693",
    college: "New Asia College",
    major: "PHPC",
  },
  {
    name: "Tasmia Mahmud",
    country: "Bangladesh",
    sid: "1155232121",
    college: "United College",
    major: "BMEG",
  },
];
generateCardWithInputs(
  "Eve",
  "Suwannuraks, Noppharada",
  "22550",
  "1155199524",
  "Thailand",
  "IBBA",
  "S.H.Ho College"
);

const csvToJson =
  ("csvFilePath",
  "jsonFilePath",
  () => {
    fs.readFile("csvFilePath", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file data");
        return;
      }
      const lines = data.split("\n");
      console.log(lines, data);
    });
  });

csvToJson("./CARD CSV GEN.csv", "");

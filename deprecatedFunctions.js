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

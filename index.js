const url = "https://docs.google.com/spreadsheets/d/1yCZdWdn9YlYoGeqtV-QrzT9d75_ewKfjezN7e5TEQ2w/gviz/tq?";  //url to google sheet of membership data
const firsts = document.getElementById("firsts");
const last = document.getElementById("last");
const id = document.getElementById("id");
const memnum = document.getElementById("memnum");
const showButtn = document.getElementById("showButtn");
const nationality = document.getElementById("nationality");
const major = document.getElementById("major");
const college = document.getElementById("college");
const nextButtn = document.getElementById("nextButtn");
const prevButtn = document.getElementById("prevButtn");
const saveButtn = document.getElementById("saveButtn");


var searchID = document.getElementById("search_id").value;  //for search bar


/*
This part of code generates a Canvas element and append it to the <div id="capture">.
The reason we need to do this is to allow us to be able to download the image, because we cannot download what is in
<div> as an image, but we can do that with <canvas>.
*/
html2canvas(document.querySelector("#capture")).then(canvas => { 
    document.body.appendChild(canvas);
});

saveButtn.addEventListener("click", function(){  //save button  --> for downloading the card from <canvas> we created just above.
    const canvas = document.querySelector("canvas");
    let urii = canvas.toDataURL();
    var link = document.createElement('a');
    link.href = urii;
    let file_name = "";
    file_name += "member_" + searchID.toString() + ".png";
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

showButtn.addEventListener("click", function(){  //show button
    searchID = document.getElementById("search_id").value;
    generate();
});

function generate (){
    let zero = searchID.toString();
    zero = 5 - zero.length;
    let oh = '0';
    console.log("its  : "+searchID);

    //getting data from the google sheet
    fetch(url)   
    .then(res => res.text())
    .then(rep => {
        const data = JSON.parse(rep.substr(47).slice(0,-2));  //don't worry about this, this is for dealing with the return response from google sheet
        let dataa = data.table.rows;
        for(let y in dataa){ //iterating through info, e.g., student ID, major, first_name, ...
            //console.log(y, dataa[y]);

            if(dataa[y].c[0].v == searchID){  
                /*
                same for here, I used 'dataa[y].c[0].v' due to the format of data google sheet return to me 
                when fetching it ( I have tried prinitng the whole retuned data, so I understand its format)
                */
                let info = dataa[y].c;
                
                id.innerHTML = info[6].f.trim();
                
                //writing data to the element on HTML which will appear on the card
                memnum.innerHTML = "[ " + oh.repeat(zero) + searchID + " ]";  //serach ID === membership number too
                
                let country = info[7].v.trim();
                let tempArr = country.split(" ");
                country = "";
                for(let i=0; i<tempArr.length; i++){
                    let str = tempArr[i];
                    if(str.length>=1) str = str[0].toUpperCase() + str.substr(1,str.length-1) + " ";
                    country += str;
                }

                //writing data to the card again
                nationality.innerHTML = country;
                

                /*
                These lines here are just me dealing with people whose names have so many parts, like 4 or 5.
                What these lines do is just handling which parts of the name will start to be on the newline.
                */
                let allPt = info[2].v.trim();
                tempArr = allPt.split(" ");
                let firstPt = ""; 
                let lastPt;
                if(tempArr.length>=4){
                    for(let i=0; i<tempArr.length-2; i++){
                        let str = tempArr[i];
                        str.toUpperCase();
                        firstPt += str + " ";
                    }
                    lastPt = tempArr[tempArr.length-2].toUpperCase() + " " + tempArr[tempArr.length-1].toUpperCase();
                }
                else if(tempArr.length == 3){
                    firstPt = tempArr[0] + " " + tempArr[1];
                    lastPt = tempArr[2];
                }
                else if(tempArr.length == 1){
                    firstPt = tempArr[0];
                    if(info[2].v.trim().toLowerCase() == "n/a") lastPt = "";
                    else lastPt = "(" + info[2].v.trim() + ")";
                }
                else{
                    firstPt = tempArr[0];
                    lastPt = tempArr[1];
                }
                firsts.innerHTML = firstPt;
                last.innerHTML = lastPt;
                
                major.innerHTML = info[11].v.toUpperCase();

                let col = findCollege(info[9].v.trim());
                college.innerHTML = col;

                display();
                return;
            }
        }
        firsts.innerHTML = "----- Not Found ------";
        display();
    })
}

function display(){
    var bog = document.body.querySelector("canvas");
    document.body.removeChild(bog);
    html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas);
    });
}

nextButtn.addEventListener("click", function(){
    if(searchID<22163) searchID = 22163;
    else searchID++;
    // else searchID = 22001;
    generate();
    //display();
})

prevButtn.addEventListener("click", function(){
    if(searchID>=22164) searchID --;
    generate();
    //display();
})

//to map abbreviation of college in the google sheet to full college name
function findCollege(college){
    let col = " ";
    switch(college){
        case "Lee Woo Sing College":
            col = "LWS";
            break;
        case "Chung Chi College":
            col = "CC";
            break;
        case "United College":
            col = "UC";
            break;
        case "New Asia College":
            col = "NA";
            break;
        case "Shaw College":
            col = "Shaw";
            break;
        case "S.H.Ho College":
            col = "SH Ho";
            break;
        case "Morningside College":
            col = "MC";
            break;
        case "Wu Yee Sun College":
            col = "WYS";
            break;
        case "C.W.Chu College":
            col = "CW Chu";
            break;
    }
    return col;
}
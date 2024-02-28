const stam =()=>{
   return Miluim_new= [
        {
          "ArmyDate": "2019-12-08",
          "M16": true,
          "birthDay": "1999-08-30",
          "email": "mormor2580@gmail.com",
          "fullName": "מור מכלוף",
          "isStudent": true,
          "isVeg": false,
          "job": "מתקין חלונות אלומיניום (חברת פתח חלון ודלת בע״מ)",
          "kala": false,
          "mag": false,
          "matol": false,
          "mictar": true,
          "negev": true,
          "personalNum": 8578249,
          "phone": "0523338623",
          "shoe": 44,
          "sniper": false,
          "tar": true,
          "title": "מפקד כיתה",
          "uniform": "ב",
          class1:5,
          'lastM':{
            Mname:'שג',
            MWeight:2,
            TimeStamp:'2024-02-12T06:35',
            Dur:3,
        }
        },
        {
          "ArmyDate": "2024-02-04",
          "M16": false,
          "birthDay": "2024-02-06",
          "email": "Elielkl@hotmail.com",
          "fullName": "אליאל קלפהולץ",
          "isStudent": true,
          "isVeg": false,
          "job": "סטוד ט",
          "kala": false,
          "mag": false,
          "matol": false,
          "mictar": true,
          "negev": false,
          "personalNum": 7522480,
          "phone": "0544253506",
          "shoe": 42,
          "sniper": false,
          "tar": true,
          "title": "לוחם",
          "uniform": "ב",
          class1:7,
          'lastM':{
            Mname:'סיור',
            MWeight:3,
            TimeStamp:'2024-02-12T16:00',
            Dur:8,
        }
        },
        {
          "ArmyDate": "2024-02-04",
          "M16": false,
          "birthDay": "2024-02-06",
          "email": "Elielkl@hotmail.com",
          "fullName": "יוסי כהן",
          "isStudent": true,
          "isVeg": false,
          "job": "סטוד ט",
          "kala": false,
          "mag": false,
          "matol": false,
          "mictar": true,
          "negev": false,
          "personalNum": 7522485,
          "phone": "0544253506",
          "shoe": 42,
          "sniper": false,
          "tar": true,
          "title": "לוחם",
          "uniform": "ב",
          class1:7,
          'lastM':{
            Mname:'',
            MWeight:0,
            TimeStamp:0,
            Dur:0,
        }
        }
      ]
}

const DaysinBase = 60;


const ischeck =(value) =>{
    value?$('#showtoggleW').show():$('#showtoggleW').hide();
}



const init = () =>{
    MISSIONS=[];
    SOLIDERS=[];
    _CURRENT_MISSION_ID=0;
    ReadFrom("Missions",(data)=>{
        console.log('from call back' , data);
        MISSIONS = data;
        MISSIONS==null?MISSIONS=[]:MISSIONS=data;
        if (typeof(MISSIONS)=='object') {
          // console.log(typeof(MISSIONS));
          MISSIONS = Object.values(MISSIONS);
        }
        
        //RenderTableM();
        renderCardMissions();
    })

    //AFTER RegMobile complete.
    ReadFrom("Miluim_new",(data)=>{
        console.log('from call back' , data);
        SOLIDERS = data;
        data==null?SOLIDERS=[]:SOLIDERS=data;
        
    })
    //SOLIDERS = stam();
}



const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log('From readFrom',data);
      CB(data);
      // console.log(Object.keys(data).length)
    })
};

function generateUniqueKey(array) {
  // Extract all keys from the objects in the array
  const keys = array.map(obj => obj.key);

  // Generate a unique key
  let uniqueKey;
  do {
    // Generate a random 4-digit key
    uniqueKey = Math.floor(1000 + Math.random() * 9000).toString();
  } while (keys.includes(uniqueKey)); // Make sure the key is not already in use

  return uniqueKey;
}


const PostMission=()=>{
    let name  = document.getElementById('name').value;
    let dur = parseInt(document.getElementById('dur').value);
    let dateStart = document.getElementById('dateStart').value;
    let weight = document.getElementById('weight').value;
    // let repet = document.getElementById('repet').checked;
    // let tinterval = document.getElementById('tinterval').value;
    let allthetime = document.getElementById('allthetime').checked;
    let solidersAmount = document.getElementById('soliderAmount').value;
    let commandorsAmount = document.getElementById('commandAmount').value;
    let dateArr = generateDatetimeInterval(dateStart,parseInt(dur),DaysinBase);
    console.log('the date array -->',dateArr);
    if (allthetime==false) {
      dateArr=[];
      let d = new Date(dateStart);
      dateArr.push(d.getTime());
    }
    for (let i = 0; i < dateArr.length; i++) {
      let today = new Date();

      const d = dateArr[i];
      const d2 = new Date(d);
      d2.setHours(d2.getHours()+dur);
      const mission = {};
      mission.Name = name;
      mission.Dur = dur;
      if (today.getTime()>d2.getTime()) {
        continue;
      }
      mission.DateStart = d;
      mission.DateEnd = d2.getTime();
      
      mission.Weight = weight;
      mission.Team =[];
      // mission.Repet = repet;
      mission.SolidersAmount = solidersAmount;
      mission.CommandorsAmount = commandorsAmount;
      // mission.Tinterval = tinterval;
      mission.Allthetime = allthetime;
      mission.key = generateUniqueKey(MISSIONS);
      console.log(mission);
      MISSIONS.push(mission);
    }

    setTimeout(()=>{
      Save2Once('Missions',MISSIONS);
      Swal.fire({
        title: "המשימה נוצרה בהצלחה",
        text: "המשימה תתווסף לרשימת המשימות",
        icon: "success"
      },()=>{
      document.getElementById('name').value = '';
      document.getElementById('dur').value = 0;
      document.getElementById('dateStart').value ='';
      document.getElementById('weight').value = 0;
      document.getElementById('soliderAmount').value=0;
      document.getElementById('commandAmount').value=0;
      
      })

    },1000)

    setTimeout(()=>{location.reload();},1500);
    $('#ex1').fadeOut();
    $('.blocker').fadeOut();


}



const Save2Once=(ref,value)=>{
    ref = firebase.database().ref(ref);
    ref.set(value);
}




// Function to calculate rest time for a soldier based on the weight of the last mission
function calculateRestTime(soldier) {
    const now = new Date();
    const lastMissionEnd = new Date(soldier.lastM.DateEnd);
    const missionWeight = soldier.lastM.Weight;
    const elapsedMilliseconds = now - lastMissionEnd;
    let elapsedHours = (((elapsedMilliseconds/1000)/60)/60)
    let ratio = elapsedHours/soldier.lastM.Dur;
    let res2 = ratio*missionWeight
    res2 = Math.round(res2);

    if (soldier.lastM.DateEnd=='') {
      res2 = Infinity;
    }
    if (now >=soldier.lastM.DateStart && now <=soldier.lastM.DateStart) {
      res2 = -1; 
    }
    let res =  elapsedMilliseconds / (missionWeight*soldier.lastM.Dur*1000*60); // Assuming weight represents mission duration
   // console.log(elapsedMilliseconds,missionWeight,soldier.lastM.Dur,res)
    res = Math.round(res);
    //console.log(res);
    return res2;
}


// Function to find soldiers with the most rest time and order the array accordingly
function findSoldiersWithRestTimeOrder(soldiers) {
    // Sort soldiers based on rest time (descending order)
    soldiers.sort((a, b) => {
        const restTimeA = calculateRestTime(a);
        const restTimeB = calculateRestTime(b);
        return restTimeB - restTimeA;
    });

    return soldiers;
}



const renderCardMissions = ()=>{
  let space = ' ';
  let lineBreak = '<br>';
  let localMission = MISSIONS
  let today = new Date();
  console.log(localMission);
  const uniqDates = uniqueDatesWithoutTime(localMission);
  let stringToReturn = ''
  console.log('the uniq dates -->',uniqDates);
  for (const i in uniqDates) {
    let someDate = ReversToValidString(uniqDates[i]);
    console.log('???',someDate);
    someDate= someDate.split('-');
    someDate = new Date(someDate[0],someDate[1],someDate[2])
    console.log('???',someDate);

    if (isTodayGreaterThanDate(someDate)) {
      console.log('for skip past dates (im in) -->',isTodayGreaterThanDate(someDate),someDate);
      continue;
    }
    let dayofweek = `יום ${getHebrewDayOfWeek(ReversToValidString(uniqDates[i]))}`
      stringToReturn += `<div class="wrap-ph" id="G-${uniqDates[i]}">`;
      stringToReturn+=`<h1 class="dateTitle">${uniqDates[i]}</h1><hr>
      <h1 style="margin-right:25px;font-size:22px">${dayofweek}</h1>
      <div class="wrap-grid">`
      for (const m in localMission) {
        let dateonly = localMission[m].DateStart
        dateonly = formatDate(new Date(dateonly));
        //console.log(dateonly,uniqDates[i])
        if (dateonly==uniqDates[i]) {
          //console.log('mission here',localMission[m]);
          //render here all the mission in some spesific date.
          //complete css class if complete 
          stringToReturn+=`<div class="one-card " id="${localMission[m].key}">
          <h1>${localMission[m].Name}</h1>
          <p>מתחיל:${addHoursAndFormat(localMission[m].DateStart,0)}</p>
          <p>נגמר:${addHoursAndFormat(localMission[m].DateEnd,0)}</p>
          <p>סהכ : ${localMission[m].Dur} שעות</p>
          <hr class="hrr">
          `;
          if (typeof(localMission[m].Team)=='undefined') {
            stringToReturn+=`<p>אין שיבוץ</p>`
          }
          else{
            stringToReturn+='<p>';
            stringToReturn+=`צוות:`;
            for (const k in localMission[m].Team ) {
              stringToReturn+=lineBreak+localMission[m].Team[k].name + space + lineBreak+localMission[m].Team[k].title
            }
          }
          stringToReturn+=`<hr class="hrr"><button class="btn-ok-effect" onclick="RenderTableSOL(${localMission[m].key})">מצא שיבוץ</button>
          <button class="btn-ok-effect">עריכה</button>
          <button class="btn-X-effect">מחיקה</button>
          </div>`

        }
      }
      stringToReturn+='</div></div>';

  }
  document.getElementById('mission-card').innerHTML = stringToReturn;
  $('#mission-card').fadeIn();
  return stringToReturn;

}


const RenderTableM=()=>{
    if (MISSIONS == null || MISSIONS.length==0) {
        return false;
    }
    // mission.Name = name;
    // mission.Dur = dur;
    // mission.Date = date;
    // mission.Weight = weight;
    // mission.Repet = repet;
    // mission.Tinterval = tinterval;
    // mission.Allthetime = allthetime;
    let str =`<table id="DB-Table" class="display" style="width:100%">
    <thead>
    <tr>
        <th>שם המשימה</th>
        <th>משך המשימה בשעות</th>
        <th>תאריך</th>
        <th>משקל</th>
        <th>?חוזרת</th>
        <th>?רציפה</th>
        <th>פעולות</th>
  
  
    </tr>
  </thead>
  <tbody>`;

  for (let i = 0; i < MISSIONS.length; i++) {
    const m = MISSIONS[i];
    str+=`<tr id="${m.key}">
    <td>${m.Name}</td>
    <td>${m.Dur}</td>
    <td>${m.Date}</td>
    <td>${m.Weight}</td>
    <td>${m.Repet}</td>
    <td>${m.Allthetime}</td>
    <td>
    <div class="flex">
    <button onclick="RenderTableSOL(${m.key})" style="width:65px; font-size:16px; margin-right:5px;"  id="F-${i}" class="btn-ez-effect">מצא שיבוץ</button>   
    <button style="width:65px; font-size:16px; margin-right:5px;"  id="U-${i}" class="btn-ok-effect">עריכה</button> 
    <button style="width:65px; font-size:16px; margin-right:5px;" id="X-${m.Name}" class="btn-X-effect">מחיקה</button>
    </div>
    </td>
  </tr>`
  }

    str+=`</tbody>`;
    str+=`<tfoot>
    <tr>
    <th>שם המשימה</th>
    <th>משך המשימה בשעות</th>
    <th>תאריך</th>
    <th>משקל</th>
    <th>?חוזרת</th>
    <th>?רציפה</th>
    <th>פעולות</th>
  </tr>
  </tfoot>
  `;
  document.getElementById('DT-PH').innerHTML = str;
  new DataTable('#DB-Table',{
    order: [[0, 'desc']]
  });
  }


  const RenderTableSOL=(missionID)=>{
    let ResArr = findSoldiersWithRestTimeOrder(SOLIDERS);
    _CURRENT_MISSION_ID = missionID;
    _CURRENT_MISSION = findObjectByAttribute(MISSIONS,'key',_CURRENT_MISSION_ID);
    let space = ' ';
    let br = '<br>';

    let str =`<table id="DB-Table2" class="display" style="width:100%">
    <thead>
    <tr>
        <th>שם החייל</th>
        <th>מחלקה</th>
        <th>משימה אחרונה</th>
        <th>ממתי עד מתי</th>
        <th>ניקוד</th>
        <th>פעולות</th>

  
  
    </tr>
  </thead>
  <tbody>`;

  for (let i = 0; i < ResArr.length; i++) {
    const R = ResArr[i];
    const untildate =new Date(R.lastM.TimeStamp);
    let until = untildate.toTimeString();
    untildate.setHours(untildate.getHours()-R.lastM.Dur);
    let from = untildate.toTimeString();
    let date = formatDate(untildate);
    until = until.split(" ")[0];
    from = from.split(" ")[0];
    let res = calculateRestTime(R);

    let dateString = date+br+from+br+until;
    R.lastM.Name==''?dateString = '-' : dateString = dateString;

    str+=`<tr id ="${R.personalNum}">
    <td style="font-size:22px;">${R.fullName}</td>
    <td>${R.class1}</td>
    <td>${R.lastM.Name==''?'אין':R.lastM.Name}</td>
    <td>${dateString}</td>
    <td>${res}</td>
    <td>
    <div class="flex">  
    <button onclick="connectSol_Mission(${R.personalNum})" style="width:65px; font-size:16px; margin-right:5px;"  id="U-${i}" class="btn-ok-effect">שבץ</button> 
    </div>
    </td>
    </tr>`
  }

    str+=`</tbody>`;
    str+=`<tfoot>
    <tr>
    <th>שם החייל</th>
    <th>מחלקה</th>
    <th>משימה אחרונה</th>
    <th>ממתי עד מתי</th>
    <th>ניקוד</th>
    <th>פעולות</th>
  </tr>
  </tfoot>
  `;

  let missionDate = formatDate(new Date(_CURRENT_MISSION.DateStart));
  let missinStartTime = new Date(_CURRENT_MISSION.DateStart);
  let missinEndTime = new Date(_CURRENT_MISSION.DateEnd);

  missinStartTime = missinStartTime.getHours()<10?'0'+missinStartTime.getHours()+':00':missinStartTime.getHours()+':00';
  missinEndTime = missinEndTime.getHours()<10?'0'+missinEndTime.getHours()+':00':missinEndTime.getHours()+':00';

  let MissiondateString = missionDate+br+missinStartTime+' - '+missinEndTime;
  let missionTitleString = `${_CURRENT_MISSION.Name}${br}${MissiondateString}`;
  document.getElementById('missionTitle').innerHTML = missionTitleString;
  document.getElementById('SolPH').innerHTML = str;
  new DataTable('#DB-Table2',{
    order: [[4, 'desc']]
  });
  $('#SolDBHolder').fadeIn();
  document.getElementById('SolDBHolder').scrollIntoView({ behavior: "smooth", block: "start" });
  }




 const connectSol_Mission = (SolPersonalNum)=>{
  _CURRENT_SOLIDER_TARGET_MISSION = SolPersonalNum;
  console.log('mission:',_CURRENT_MISSION_ID,' Sol:',_CURRENT_SOLIDER_TARGET_MISSION);
  const ThisSol = findObjectByAttribute(SOLIDERS,'personalNum',_CURRENT_SOLIDER_TARGET_MISSION);
  const ThisMission = findObjectByAttribute(MISSIONS,'key',_CURRENT_MISSION_ID);
  console.log('mission:',ThisMission,' Sol:',ThisSol);

  //new idea to implment the missin in the sol.lastM
  // and implement the solider in the team. becarful with command and regular solider ! 
    // use the update function 



  //save the submit solider to mission in the soldiers array and need to save in the DB in Miluim_new ref 
  // and then need to Re-Render the data table ! 
  //Save2Once('Miluim_New',SOLIDERS)

  
 }


//  const  continueConnect = ()=>{
//   const ThisMission = findObjectByAttribute(MISSIONS,'key',_CURRENT_MISSION_ID);
//   let startTime = document.getElementById('startTimeIN').value;
//   let startDate = new Date(startTime)
//   let endTime = addHoursToDate(startDate,ThisMission.Dur);
//   endTime = formatDateToCustomFormat(endTime);
//   for (const obj of SOLIDERS) {
//       // Check if the current object has the specified attribute with the given value
//       if (obj['personalNum'] == _CURRENT_SOLIDER_TARGET_MISSION) {
//         // If found, return the object
//         obj.lastM = {
//           Mname:ThisMission.Name,
//           MWeight:ThisMission.Weight,
//           TimeStamp:endTime,
//           Dur:ThisMission.Dur,
//         }
//       }
//       else {
//         // error !
//       }
//   }
//   $('#timeStartInputWraper').fadeOut();
//   $('#SolDBHolder').fadeOut();

// } 



  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero if needed
    const year = date.getFullYear(); // Get full year

    return `${day}/${month}/${year}`;
}

function formatDateToCustomFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const closeModal =(id)=>{
    $(`#${id}`).fadeOut();
}



function findObjectByAttribute(array, attributeName, attributeValue) {
  // Iterate through the array of objects
  for (const obj of array) {
    // Check if the current object has the specified attribute with the given value
    if (obj[attributeName] == attributeValue) {
      // If found, return the object
      return obj;
    }
  }
  // If no matching object is found, return null
  return null;
}





function addHoursToDate(date, hoursToAdd) {
  const newDate = new Date(date); // Create a new Date object to avoid modifying the original date
  newDate.setHours(newDate.getHours() + hoursToAdd); // Add hours to the date
  return newDate;
}




function addHoursAndFormat(initialDatetime, hoursToAdd) {
  // Parse the initial datetime string
  var initialDate = new Date(initialDatetime);
  
  // Add X hours
  initialDate.setHours(initialDate.getHours() + hoursToAdd);
  
  // Format the resulting datetime
  var formattedResult = `${padZero(initialDate.getDate())}/${padZero(initialDate.getMonth() + 1)}/${initialDate.getFullYear()} ${padZero(initialDate.getHours())}:${padZero(initialDate.getMinutes())}`;
  
  return formattedResult;
}

// Helper function to pad single digits with leading zeros
function padZero(num) {
  return num < 10 ? '0' + num : num;
}



function sortByDate(array) {
  // Custom comparison function
  function compareDates(a, b) {
      return new Date(a.Date) - new Date(b.Date);
  }
  
  // Sort the array based on the date attribute
  array.sort(compareDates);
  
  return array;
}



//create uniq array of date only
function uniqueDatesWithoutTime(arrayOfObjects) {
  // Create a Set to store unique date strings
  var uniqueDates = new Set();

  // Iterate through the array of objects
  arrayOfObjects.forEach(function(obj) {
      // Extract the date part from each datetime string
      var datePart = formatDate(new Date(obj.DateStart));  // Extracts the date part before "T"
      // Add it to the Set
      uniqueDates.add(datePart);
  });

  // Convert the Set back to an array if needed
  var uniqueDateArray = Array.from(uniqueDates);
  
  return uniqueDateArray;
}

//get hebrew string day of week
function getHebrewDayOfWeek(dateString) {
  // Create a Date object from the input date string
  var date = new Date(dateString);
  //console.log('getHebrewDayOfWeek -->',date,dateString)
  // Array of Hebrew day names
  var hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  var dayOfWeek = date.getDay();
  
  // Return the Hebrew day name corresponding to the day of the week
  return hebrewDays[dayOfWeek];
}


// create interval of dates
function generateDatetimeInterval(initialDatetime, hours, intervalLength) {
  // Convert initialDatetime to a Date object
  var currentDate = new Date(initialDatetime);
  
  // Initialize an array to store the resulting datetimes
  var datetimeArray = [];
  datetimeArray.push(currentDate.getTime())
  // Loop through the interval
  for (var i = 0; i < intervalLength; i++) {
      // Add hours to the current datetime
      currentDate.setHours(currentDate.getHours() + hours);
      
      // Push the formatted datetime into the array
      datetimeArray.push(currentDate.getTime());
  }
  
  return datetimeArray;
}




function ReversToValidString(inputDate) {
  // Split the input date string by "/"
  var parts = inputDate.split('/');
  
  // Rearrange the parts to form the desired format (year-month-day)
  var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
  
  return formattedDate;
}


// find object by the key and change the value of the property and return the array
function updateObjectProperty(arrayOfObjects, keyName, keyValue, propertyToUpdate, newValue) {
  // Find the object with the specified key and value
  const foundObject = arrayOfObjects.find(obj => obj[keyName] === keyValue);
  
  // If the object is found, update the specified property
  if (foundObject) {
      foundObject[propertyToUpdate] = newValue;
  } else {
      console.log("Object not found with the specified key and value.");
  }
  
  // Optionally, you can return the modified array of objects
  return arrayOfObjects;
}

//remove object by key and return the new array
function removeObjectByKey(arrayOfObjects, keyName, keyValue) {
  // Find the index of the object with the specified key and value
  const index = arrayOfObjects.findIndex(obj => obj[keyName] === keyValue);
  
  // If the object is found, remove it from the array
  if (index !== -1) {
      arrayOfObjects.splice(index, 1);
  } else {
      console.log("Object not found with the specified key and value.");
  }
  
  // Return the updated array of objects
  return arrayOfObjects;
}




function isTodayGreaterThanDate(compareDate) {
  // Get the current date
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  var currentDay = currentDate.getDate();

  // Extract year, month, and day parts from the compareDate
  var compareYear = compareDate.getFullYear();
  var compareMonth = compareDate.getMonth() + 1; // Month is zero-based, so we add 1
  var compareDay = compareDate.getDate();

  // Compare the year, month, and day parts
  if (currentYear > compareYear) {
      return true;
  } else if (currentYear === compareYear) {
      if (currentMonth > compareMonth) {
          return true;
      } else if (currentMonth === compareMonth) {
          return currentDay > compareDay;
      }
  }
  
  return false;
}
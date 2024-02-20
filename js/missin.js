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
        data==null?MISSIONS=[]:MISSIONS=data;
        RenderTableM();
    })

    //AFTER RegMobile complete.
    // ReadFrom("Miluim_new",(data)=>{
    //     console.log('from call back' , data);
    //     SOLIDERS = data;
    //     data==null?SOLIDERS=[]:SOLIDERS=data;
        
    // })
    SOLIDERS = stam();
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
    let dur = document.getElementById('dur').value;
    let date = document.getElementById('date').value;
    let weight = document.getElementById('weight').value;
    let repet = document.getElementById('repet').checked;
    let tinterval = document.getElementById('tinterval').value;
    let allthetime = document.getElementById('allthetime').checked;
    const mission = {};
    mission.Name = name;
    mission.Dur = dur;
    mission.Date = date;
    mission.Weight = weight;
    mission.Repet = repet;
    mission.Tinterval = tinterval;
    mission.Allthetime = allthetime;
    mission.key = generateUniqueKey(MISSIONS);
    console.log(mission);
    MISSIONS.push(mission);
    Save2Once('Missions',MISSIONS);
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
    const lastMissionEnd = new Date(soldier.lastM.TimeStamp);
    const missionWeight = soldier.lastM.MWeight;
    const elapsedMilliseconds = now - lastMissionEnd;
    let res =  elapsedMilliseconds / (missionWeight*soldier.lastM.Dur*1000*60); // Assuming weight represents mission duration
   // console.log(elapsedMilliseconds,missionWeight,soldier.lastM.Dur,res)
    res = Math.round(res);
    //console.log(res);
    return res;
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
    let str =`<table id="DB-Table2" class="display" style="width:100%">
    <thead>
    <tr>
        <th>שם החייל</th>
        <th>מחלקה</th>
        <th>שם המשימה</th>
        <th>משך המשימה בשעות</th>
        <th>תאריך</th>
        <th>משעה</th>
        <th>עד שעה</th>
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


    str+=`<tr id ="${R.personalNum}">
    <td style="font-size:22px;">${R.fullName}</td>
    <td>${R.class1}</td>
    <td>${R.lastM.Mname}</td>
    <td>${R.lastM.Dur}</td>
    <td>${date}</td>
    <td>${from}</td>
    <td>${until}</td>
    <th>${res}</th>
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
    <th>שם המשימה</th>
    <th>משך המשימה בשעות</th>
    <th>תאריך</th>
    <th>משעה</th>
    <th>עד שעה</th>
    <th>ניקוד</th>
    <th>פעולות</th>
  </tr>
  </tfoot>
  `;
  document.getElementById('SolPH').innerHTML = str;
  new DataTable('#DB-Table2',{
    order: [[7, 'desc']]
  });
  $('#SolDBHolder').fadeIn();
  }




 const connectSol_Mission = (SolPersonalNum)=>{
  _CURRENT_SOLIDER_TARGET_MISSION = SolPersonalNum;
  console.log('mission:',_CURRENT_MISSION_ID,' Sol:',_CURRENT_SOLIDER_TARGET_MISSION);
  const ThisSol = findObjectByAttribute(SOLIDERS,'personalNum',_CURRENT_SOLIDER_TARGET_MISSION);
  const ThisMission = findObjectByAttribute(MISSIONS,'key',_CURRENT_MISSION_ID);
  console.log('mission:',ThisMission,' Sol:',ThisSol);
  


  //save the submit solider to mission in the soldiers array and need to save in the DB in Miluim_new ref 
  // and then need to Re-Render the data table ! 
  //Save2Once('Miluim_New',SOLIDERS)

  
  $('#timeStartInputWraper').fadeIn();     
 }


 const  continueConnect = ()=>{
  const ThisMission = findObjectByAttribute(MISSIONS,'key',_CURRENT_MISSION_ID);
  let startTime = document.getElementById('startTimeIN').value;
  let startDate = new Date(startTime)
  let endTime = addHoursToDate(startDate,ThisMission.Dur);
  endTime = formatDateToCustomFormat(endTime);
  for (const obj of SOLIDERS) {
      // Check if the current object has the specified attribute with the given value
      if (obj['personalNum'] == _CURRENT_SOLIDER_TARGET_MISSION) {
        // If found, return the object
        obj.lastM = {
          Mname:ThisMission.Name,
          MWeight:ThisMission.Weight,
          TimeStamp:endTime,
          Dur:ThisMission.Dur,
        }
      }
      else {
        // error !
      }
  }
  $('#timeStartInputWraper').fadeOut();
  $('#SolDBHolder').fadeOut();

} 



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
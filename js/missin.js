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
        }
      ]
}



const ischeck =(value) =>{
    value?$('#showtoggleW').show():$('#showtoggleW').hide();
}



const init = () =>{
    MISSIONS=[];
    SOLIDERS=[];
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
    console.log(elapsedMilliseconds,missionWeight,soldier.lastM.Dur,res)
    res = Math.round(res);
    console.log(res);
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
    str+=`<tr>
    <td>${m.Name}</td>
    <td>${m.Dur}</td>
    <td>${m.Date}</td>
    <td>${m.Weight}</td>
    <td>${m.Repet}</td>
    <td>${m.Allthetime}</td>
    <td>
    <div class="flex">
    <button onclick="RenderTableSOL()" style="width:65px; font-size:16px; margin-right:5px;"  id="F-${i}" class="btn-ez-effect">מצא שיבוץ</button>   
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


  const RenderTableSOL=()=>{
    let ResArr = findSoldiersWithRestTimeOrder(SOLIDERS);
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


    str+=`<tr>
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
    <button style="width:65px; font-size:16px; margin-right:5px;"  id="U-${i}" class="btn-ok-effect">שבץ</button> 
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
    order: [[6, 'desc']]
  });
  $('#SolDBHolder').fadeIn();
  }











  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero if needed
    const year = date.getFullYear(); // Get full year

    return `${day}/${month}/${year}`;
}

const closeModal =(id)=>{
    $(`#${id}`).fadeOut();
}
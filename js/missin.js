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

    ReadFrom("Miluim_new",(data)=>{
        console.log('from call back' , data);
        SOLIDERS = data;
        data==null?SOLIDERS=[]:SOLIDERS=data;
        
    })
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
    return elapsedMilliseconds / missionWeight; // Assuming weight represents mission duration
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
    <button style="width:65px; font-size:16px; margin-right:5px;"  id="F-${i}" class="btn-ez-effect">מצא שיבוץ</button>   
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
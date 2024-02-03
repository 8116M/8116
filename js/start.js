
// --* to load entire json file need to use it *--///
//******************************************************* 
// const loadThis =()=>{
//     ref = firebase.database().ref("Miluim");
//     Save2(soldiers);

    
// }

GlobalDATA=[];

const init = ()=>{

  ReadFrom('Miluim');
  $('#TableHolder').hide();
  $('#MainShow-section').hide();
  $('#header-section').hide();
  $('#About').hide();

  if (sessionStorage.getItem('isAllow')) {
    $('#Block').fadeOut();
    $('#MainShow-section').fadeIn();
    $('#header-section').fadeIn();
    const MODE = sessionStorage.getItem('MODE')
    if (MODE=='table') {
      setTimeout(SwitchToTable,300) 
    }
    else {
      SwitchtoCard()
    }
  }
  document.getElementById('passIN').addEventListener('keypress',(e)=>{
    const userpassIN = e.srcElement.value;
    if (e.keyCode==13) {
      const collection = firebase.database().ref('pass');
      collection.on("value", (snapshot) => {
        const data = snapshot.val();
        if (userpassIN==data.pass) {
          sessionStorage.setItem('isAllow',true);
          $('#Block').fadeOut();
          $('#TableHolder').fadeIn();
          $('#MainShow-section').fadeIn();
          $('#header-section').fadeIn();
          
        }
      });
    }
  })
}
const loadRender=(data)=>{
  //console.log('LoadRender',data);
  document.getElementById('MainShow-section').innerHTML='';

  for (let i = 0; i < data.length; i++) {
    const solider = data[i];
    RenderOneCard(solider,i);
  }


}
//Render
const RenderOneCard=(Onesolider,index)=>{
let iconHtml = `<img class="iconVe" src="./assets/vegan.png" alt="">`;
let str= `<div class="cardSolider"><img  src="./assets/solider-removebg-preview.png" alt="">`;

if (Onesolider.foodPref=='צמחוני' || Onesolider.foodPref=='טבעוני') {
  str+=iconHtml;
}
str+=`<div class="contentCard">
    <p class="personNumber">${Onesolider.personalNumber}</p>
    <p class="name">${Onesolider.name}</p>
    <a href="">${Onesolider.email}</a>
    <p>${Onesolider.phone}</p>
    <p>${Onesolider.weapon}: (${Onesolider.isRight?'ימין':'שמאל'}) נשק</p>
    <p>${Onesolider.job}</p>
    <p>${Onesolider.education}</p>
</div>
<div class="buttons">
    <button id="X-${Onesolider.name}" onclick="deleteSolider(this.id)" class="btn-X-effect">מחיקה</button>
    <button onclick="UpdateHandler(this.id)" id="U-${index}" class="btn-ok-effect">עריכה</button>
</div>

</div>`;


document.getElementById('MainShow-section').innerHTML+=str;
$('#phMain').fadeIn(1500);
}

const MegaFilter=(str)=>{
  let localArr=[]
  for (let i = 0; i < GlobalDATA.length; i++) {
    const solider = GlobalDATA[i];
    if (solider.name.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.personalNumber.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.education.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.email.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.foodPref.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.job.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.phone.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.shoeSize.toString().includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.uniformSize.includes(str)) {
      localArr.push(solider);
      continue;
    }
    if (solider.weapon.includes(str)) {
      localArr.push(solider);
      continue;
    }
    
  }
  return localArr;
  // const result = words.filter((word) => word.length > 6);

}

const changeInput =()=>{
  let str = document.getElementById('searchBar').value;
  console.log('change?',str);
  if (str=='') {
    loadRender(GlobalDATA);
    return;
  }
  let res = MegaFilter(str);
  loadRender(res);
}

const SwitchToTable = ()=>{
  sessionStorage.setItem('MODE','table');
  RenderTable();
  $('#tableBTN').fadeOut();
  new DataTable('#DB-Table',{
    order: [[0, 'desc']]
  });
  $('#MainShow-section').fadeOut();
  $('#TableHolder').fadeIn();
  $('#searchBarBTN').fadeOut();
  $('#searchBar').fadeOut();

}
const SwitchtoCard=()=>{
  sessionStorage.setItem('MODE','card');
  $('#TableHolder').fadeOut();
  $('#MainShow-section').fadeIn();
  $('#tableBTN').fadeIn();
  $('#searchBarBTN').fadeIn();
  $('#searchBar').fadeIn();
}

const RenderTable=()=>{
  console.log('in render table ',GlobalDATA);
  let str =`<table id="DB-Table" class="display" style="width:100%">
  <thead>
  <tr>
      <th>מספר אישי</th>
      <th>שם מלא</th>
      <th>כתובת מייל</th>
      <th>מס טלפון</th>
      <th>נשק</th>
      <th>עבודה</th>
      <th>השכלה</th>
      <th>?צמחוני</th>
      <th>פעולות</th>


  </tr>
</thead>
<tbody>`;

for (let i = 0; i < GlobalDATA.length; i++) {
  const solider = GlobalDATA[i];
  let isvegen = solider.foodPref == 'הכל'?'לא':'כן';
  if (solider.foodPref == '') {
    isvegen = '';
  }
  str+=`<tr>
  <td>${solider.personalNumber}</td>
  <td>${solider.name}</td>
  <td>${solider.email}</td>
  <td>${solider.phone}</td>
  <td>${solider.weapon}</td>
  <td>${solider.job}</td>
  <td>${solider.education}</td>
  <td>${isvegen}</td>
  <td>  <button style="width:75px; font-size:16px; margin-right:5px;" onclick="UpdateHandler(this.id)" id="U-${i}" class="btn-ok-effect">עריכה</button><button style="width:75px;font-size:16px; margin-left:5px;" id="X-${solider.name}" onclick="deleteSolider(this.id)" class="btn-X-effect">מחיקה</button></td>
</tr>`
}
  str+=`</tbody>`;
  str+=`<tfoot>
  <tr>
  <th>מספר אישי</th>
  <th>שם מלא</th>
  <th>כתובת מייל</th>
  <th>מס טלפון</th>
  <th>נשק</th>
  <th>עבודה</th>
  <th>השכלה</th>
  <th>?צמחוני</th>
  <th>פעולות</th>
</tr>
</tfoot>
`;
document.getElementById('DT-PH').innerHTML = str;
}

const UpdateHandler =(id)=>{
  let idDataPass = id.replace('U-','');
  console.log('you click me ', idDataPass);
  sessionStorage.setItem('Data',idDataPass);
  window.location.assign('./RegisterForm.html');

}

const deleteSolider=(id)=>{
  Swal.fire({
    title: "? האם אתה בטוח שתרצה למחוק",
    text: "מחיקה של נתונים אלא תהווה מחיקה לצמיתות ולא יהיה ניתן לשחזר את המידע",
    icon: "warning",
    confirmButtonText:'מחיקה',
    showDenyButton:true,
    denyButtonText:'ביטול'
  }).then((result)=>{
    if (result.isConfirmed) {
      const ID = id.replace("X-",'');
      let tempData =[];
      for (let i = 0; i < GlobalDATA.length; i++) {
        const solider = GlobalDATA[i];
        if (solider.name!=ID) {
          tempData.push(solider);
    
        }
        
      }
      GlobalDATA = tempData;
      console.log(ID,GlobalDATA)
      Save2(GlobalDATA);
    }
  })

}

const moveTo = (url)=>{
  sessionStorage.setItem('Data',null);
  location.assign(url);
}

const aboutToggle=(flag=true)=>{
  if (flag) {
    $('#TableHolder').hide();
    $('#MainShow-section').hide();
    $('#About').fadeIn();

  }
  else {
    $('#About').hide();
    $('#MainShow-section').fadeIn();
    
  }
}

//////////////FireBase
// const SaveOneSolider = (json) => {
//     ref.child(json.personalNumber+'---'+json.name).set(json);
//   };
  
const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      //console.log('From readFrom',data);
      GlobalDATA = data;
      // console.log(Object.keys(data).length)
      loadRender(data);
    });
};

// const Save = (value) => {
//   ref = firebase.database().ref("Miluim");
//   ref.child('Miluim').set(value);
// };
const Save2=(value)=>{
  ref = firebase.database().ref("Miluim");
  ref.set(value);
}

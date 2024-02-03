GlobalDATA=[];
FUNC = 'edit';
const init = ()=>{
    ReadFrom('Miluim')
    let soliderIndex = sessionStorage.getItem('Data');
    setTimeout(()=>{
        if (soliderIndex==undefined || soliderIndex==null || soliderIndex==''||soliderIndex=='null') {
            FUNC = 'new';
        }
        else{
            FUNC = 'edit';
            RenderDetails(soliderIndex);
        }
    },500)

    
}

const submitHandler=()=>{

    let name = $('#Sol-Name').val();
    let personalNumber = $('#Sol-personalNumber').val();
    let mail = $('#Sol-mail').val();
    let phone = $('#Sol-phone').val();
    let Job = $('#Sol-Job').val();
    let Education = $('#Sol-Education').val();
    let uniformSize = $('#Sol-uniformSize').val();
    let shoeSize = $('#Sol-shoeSize').val();
    let isRight = document.getElementById('isRight').checked;
    let isLeft = document.getElementById('isLeft').checked;
    let all =  document.getElementById('all').checked;
    let veg = document.getElementById('veg').checked;
    let vegy = document.getElementById('vegy').checked;
    let tar = document.getElementById('tar').checked;
    let mictar = document.getElementById('mictar').checked;
    let M16 = document.getElementById('M16').checked;
    let negev = document.getElementById('negev').checked;
    let matol = document.getElementById('matol').checked;
    let sniper = document.getElementById('sniper').checked;
    let mag = document.getElementById('mag').checked;
    let kala = document.getElementById('kala').checked;

    let con1 = name =='' || personalNumber==''||mail==''||phone==''||Job=='' ||Education==''||uniformSize==-1
    let con2 = tar==false && mictar==false && M16==false && negev==false && matol==false && sniper==false&& mag ==false && kala==false;
    if (con1) {
        Swal.fire({
            title: "..חסר משהו",
            text: "לא מילאת את כל השדות",
            icon: "error"
        });
        return;
    }
    else if (con2) {
        Swal.fire({
            title: "..פספסת משהו",
            text: "חייב לסמן לפחות נשק אחד שהוסמכת עליו",
            icon: "error"
        });
        return;
    }
    const solider={};
    solider.name=name;
    solider.personalNumber=personalNumber;
    solider.email = mail;
    let weaponStr = ``;
    let sep = ' ';
    if (tar) {
        weaponStr+='תבור';
        weaponStr+=sep;
    }
    if (mictar) {
        weaponStr+='מיקרו-תבור';
        weaponStr+=sep;

    }
    if (negev) {
        weaponStr+='נגב';
        weaponStr+=sep;

    }
    if (M16) {
        weaponStr+='M16';
        weaponStr+=sep;

    }
    if (matol) {
        weaponStr+='מטול';
        weaponStr+=sep;

    }
    if (sniper) {
        weaponStr+='נשק צלפים';
        weaponStr+=sep;

    }
    if (mag) {
        weaponStr+='מאג';
        weaponStr+=sep;

    }
    if (kala) {
        weaponStr+='נשק קלע';
        weaponStr+=sep;

    }
    solider.weapon = weaponStr;
    if (isLeft) {
        solider.isRight=false;
    } else if(isRight) {
        solider.isRight=true;
    }
    solider.shoeSize=shoeSize
    solider.uniformSize=uniformSize;
    if (all) {
        solider.foodPref = 'הכל';
    } else if (veg) {
        solider.foodPref = 'צמחוני';

    } else if (vegy) {
        solider.foodPref = 'טבעוני';

    } 
    solider.job = Job;
    solider.phone = phone;
    solider.education = Education;

    //console.log(solider);
    if (FUNC=='new') {
        GlobalDATA.push(solider);
        Save(GlobalDATA);
        // Swal.fire({
        //     title: "ההרשמה בוצע בהצלחה",
        //     text: "הנתונים שלך נשמרו , כעת תוכל לצאת מהאתר אם זה לא קרה באופן אוטמטי",
        //     icon: "success"
        // });
        Swal.fire({
            title: "ההרשמה בוצעה בהצלחה",
            text: "הנתונים שלך נשמרו, כעת תוכל לצאת מהאתר אם זה לא קרה באופן אוטומטי",
            icon: "success"
        }).then((result) => {
            // Check if the user clicked the "OK" button
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                if (FUNC=='new') {
                // Close the page
                window.close();
                location.assign('https://www.miluim.idf.il/')
                }
    
            }
        });
    }
    else if (FUNC=='edit') {
        let soliderIndex = sessionStorage.getItem('Data');
        for (let i = 0; i < GlobalDATA.length; i++) {
            const s = GlobalDATA[i];
            if (i==soliderIndex) {
                GlobalDATA[i] = solider;
                Save(GlobalDATA);
                Swal.fire({
                    title: "העדכון בוצע בהצלחה",
                    text: "פרטי החייל התעדכנו בהצלחה ",
                    icon: "success"
                }).then(()=>{
                    location.replace('./index.html');
                })
            }
            
        }
    }


    

}
const Save = (value) => {
    ref = firebase.database().ref("Miluim");
    ref.set(value);
  };

const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      GlobalDATA = data;
      //console.log(GlobalDATA)
      // console.log(Object.keys(data).length)
    });
  };
  const RenderDetails=(index)=>{
    let solider = GlobalDATA[index];
    //console.log('in Render',index,solider);
    document.getElementById('headerTitle').innerHTML = `טופס עריכת חייל-${solider.name}`;
    document.getElementById('SubmitForm').innerHTML = 'עדכן חייל';
    $('#Sol-Name').val(solider.name);
    $('#Sol-personalNumber').val(solider.personalNumber);
    $('#Sol-mail').val(solider.email);
    $('#Sol-phone').val(solider.phone);
    $('#Sol-Job').val(solider.job);
    $('#Sol-Education').val(solider.education);
    
    $('#Sol-shoeSize').val(solider.shoeSize);

    if (solider.isRight) {
        document.getElementById('isRight').checked = true;
    }
    else{
        document.getElementById('isLeft').checked = true;
    }
    if (solider.foodPref=='הכל'||solider.foodPref=='הכול') {
        document.getElementById('all').checked =true;
    }
    else if (solider.foodPref=='צמחוני'||solider.foodPref=='צימחוני'){
        document.getElementById('veg').checked =true;

    }
    else if (solider.foodPref=='טבעוני'||solider.foodPref=='טיבעוני'){
        document.getElementById('veg').checked =true;

    }

    if (solider.weapon.includes('תבור')) {
        document.getElementById('tar').checked=true
    }
     if (solider.weapon.includes('מיקרו')) {
        document.getElementById('mictar').checked=true
    }
    if (solider.weapon.includes('נגב')) {
        document.getElementById('negev').checked=true
    }
    if (solider.weapon.includes('מאג')) {
        document.getElementById('mag').checked=true;
    }
    if (solider.weapon.includes('צלפים')||solider.weapon.includes('צלף')) {
        document.getElementById('sniper').checked=true
    }
    if (solider.weapon.includes('קלע')) {
        document.getElementById('kala').checked=true
    }
    if (solider.weapon.includes('מטול')) {
        document.getElementById('matol').checked=true
    }
    if (solider.weapon.includes('16')) {
        document.getElementById('M16').checked=true;
    }

    
    if (solider.uniformSize.includes('ק')) {
        $('#Sol-uniformSize').val('ק');
    }
    if (solider.uniformSize.includes('ב')) {
        $('#Sol-uniformSize').val('ב');
    }
    if (solider.uniformSize.includes('ג')) {
        $('#Sol-uniformSize').val('ג');
    }
    if (solider.uniformSize.includes('מ')) {
        $('#Sol-uniformSize').val('מ');
    }
    if (solider.uniformSize.includes('ממ')) {
        $('#Sol-uniformSize').val('ממ');
    }
    $("#Sol-Name").prop('disabled', true);
    $("#Sol-personalNumber").prop('disabled', true);

  }
  function checkNumberFieldLength(elem,num){
    if (elem.value.length > 4) {
        elem.value = elem.value.slice(0,4); 
    }
  }

  const UnlockThis=(id) =>{
    const input = document.getElementById(id);
    if (input.disabled) {
        let number = ez.rand(1000,9999);
        Swal.fire({
          title: `<strong>כדי לאמת את הפעולה הכנס את המספר ${number}</strong>`,
          icon: "info",
          html: `<input oninput="checkNumberFieldLength(this,${number});" maxlength="4" max="9999" min="1000" type="number" name="" id="confirmNumberIN">`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `אשר`,
          confirmButtonAriaLabel: "Thumbs up, great!",
          cancelButtonText: `בטל`,
          cancelButtonAriaLabel: "Thumbs down",
    
        }).then((result)=>{
            if (result.isConfirmed) {
                //console.log('confirm!!',result)
                if ($('#confirmNumberIN').val()==number) {
                    input.disabled = false;
                }
            }
        })
    }
    else {
        input.disabled=true;
    }

   
  }

  const aboutToggle=(flag=true)=>{
    if (flag) {

      $('#Form-Section').hide();
      $('#About').fadeIn();
  
    }
    else {
      $('#About').hide();
      $('#Form-Section').fadeIn();
      
    }
  }
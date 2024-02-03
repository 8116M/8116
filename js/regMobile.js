
GlobalDATA = [];

const init = () => {
    ReadFrom('Miluim_new')
}

const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      GlobalDATA = data;
      console.log(GlobalDATA)
      // console.log(Object.keys(data).length)
    });
  };


const suckObject = () => {
    // personalNum
    // fullName
    // phone
    // email
    // job
    // birthDay
    // ArmyDate
    // shoe

    let personalNum = document.getElementById('personalNum').value;
    let fullName = document.getElementById('fullName').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let job = document.getElementById('job').value;
    let birthDay = document.getElementById('birthDay').value;
    let ArmyDate = document.getElementById('ArmyDate').value;
    let shoe = document.getElementById('shoe').value;
    let uniform = document.getElementById('uniform').value;
    let title = document.getElementById('title').value;


    let isVeg = document.getElementById('isVeg').checked;
    let isStudent = document.getElementById('isStudent').checked;
    let tar = document.getElementById('tar').checked;
    let mictar = document.getElementById('mictar').checked;
    let M16 = document.getElementById('M16').checked;
    let negev = document.getElementById('negev').checked;
    let matol = document.getElementById('matol').checked;
    let sniper = document.getElementById('sniper').checked;
    let mag = document.getElementById('mag').checked;
    let kala = document.getElementById('kala').checked;





    const solider = new Solider(personalNum,fullName,phone,email,job,birthDay,ArmyDate,shoe,uniform,title,isVeg,isStudent,tar,mictar,M16,negev,matol,mag,sniper,kala);
    const bool = solider.validation();
    console.log(solider);
    if (!bool) {
        //swal
        Swal.fire({
            title: "..חסר משהו",
            text: "לא מילאת את כל השדות",
            icon: "error"
        });
    }
    else {
        
        //swal.then() --> send firebase.
        GlobalDATA.push(solider)
        Save(GlobalDATA);
        Swal.fire({
            title: "ההרשמה בוצעה בהצלחה",
            text: "הנתונים שלך נשמרו, כעת תוכל לצאת מהאתר אם זה לא קרה באופן אוטומטי",
            icon: "success"
        }).then(()=>{
            window.close();
        })

    }

    
}


const submitHandlerMobile = () =>{
    suckObject();
}

const Save = (value) => {
    ref = firebase.database().ref("Miluim_new");
    ref.set(value);
  };


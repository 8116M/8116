
GlobalDATA = [];

const init = () => {
    ReadFrom('Miluim_new');
    populateCities();
}

const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      GlobalDATA = data;
      GlobalDATA==null?GlobalDATA=[]:GlobalDATA=data;
      if (typeof(GlobalDATA)=='object') {
        GlobalDATA = Object.values(GlobalDATA);
      }
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
    let class1 = document.getElementById('class1').value;

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
    let medic = document.getElementById('medic').checked;
    let city =document.getElementById('cityInput').value
    let isbusWay = document.getElementById('busWay');
    let iscarWay = document.getElementById('carWay');

    let davidDriver  = document.getElementById('davidDriver');
    let zeevDriver = document.getElementById('zeevDriver');
    let heavyDriver = document.getElementById('heavyDriver');




    const solider = new Solider(personalNum,fullName,phone,email,job,birthDay,ArmyDate,shoe,uniform,title,isVeg,isStudent,tar,mictar,M16,negev,matol,mag,sniper,kala,medic,class1,city,davidDriver,zeevDriver,heavyDriver,isbusWay,iscarWay);
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
        console.log(GlobalDATA);
        Save(GlobalDATA);
        Swal.fire({
            title: "ההרשמה בוצעה בהצלחה",
            text: "הנתונים שלך נשמרו, כעת תוכל לצאת מהאתר אם זה לא קרה באופן אוטומטי",
            icon: "success"
        }).then(()=>{
            window.close();
            window.location.href='https://www.google.com';

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






  
  // Function to populate the datalist with cities
  function populateCities() {
      const israelCities= [
        "ירושלים",
        "תל אביב-יפו",
        "חיפה",
        "באר שבע",
        "ראשון לציון",
        "פתח תקווה",
        "אשדוד",
        "חולון",
        "נתניה",
        "בני ברק",
        "רמת גן",
        "רחובות",
        "כפר סבא",
        "מודיעין-מכבים-רעות",
        "נהריה",
        "אשקלון",
        "פתח תקווה",
        "קריית אתא",
        "רמלה",
        "גבעתיים",
        "הרצליה",
        "מודיעין עילית",
        "קריית גת",
        "עפולה",
        "קריית ים",
        "ראש העין",
        "נס ציונה",
        "קריית מוצקין",
        "יבנה",
        "בית שמש",
        "רמת השרון",
        "אופקים",
        "לוד",
        "נוף הגליל",
        "קריית ביאליק",
        "דימונה",
        "שדרות",
        "מעלות-תרשיחא",
        "טירת הכרמל",
        "ערד",
        "מגדל העמק",
        "בית שאן",
        "ירוחם",
        "כרמיאל",
        "סח'נין",
        "אילת",
        "גבעת שמואל",
        "אור עקיבא",
        "ג'סר א-זרקא",
        "טייבה",
        "קלנסווה",
        "עראבה",
        "רכסים",
        "פרדס חנה-כרכור",
        "קריית מלאכי",
        "מודיעין עילית"
    ];
    var dataList = document.getElementById('cities');
    israelCities.forEach(function(city) {
      var option = document.createElement('option');
      option.value = city;
      dataList.appendChild(option);
    });
  }


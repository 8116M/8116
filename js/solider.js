class Solider {
    constructor(personalNum,fullName,phone,email,job,birthDay,ArmyDate,shoe,uniform,title,isVeg,isStudent,tar,mictar,M16,negev,matol,mag,sniper,kala,medic,class1,city,isDavidDriver,isZeevDriver,isHeavyDriver,isbusWay,iscarWay){
        this.personalNum=personalNum;
        this.fullName=fullName;
        this.phone=phone;
        this.email=email;
        this.job=job;
        this.birthDay=birthDay;
        this.ArmyDate=ArmyDate;
        this.shoe=shoe;
        this.uniform = uniform
        this.title = title
        this.isVeg = isVeg
        this.isStudent = isStudent
        this.tar = tar
        this.mictar = mictar
        this.M16 = M16
        this.negev = negev
        this.matol = matol
        this.mag = mag
        this.sniper = sniper
        this.kala = kala
        this.medic = medic;
        this.class1 = class1;
        this.City = city;
        this.isDavidDriver = isDavidDriver;
        this.isHeavyDriver = isHeavyDriver;
        this.isZeevDriver = isZeevDriver;
        this.isbusWay = isbusWay;
        this.isCarWay = iscarWay;
        this.lastM={
            Allthetime: '',
            CommandorsAmount: '',
            DateEnd:'' ,
            DateStart: '',
            Dur: '',
            Name: "",
            SolidersAmount:'' ,
            Weight: '',
            key: ''
        }

    }
    validation(){
        if (this.ArmyDate=='' || this.ArmyDate == null) {
            return false;
        }
        if (this.personalNum=='' || this.personalNum == null) {
            return false;
        }
        else{
            this.personalNum = parseInt(this.personalNum);
        }
        if (this.fullName=='' || this.fullName == null) {
            return false;
        }
        if (this.phone=='' || this.phone == null ) {
            return false;
        }
        if (!this.isbusWay && !this.isCarWay) {
            return false;
        }
        if (this.email=='' || this.email == null) {
            return false;
        }
        if (this.City=='' || this.City == null) {
            return false;
        }
        if (this.job=='' || this.job == null) {
            return false;
        }
        if (this.birthDay=='' || this.birthDay == null) {
            return false;
        }
        if (this.shoe=='' || this.shoe == null) {
            return false;
        }
        else {
            this.shoe = parseInt(this.shoe);
        }
        if (!this.M16 &&!this.kala && !this.mag && !this.matol && !this.mictar && !this.negev && !this.sniper && !this.tar ) {
            return false;
        }
        return true;
    }



    
}



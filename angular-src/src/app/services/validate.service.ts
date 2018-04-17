import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }


  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.email == undefined ||
    user.password == undefined || user.password2 == undefined ||
  user.security == undefined || user.answer == undefined ){
    return false;
  } else{
    return true;
  }
  }



  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  validateAddCustomer(user1){
    if(user1.customername == undefined || user1.DeviceName == undefined || user1.DeviceId == undefined ||
    user1.Dop == undefined || user1.totalamount == undefined ||
  user1.balanceamount == undefined || user1.chargepd == undefined ){
    return false;
  } else{
    return true;
  }
  }
  
    //contactus validation
  validateContactus(contus){
    if(contus.firstname == undefined || contus.lastname == undefined || contus.email == undefined ||
    contus.phonenumber == undefined || contus.message == undefined ){
    return false;
  } else{
    return true;
  }

}

validatePassword(password,password2){
   if(password2!=password){
      return false;
    }
    else{
      return true;
    }
  }

}

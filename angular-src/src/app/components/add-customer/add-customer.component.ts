import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
 
  customername: String;
  DeviceName: String;
  DeviceId: String;
  Dop: String;
  totalamount: String;
  balanceamount: String;
  chargepd: String;
  
  
  
  
datePickerConfig:Partial<BsDatepickerConfig>;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.datePickerConfig=Object.assign({},
    {
      minDate:new Date(1976,0,1),
      maxDate:new Date(Date()+1)

      
    });
    
   }

  ngOnInit() {
  }
  
 onAddCustomerSubmit(){
    const user1 = {
      customername: this.customername,
      DeviceName: this.DeviceName,
      DeviceId: this.DeviceId,
      Dop: this.Dop,
      totalamount: this.totalamount,
      balanceamount:this.balanceamount,
      chargepd: this.chargepd
      
    }
    
    //required fields
   if(!this.validateService.validateAddCustomer(user1)){
    this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }



//add customer
this.authService.add_customerUser1(user1).subscribe(data => {
  console.log(data);
  if(data.success) {
    this.flashMessage.show('customer added', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/dashboard']);
  } else {
    this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/add_customer']);
  }
});


  }   

}

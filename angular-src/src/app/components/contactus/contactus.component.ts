import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  DeviceId: String;
  device_name: String;
  AgentUsername: String;
  message: String;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onContactusSubmit(){
  const contus = {
    DeviceId: this.DeviceId,
    device_name: this.device_name,
    AgentUsername: this.AgentUsername,
    message: this.message
   
  }

   //required fields
   if(!this.validateService.validateContactus(contus)){
    this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }



//add customer
this.authService.contactusContus(contus).subscribe(data => {
  console.log(data);
  if(data.success) {
    this.flashMessage.show('Feedback/message is sent', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/contactus']);
  } else {
    this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/contactus']);
  }
});



}

}

import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
 
datePickerConfig:Partial<BsDatepickerConfig>;

  constructor() {
    this.datePickerConfig=Object.assign({},
    {
      minDate:new Date(1976,0,1),
      maxDate:new Date(Date()+1)

      
    });
    
   }

  ngOnInit() {
  }

}

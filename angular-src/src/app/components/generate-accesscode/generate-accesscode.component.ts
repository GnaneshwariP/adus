import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../../Task';
@Component({
  selector: 'app-generate-accesscode',
  templateUrl: './generate-accesscode.component.html',
  styleUrls: ['./generate-accesscode.component.css']
})
export class GenerateAccesscodeComponent implements OnInit {
tasks: Task[];
  constructor(private taskService:TaskService){
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.tasks = tasks;
    });
}

  ngOnInit() {
  }
  myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i,td1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[2];
     if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || td1.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
     } 
     
}

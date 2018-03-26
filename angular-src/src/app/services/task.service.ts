import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('Task Service Initialized...');
    }

    getTasks(){
        return this.http.get('http://localhost:4000/users/generate_access_code')
            .map(res => res.json());
    }
}
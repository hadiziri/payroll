import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userUrl = 'http://10.100.105.81:8080/';
  private pmUrl = 'http://10.100.105.81:8080/api/test/pm';
  private adminUrl = 'http://10.100.105.81:8080/api/test/admin';

  constructor(private http: HttpClient) { }

  updatePsw(user:User): Observable<User> {
    return this.http.post<User>(this.userUrl+"updatePsw",user).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
   
  
  }
  }





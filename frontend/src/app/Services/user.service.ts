import { PayMonth } from './../Models/PayMonth';
import { CommunService } from './commun.service';
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


  private userUrl:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.userUrl=communService.getHost();
   }

  updatePsw(user:User): Observable<User> {
    return this.http.post<User>(this.userUrl+"updatePsw",user).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  comparePsw(user:User): Observable<User> {
    return this.http.post<User>(this.userUrl+"comparePsw",user).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  getCurrentMonth():Observable<PayMonth>{
    return this.http.get<PayMonth>(this.userUrl+"getCurrentMonth").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  deleteAllSwap():Observable<PayMonth>{
    return this.http.get<PayMonth>(this.userUrl+"deleteAllSwap").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  }





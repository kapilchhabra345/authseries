import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  // / message of global error 
   errorsMsgs = {
     UNKNOWN:'An UnKnown Error is Occured',
     EMAIL_EXISTS:'The email is already Exist. Please try with another email.',
     OPERATION_NOT_ALLOWED:'Password sign-in is disabled for this project.',
     TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later',
    
     EMAIL_NOT_FOUND:' There is no user record corresponding to this identifier. The user may have been deleted',
    INVALID_PASSWORD: 'The password is invalid or the user does not have a password',
    USER_DISABLED: 'The user account has been disabled by an administrator'
    }


    // method of global error 
    handleError(err:HttpErrorResponse){
      if(!err.error || !err.error.error)
      {
      //  this.error = this.errMsgs['UNKNOWN']
      return throwError(this.errorsMsgs['UNKNOWN'])
      }
      else{
        // this.error =  this.errMsgs[err.error.error.message];
        return throwError(this.errorsMsgs[err.error.error.message])
      }
    }


}

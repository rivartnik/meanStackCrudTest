import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export class ErrorInterceptor implements HttpInterceptor{
  intercept(req:HttpRequest<any>, next:HttpHandler){
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.error){
          if(error.error.message){
            alert(error.error.message);
          }else{
            alert(error.message);
          }
        }else{
          alert(error.message);
        }

        return throwError(error);
      })
    );
  }
}

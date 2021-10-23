import { Injectable } from '@angular/core';
import { Bucket,Location,File } from '../interfaces/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = environment.endpoint+ '/bucket';
  selectedBucket!: Bucket ;

  constructor(private http: HttpClient) { }

  //adding bucket to DB
  addBuckets(data:any): Observable<any> {
    let API_URL = this.endpoint+`/add-bucket`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  //getting all buckets from DB
  getBuckets() {
    return this.http.get<Bucket[]>(this.endpoint+`/get-buckets`);
  }
  getLocations() {
    return this.http.get<Location[]>(this.endpoint+`/get-locations`);
  }

  //delete bucket
  deleteBucket(id:String): Observable<any> {
    var API_URL = this.endpoint+`/delete-bucket/`+id;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  addFile(data:any): Observable<any> {
    //poslat moramo formdata ker file ne moramo poslat kot JSON
    const postData=new FormData();
    postData.append('name', data.name);
    postData.append('file', data.file);
    postData.append('id_bucket', data.id_bucket);
    postData.append('last_modified', data.last_modified);
    postData.append('size', data.size);
    let API_URL = this.endpoint+`/add-file`;
    return this.http.post(API_URL, postData)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getFiles(id: string) {
    return this.http.get<File[]>(this.endpoint+`/get-files/`+id);
  }
  getFilesSize(id: string) {
    return this.http.get<number>(this.endpoint+`/get-files-size/`+id);
  }
  deleteFiles(id: string) {
     return this.http.delete(this.endpoint+`/delete-files/`+id).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

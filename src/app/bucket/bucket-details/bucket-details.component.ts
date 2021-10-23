import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Bucket, File} from "../../shared/interfaces/common";

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.scss']
})
export class BucketDetailsComponent implements OnInit {
  bucketDetails: Bucket | undefined;
  constructor(private apiService:ApiService) { }
  totalSize:number=0
  ngOnInit(): void {
    this.bucketDetails=this.apiService.selectedBucket;
    this.apiService.getFilesSize( this.bucketDetails._id).subscribe((data:number) => {
      this.totalSize=data
    })
  }

}

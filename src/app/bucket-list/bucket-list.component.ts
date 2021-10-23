import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {Bucket} from "../shared/interfaces/common";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent implements OnInit {
  buckets: Bucket[] = [];
  addNewData = false;
  showSpinner=true;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getBuckets()
  }

  getBuckets() {
    this.apiService.getBuckets().subscribe((data: Bucket[]) => {
      this.buckets = data;
      this.showSpinner=false;
    })
  }

  addNewBucket(): void {
    this.addNewData = true;
  }
  newBucketInserted(event:any): void {
    if(!event.addAnother){
      this.addNewData = false;
    }
    this.buckets.push({_id:event.bucketID, name:event.name, location:event.location});

  }
  changeSpinner(event:boolean){
    this.showSpinner=event;
  }

  getDetailsData(bucket: Bucket): void {
    this.apiService.selectedBucket = bucket;
    this.router.navigate(['/bucket/files']);
  }

}

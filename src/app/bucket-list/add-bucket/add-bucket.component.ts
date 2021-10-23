import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "../../shared/interfaces/common";

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss']
})
export class AddBucketComponent implements OnInit {
  @Output() onSave=new EventEmitter<any>();
  @Output() saving= new EventEmitter<any>()
  locations: Location[] = [];
  newBucketForm = new FormGroup({
    bucketName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    addAnother:new FormControl('')
  });

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getLocations().subscribe((data: Location[]) => {
      this.locations = data;
    })
  }

  createBucket(): void {
    this.saving.emit(true);
    let location=this.newBucketForm.get('location')!.value
    let addAnother=this.newBucketForm.get('addAnother')!.value
    let request = {
      _id: null,
      name: this.newBucketForm.get('bucketName')!.value,
      location: location._id
    }
    this.apiService.addBuckets(request).subscribe((response) => {
      console.log(response.message)
      this.newBucketForm.reset();
      this.onSave.emit({bucketID:response.bucketID, name:request.name, location: location,addAnother:addAnother });
      this.saving.emit(false);
    })
  }

}

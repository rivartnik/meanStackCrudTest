import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {Bucket} from "../shared/interfaces/common";
import {Router} from "@angular/router";
import {ModalComponent} from "../shared/components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  active = 1;
  currentRoute = 1
  showSpinner=false;
  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal) {
  }

  selectedBucket: Bucket | undefined

  ngOnInit(): void {
    this.selectedBucket = this.apiService.selectedBucket;
  }

  openModal() {
    this.modalService.open(ModalComponent).result.then((result) => {
      if (result) {
        this.deleteBucket()
      }
    }, (reason) => {
      console.log(reason)
    });
  }

  deleteBucket(): void {
    this.showSpinner=true;
    // @ts-ignore
    this.apiService.deleteBucket(this.selectedBucket._id).subscribe((response) => {
      this.showSpinner=false;
      this.router.navigate(["/bucket-list"])
    })
  }

}

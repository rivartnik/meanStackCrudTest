import {Component, OnInit} from '@angular/core';
import {Bucket, File} from "../../shared/interfaces/common";
import {ApiService} from "../../shared/services/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../shared/components/modal/modal.component";

@Component({
  selector: 'app-bucket-files',
  templateUrl: './bucket-files.component.html',
  styleUrls: ['./bucket-files.component.scss']
})
export class BucketFilesComponent implements OnInit {
  files: File[] = []
  // @ts-ignore
  base64Output: string
  showModal = false
  showSpinner=true;

  constructor(private apiService: ApiService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.apiService.getFiles(this.apiService.selectedBucket?._id).subscribe((data: File[]) => {
      this.files = data;
      this.showSpinner=false;
    })
  }

  onFilePicked(event: Event): void {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    const reader = new FileReader();
    //ko naloži file preberemo resulte
    reader.onload = () => {
      // @ts-ignore
      this.base64Output = reader.result
      this.saveFile(file);
    }
    // @ts-ignore
    reader.readAsDataURL(file);
  }

  deleteObject() {
    this.showSpinner=true;
    this.apiService.deleteFiles(this.apiService.selectedBucket._id).subscribe((response) => {
      this.files = [];
      this.showSpinner=false;
    })
  }

  openModal() {
    this.modalService.open(ModalComponent).result.then((result) => {
        if(result){
          this. deleteObject()
        }
    },(reason)=>{
      console.log(reason)
    });
  }

  saveFile(file: any) {
    this.showSpinner=true;
    let data = {
      file: file,
      name: file.name,
      id_bucket: this.apiService.selectedBucket?._id,
      last_modified: file.lastModifiedDate,
      size: file.size
    }
    this.apiService.addFile(data).subscribe((response) => {
      this.files.push({
        name: file.name,
        _id: response.id_file,
        last_modified: file.lastModifiedDate,
        size: file.size,
        id_bucket: this.apiService.selectedBucket?._id
      })
      this.showSpinner=false;
    })
  }

}

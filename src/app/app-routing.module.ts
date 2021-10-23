import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BucketListComponent} from "./bucket-list/bucket-list.component";
import {BucketComponent} from "./bucket/bucket.component";
import {BucketFilesComponent} from "./bucket/bucket-files/bucket-files.component";
import {BucketDetailsComponent} from "./bucket/bucket-details/bucket-details.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'bucket-list'},
  {path: 'bucket-list', component: BucketListComponent},
  {
    path: 'bucket', component: BucketComponent, children: [
      {
        path: '',
        redirectTo: 'files',
        pathMatch: 'full'
      },
      {
        path: 'files', component: BucketFilesComponent
      },
      {
        path: 'details', component: BucketDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

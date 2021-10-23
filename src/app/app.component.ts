import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private router:Router) {
    translate.setDefaultLang('en')
  }
  title = 'agendaProject';

  ngOnInit(): void {
    this.router.navigate(['/bucket-list']);

  }
}

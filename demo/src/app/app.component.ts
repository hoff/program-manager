import { Component, AfterViewInit } from '@angular/core'

// app
import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(
    public data: DataService
  ) {

  }
  ngAfterViewInit() {

    // this works via @Effect
    this.data.requestActivities()

    // without effect
    this.data.loadPrograms()
  }

}

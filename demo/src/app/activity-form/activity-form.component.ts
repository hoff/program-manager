// ng
import { Component, OnInit, Input } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

// app
import { DataService } from '../data.service'

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  @Input('programURL') programURL: string

  activityForm: FormGroup
  showMessages = false

  constructor(
    public data: DataService,
  ) {
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.activityForm = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),
      startDate: new FormControl('', {
      }),
      endDate: new FormControl('', {
      }),
    })
  }

  get name() { return this.activityForm.get('name') }

  /**
   * Triggers creation of an activity, or shows field validation warnings
   */
  submit(name, startDate, endDate) {
    if (this.activityForm.valid ) {
      this.data.createActivity(name, this.programURL, startDate, endDate)
    } else {
      this.showMessages = true
    }
  }

}

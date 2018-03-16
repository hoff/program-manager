// ng
import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http'

// rxjs
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

// ngrx
import { Store, select, Action } from '@ngrx/store'

// app
import { AppState, LOAD_PROGRAMS_SUCCESS, LOAD_ACTIVITIES_SUCCESS } from './reducers'

@Injectable()
export class DataService {

  // constants
  programURL = 'https://dev.toladata.io/api/workflowlevel1/'
  activityURL = 'https://dev.toladata.io/api/workflowlevel2/'
  token = 'Bearer tzKmvF5inSMU91Qa7LHM2XJckRazwn'

  // store subscriptions
  programs$
  activities$
  ui$

  constructor(
    public http: Http,
    private store: Store<AppState>,
  ) {
    this.programs$ = store.pipe(select('programs'));
    this.activities$ = store.pipe(select('activities'));
    this.ui$ = store.pipe(select('ui'))
  }

  loadPrograms() {
    this.http.get(this.programURL, this.getAuthorizedHeader()).subscribe(reply => {
      this.store.dispatch({type: LOAD_PROGRAMS_SUCCESS, payload: reply.json()})
    })
  }
  loadActivities() {
    this.http.get(this.activityURL, this.getAuthorizedHeader()).subscribe(reply => {
      this.store.dispatch({type: LOAD_ACTIVITIES_SUCCESS, payload: reply.json()})
    })
  }

  getAuthorizedHeader() {
    const headers = new Headers()
    headers.append('Authorization', this.token)
    const opts: RequestOptions = new RequestOptions()
    opts.headers = headers
    return opts
  }

}

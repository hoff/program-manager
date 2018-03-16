// ng
import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http'

// rxjs
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/combineLatest'


// ngrx
import { Store, select, Action } from '@ngrx/store'

// app
import { AppState, LOAD_PROGRAMS_SUCCESS, LOAD_ACTIVITIES_SUCCESS, SAVE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_SUCCESS } from './reducers'

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

  // content projection
  projection$ = new Subject()

  constructor(
    public http: Http,
    private store: Store<AppState>,
  ) {
    this.programs$ = store.pipe(select('programs'))
    this.activities$ = store.pipe(select('activities'))
    this.ui$ = store.pipe(select('ui'))

    // content projection
    Observable.combineLatest(
      this.programs$, this.activities$, (programs, activities) => {
        return [programs, activities]
      }
    ).subscribe((combined: any) => {
      const [prgms, acts] = combined
      const programs = prgms.map(program => {
        program.activities = []
        return program
      })
      for (const activity of acts) {
        const programIDparts = activity.workflowlevel1.split('/');
        const programID = parseInt(programIDparts[programIDparts.length - 2]);
        const program = programs.find(p => p.id === programID);
        if (!program) { return }
        program.activities.push(activity);
      }
      this.projection$.next(programs.slice(0))
    })

    // kick off initial loading
    this.loadActivities()
    this.loadPrograms()

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

  /**
   * Creates a new activity
   */
  createActivity(name, programID, startDate, endDate) {

    const params = {
      name: name,
      workflowlevel1: programID,
      expected_start_date: startDate ? new Date(startDate).toISOString() : undefined,
      expected_end_date: endDate ? new Date(endDate).toISOString() : undefined,
    }

    this.setLoading()
    this.http
      .post(this.activityURL, params, this.getAuthorizedHeader())
      .subscribe(reply => {
        this.store.dispatch({
          type: SAVE_ACTIVITY_SUCCESS,
          payload: reply.json()
        });
        this.unsetLoading()
      });
  }

  /**
   * Deletes an activity by its ID
   */
  deleteActivity(id) {
    const url = this.activityURL + id + '/'
    this.setLoading()
    this.http.delete(url, this.getAuthorizedHeader()).subscribe(reply => {
      this.store.dispatch({type: DELETE_ACTIVITY_SUCCESS, payload: {id: id}})
      this.unsetLoading()
    }, () => {
      alert('error deleting activity')
    })
  }


  getAuthorizedHeader() {
    const headers = new Headers()
    headers.append('Authorization', this.token)
    const opts: RequestOptions = new RequestOptions()
    opts.headers = headers
    return opts
  }

  setLoading() {
    this.store.dispatch({type: 'IS_LOADING', payload: true})
  }
  unsetLoading() {
    this.store.dispatch({type: 'IS_LOADING', payload: false})
  }

}

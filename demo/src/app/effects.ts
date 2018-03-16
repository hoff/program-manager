// ng
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

// app
import { DataService } from './data.service';
import { LOAD_ACTIVITIES_REQUESTED, LOAD_ACTIVITIES_ERROR, LOAD_ACTIVITIES_SUCCESS } from './reducers'

interface GenericAction extends Action {
  payload: any;
}

@Injectable()
export class ContentEffects {

  // Act on the 'LOAD_ACTIVITIES_REQUESTED' action
  @Effect()
  activity$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_ACTIVITIES_REQUESTED),
    mergeMap((action: GenericAction) =>
      this.data.getActivities().pipe(
        // If successful, dispatch success action with result
        map(data => ({
          type: LOAD_ACTIVITIES_SUCCESS,
          payload: data.json()
        })),
        // If request fails, dispatch failed action
        catchError(() => of({ type: LOAD_ACTIVITIES_ERROR }))
      )
    )
  );

  constructor(
    // ng
    private http: HttpClient,
    // ngrx
    private actions$: Actions,
    // app
    public data: DataService
  ) {}
}

// ngrx
import { Store, select, Action } from '@ngrx/store'

// programs
export const LOAD_PROGRAMS_REQUESTED = 'LOAD_PROGRAMS_REQUESTED'
export const LOAD_PROGRAMS_SUCCESS = 'LOAD_PROGRAMS_SUCCESS'
export const LOAD_PROGRAMS_ERROR = 'LOAD_PROGRAMS_ERROR'
// activities
export const LOAD_ACTIVITIES_REQUESTED = 'LOAD_ACTIVITIES_REQUESTED'
export const LOAD_ACTIVITIES_SUCCESS = 'LOAD_ACTIVITIES_SUCCESS'
export const LOAD_ACTIVITIES_ERROR = 'LOAD_ACTIVITIES_ERROR'
export const SAVE_ACTIVITY_SUCCESS = 'SAVE_ACTIVITY_SUCCESS'
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS'
// ui
export const IS_LOADING = 'IS_LOADING'

// interfaces
export interface AppState {
  programs: any[];
  activities: any[];
  ui: any
}


export interface GenericAction extends Action {
  payload: any
}

export function programReducer(state = [], action: GenericAction) {
  switch (action.type) {

    case LOAD_PROGRAMS_REQUESTED:
      return state

    case LOAD_PROGRAMS_SUCCESS:
      return action.payload;

    case LOAD_PROGRAMS_ERROR:
      return state;

    default:
      return state;
  }
}

export function activityReducer(state = [], action: GenericAction) {
  switch (action.type) {

    case LOAD_ACTIVITIES_REQUESTED:
      return state;

    case LOAD_ACTIVITIES_SUCCESS:
      return action.payload;

    case LOAD_ACTIVITIES_ERROR:
      return state;

    case SAVE_ACTIVITY_SUCCESS:
      return [...state, action.payload];

    case DELETE_ACTIVITY_SUCCESS:
      return state.filter(activity => activity.id !== action.payload.id);

    default:
      return state;
  }
}

export function uiReducer(state = { loading: false }, action: GenericAction) {
  switch (action.type) {
    case IS_LOADING:
      return Object.assign(state, { loading: action.payload });

    default:
      return state;
  }
}

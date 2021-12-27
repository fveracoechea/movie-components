import { BehaviorSubject, isObservable, Subject, merge } from "rxjs";
import { Epic, Dispatch, Action } from "./types";
import { createOfType } from "./operators";
import { distinctUntilChanged, map } from "rxjs/operators";
import isEqual from "lodash/isEqual";

type Inputs = Record<
  string,
  { initialState: any; epic: Epic<any>; onError?: (e: Error) => void }
>;

const getInitialState = <T extends Inputs>(inputs: T) => {
  const state = {} as {
    [Property in keyof T]: T[Property]["initialState"];
  };

  for (const prop in inputs) {
    if (inputs.hasOwnProperty(prop)) {
      const { initialState } = inputs[prop];
      state[prop] = initialState;
    }
  }

  return state;
};

export const createStore = <T extends Inputs>(epics: T) => {
  const initialStoreState = getInitialState(epics);
  const action$ = new Subject<Action>();
  const store$ = new BehaviorSubject(initialStoreState);

  const dispatch: Dispatch = (action) => {
    if (!action.type) {
      throw new Error("ReactEpic: Invalid action type");
    }
    action$.next(action);
  };

  const getState = () => {
    return store$.getValue();
  }

  for (const prop in epics) {
    if (epics.hasOwnProperty(prop)) {
      const { initialState, epic, onError } = epics[prop];
      const epicState$ = new BehaviorSubject<unknown>(initialState);
      const _state$ = epicState$.asObservable();

      const params = {
        action$: action$.asObservable(),
        state$: _state$,
        dispatch,
        ofType: createOfType(action$, _state$),
        merge,
        map
      };

      const epic$ = epic(params);
      if (!isObservable(epic$)) {
        throw new Error(`The ${prop} epic returns a invaid observable`);
      }

      epic$
        .pipe(
          distinctUntilChanged((prev, current) => {
            return isEqual(prev, current);
          })
        )
        .subscribe({
          next: (state) => epicState$.next(state),
          error: onError,
        });

      epicState$.subscribe((state) => {
        const currentState = store$.getValue();
        store$.next({
          ...currentState,
          [prop]: state,
        });
      });
    }
  }

  const store = { state$: store$.asObservable(), dispatch, getState, epics };

  return store;
};

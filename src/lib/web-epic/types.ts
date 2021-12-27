import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export type Action<P = unknown> = {
  type: string;
  payload?: P;
};

export type Dispatch<P = unknown> = (action: Action<P>) => void;

export type Action$<P = any> = Observable<Action<P>>;

export type State$<T> = Observable<T>;

export type Epic<S, P = unknown> = (params: {
  action$: Action$;
  state$: State$<S>;
  dispatch: Dispatch;
  merge: typeof merge;
  map: typeof map;
  ofType: <T = unknown>(actionType: string) => Observable<[Action<T>, S]>;
}) => Observable<S>;

export type Store<S = any> = {
  state$: Observable<S>;
  dispatch: Dispatch;
  epics: Record<
    string,
    { initialState: S; epic: Epic<S>; onError?: (e: Error) => void }
  >;
};

export type EpicsStore<S = any> = {
  state$: Observable<S>;
  dispatch: Dispatch;
  epics: Record<
    string,
    { initialState: S; epic: Epic<S>; onError?: (e: Error) => void }
  >;
};
import { filter, map, withLatestFrom } from "rxjs/operators";
import { Action$, State$, Action } from "./types";

export const createOfType =
  <S>(action$: Action$, state$: State$<S>) =>
  <P = unknown>(actionType: string) =>
    action$.pipe(
      filter((action: Action<P>) => action.type === actionType),
      withLatestFrom(state$)
    );

export const mapAction = <T>(
  actionType: string,
  mapFn: (action: Action) => T
) => {
  return map<Action, T | Action>((action) => {
    return actionType === action.type ? mapFn(action) : action;
  });
};

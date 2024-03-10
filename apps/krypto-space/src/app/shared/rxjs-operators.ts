import { OperatorFunction, catchError, startWith } from "rxjs";

export const catchSwitchMapError = <T, U, V>(
    errorAction: (error: V) => U
  ): OperatorFunction<T, T | U> =>
    catchError((error, innerSource) =>
      innerSource.pipe(startWith(errorAction(error)))
    );
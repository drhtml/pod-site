import * as _ from 'lodash';
import { catchError, of } from 'rxjs';

export const networkError = catchError<any, any>((err) => {
  const errorMessage = _.get(err, 'error.message');
  return of({
    message: errorMessage || 'Network error',
    success: false,
  });
});

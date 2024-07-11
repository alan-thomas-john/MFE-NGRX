import { Injectable } from "@angular/core";
import { Actions,ofType,createEffect } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { login,loginSuccess,loginFailure } from "./auth.action";
import { catchError,map,mergeMap } from "rxjs";
import { of } from "rxjs";

@Injectable()
export class AuthEffects{
    constructor(private actions$:Actions,private authService: AuthService){}

    login$ = createEffect(() =>
        this.actions$.pipe(
          ofType(login),
          mergeMap(action =>
            this.authService.login({ email: action.email, password: action.password }).pipe(
              map((response: any) => loginSuccess({ token: response.token })),
              catchError(error => of(loginFailure({ error })))
            )
          )
        )
      );

      loadTokenFromLocalStorage$ = createEffect(() =>
        of(localStorage.getItem('authToken')).pipe(
          map((token: string | null) => {
            if (token) {
              return loginSuccess({ token });
            } else {
              return { type: '[Auth] No Token Found' };
            }
          })
        )
      );
}
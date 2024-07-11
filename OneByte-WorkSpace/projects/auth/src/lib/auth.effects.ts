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
          mergeMap(action => {
            console.log('Login action received:', action); // Add logging here
            return this.authService.login(action.email, action.password).pipe(
              map((response: any) => {
                console.log('Login API response:', response);
                return loginSuccess({ token: response.token });
              }),
              catchError(error => of(loginFailure({ error })))
            );
          })
        )
      );
}
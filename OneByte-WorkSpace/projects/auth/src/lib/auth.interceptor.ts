import { Injectable} from "@angular/core";
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { Observable } from "rxjs";
import { take,switchMap } from "rxjs";

@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private store: Store<{auth: AuthState}>){}

    intercept(req: HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        return this.store.select(state => state.auth.token).pipe(
            take(1),
            switchMap(token => {
                if(token){
                    const cloned  = req.clone({
                        headers: req.headers.set('Authorization',`Bearer ${token}`)
                    });
                    return next.handle(cloned);
                }else {
                    return next.handle(req)
                }
            })
        );
    }
}

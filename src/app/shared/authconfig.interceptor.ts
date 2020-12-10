import { ComponentsService } from './../services/components.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Para inyectar en constructores
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private component: ComponentsService) {}

    // Modifica la petición HTTP añadiendole la cabecera con el jwt
    intercept(req: HttpRequest<any>, next: HttpHandler){
        if(localStorage.getItem("ACCESS_TOKEN") != null){
            const authToken = localStorage.getItem("ACCESS_TOKEN")
            const authReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authToken
                }
            });

            return next.handle(authReq).pipe(
                catchError((err: HttpErrorResponse) => {
                    if(err.status === 401) {
                        this.router.navigateByUrl('/auth/login');
                        this.component.presentAlert("Sesión caducada :( Por favor, inicia sesión de nuevo")
                    }
                    else if(err.status === 500) {
                        this.component.presentAlert("No se ha podido conectar con el servidor");
                    }
                    return throwError(err);
                }));
        }
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if(err.status === 500){
                    this.component.presentAlert("No se ha podido conectar con el servidor");
                }

                return throwError(err);
            })
        );
    }
}
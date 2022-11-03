import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey = 'access';
  private readonly _refreshTokenKey = 'refresh';
  private _authUser = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient) {
  }

  private _setTokens({access, refresh}: ITokens): void {
    localStorage.setItem(this._accessTokenKey, access);
    localStorage.setItem(this._refreshTokenKey, refresh);
  }

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap((tokens) => {
        this._authUser.next(user.username);
        this._setTokens(tokens)
      })
    );
  }

  register(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.users, user);
  }

  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap((tokens) => {
        this._setTokens(tokens)
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getUserName(): Observable<string | null> {
    return this._authUser.asObservable();
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || '';
  }

  deleteTokens(): void {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
    this._authUser.next(null);
  }

}

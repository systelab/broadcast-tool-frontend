import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { LocalStorageService } from 'systelab-preferences/lib/local-storage.service';
import { BASE_PATH } from '../variables';

@Injectable()
export class ManageSessionService {
	public defaultHeaders = new HttpHeaders();
	private token: string = "";
	private tokenExpiration: Date;
	private domain = "";
	constructor(private pref: LocalStorageService, protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.domain = basePath;
		}
	}
	public checkExistSession() {
		let k = this.pref.get('currentUser');
		if (!k) {
			return false;
		}
		else {
			return true;
		}
	}
	public checkSession() {
		let k = this.pref.get('currentUser');
		if (!k) {
			return false;
		}
		else {
			let currentUser = JSON.parse(this.pref.get('currentUser'));
			this.token = currentUser.token;
			this.tokenExpiration = currentUser.tokenExpiration;
			const q = new Date();
			const tokdate = new Date(this.tokenExpiration);
			if (this.token && tokdate > q) {
				let momentOfTime = new Date();
				const myTimeSpan = 40 * 60 * 1000; // 40 minutes in milliseconds
				momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
				this.tokenExpiration = momentOfTime;
				this.pref.put('currentUser', JSON.stringify({ token: this.token, tokenExpiration: this.tokenExpiration, expires: currentUser.expires, refreshToken: currentUser.refreshToken }));
				return true;
			}
			else {
				return false;
			}
		}
	}
	public saveSession(tok: string, expires: any, refreshToken: any) {
		this.token = tok;
		let momentOfTime = new Date();
		const myTimeSpan = 40 * 60 * 1000; // 40 minutes in milliseconds
		momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
		this.tokenExpiration = momentOfTime;
		this.pref.put('currentUser', JSON.stringify({ token: tok, tokenExpiration: this.tokenExpiration, expires: expires, refreshToken: refreshToken }));

	}

	public ClearSession() {
		this.pref.remove('currentUser');
		return true;
	}
	public refreshToken() {

	}
	public error401(error) {
		if (error.status == 401) {
			if (this.checkExistSession()) {
				this.ClearSession();
				window.location.reload();
			}
		}
	}
	public refreshTokenCall(tok: any) {
		let params = new HttpParams().set('refreshToken', tok);
		const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
		return this.httpClient.post<any>(this.domain + '/auth/login/refresh', params);
	}
	public GetRefreshToken(): string {
		let k = this.pref.get('currentUser');
		if (!k) {
			return null;
		}
		else {
			let currentUser = JSON.parse(this.pref.get('currentUser'));
			return currentUser.refreshToken;
		}
	}
	public GetCurrentToken(): string {
		if (this.checkSession()) {
			let currentUser = JSON.parse(this.pref.get('currentUser'));
			this.token = currentUser.token;
			return this.token;
		}
		else {
			return "";
		}
	}

}

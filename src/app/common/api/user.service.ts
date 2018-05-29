import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ManageSessionService } from "./session.service";
import { BASE_PATH } from '../variables';

@Injectable()
export class UserService {
	public defaultHeaders = new HttpHeaders();
	private domain = "";
	constructor(protected httpClient: HttpClient, private data: ManageSessionService, @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.domain = basePath;
		}
	}

	public GetUserInformation() {
		var tok = this.data.GetCurrentToken();
		if (tok) {
			const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', tok);
			return this.httpClient.get<any>(this.domain + '/auth', {
				headers: headers
			});
		}
	}

	public authenticateUser(creds) {
		const headers = this.defaultHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
		const body = new HttpParams().set('login', creds.username).set('password', creds.password);
		return this.httpClient.post<HttpResponseBase>(this.domain + '/auth/login', body, {
			headers: headers,
			observe: 'response',
		});
	}
}

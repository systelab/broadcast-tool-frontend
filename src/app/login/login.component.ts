import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../common/api/user.service';
import { DataService } from "../common/api/data.service";
import { ManageSessionService } from "../common/api/session.service";
import { credentials } from "../common/model/credentials";

declare var $: any;

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
	public userName = undefined;
	public password = undefined;

	public errorUserPwd = false;
	public txtUsername = '';
	public currentForm = '';
	public isLoginActive = true;

	constructor(protected router: Router, protected userService: UserService, private data: DataService, private session: ManageSessionService) {
		this.currentForm = 'login';
		this.txtUsername = 'Username';
	}
	public creds: credentials = new credentials();

	public doLogin() {
		this.creds.password = this.password;
		this.creds.username = this.userName;
		this.userService.authenticateUser(this.creds).subscribe((response) => {
			this.session.saveSession(response.headers.get('authorization'), response.headers.get('expires'), response.headers.get('refresh'));
			this.router.navigateByUrl('/main');
		}, error => {
			this.errorUserPwd = true;
		});
	}


}



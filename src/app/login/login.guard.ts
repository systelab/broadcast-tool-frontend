import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ManageSessionService } from "../common/api/session.service";
@Injectable()
export class LoginGuard implements CanActivate {

	constructor(private router: Router, private session: ManageSessionService) {
	}

	public canActivate() {

		if (this.session.checkSession()) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}

}

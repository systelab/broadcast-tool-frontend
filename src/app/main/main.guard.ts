import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ManageSessionService } from "../common/api/session.service";
@Injectable()
export class MainGuard implements CanActivate {

	constructor(private router: Router, private session: ManageSessionService) {
	}

	public canActivate() {
		if (this.session.checkSession()) {
			this.router.navigate(['/main']);
			return false;
		}
		else {
			return true;
		}
	}
}
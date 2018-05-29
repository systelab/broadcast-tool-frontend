import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/api/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ManageSessionService } from "../../common/api/session.service";
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public name: string;
	public email: string;

	constructor(private router: Router, private session: ManageSessionService, protected userService: UserService) {
	}

	ngOnInit() {
		/*Get user Info */
		this.userService.GetUserInformation()
			.subscribe((success: any) => {
				if (success) {
					this.email = success.email;
					this.name = success.name;
				}
			});
	}
	public logout() {
		if (this.session.ClearSession()) {
			this.router.navigate(['/login']);
		}
	}
}

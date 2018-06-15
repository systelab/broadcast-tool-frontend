import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageSessionService } from "../common/api/session.service";

@Component({
	selector: 'main',
	templateUrl: 'main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public wall = 1;
	public login = 0;
	constructor(public router: Router, private session: ManageSessionService) {
	}
	public ngOnInit() {
		var tok = this.session.GetCurrentToken();
		if (tok) {
			this.login = 1;
		}
	}
}

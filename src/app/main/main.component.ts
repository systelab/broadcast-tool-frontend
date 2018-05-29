import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ManageSessionService } from "../common/api/session.service";
import { Variables } from '../common/variables';

@Component({
	selector: 'main',
	templateUrl: 'main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public wall = 1;
	public login = 0;
	constructor(private router: Router, private session: ManageSessionService) {
	}
	public ngOnInit() {
		var tok = this.session.GetCurrentToken();
		if (tok) {
			this.login = 1;
		}
	}
}

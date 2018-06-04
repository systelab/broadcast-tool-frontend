import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main-buttons',
	templateUrl: './main-buttons.component.html',
	styleUrls: ['./main-buttons.component.scss']
})
export class MainButtonsComponent {

	@Input() wall: number;

	constructor(private router: Router) {
	}
	public showSection(route) {
		const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/#/' + route;
		window.open(url, '_blank');
	}
	public goAddPost() {
		this.router.navigate(['/item/0']);
	}
	public changeView(v) {
		this.wall = v;
	}
}

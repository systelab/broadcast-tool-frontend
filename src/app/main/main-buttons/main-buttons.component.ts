import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main-buttons',
	templateUrl: './main-buttons.component.html',
	styleUrls: ['./main-buttons.component.scss']
})
export class MainButtonsComponent {
	private _wall: number;

	@Input()
	get wall(): number {
		return this._wall;
	}

	@Output() wallChange = new EventEmitter();

	set wall(value: number) {
		this._wall = value;
		this.wallChange.emit(this._wall);
	}

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

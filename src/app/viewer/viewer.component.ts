import { Component, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { DataService } from "../common/api/data.service";
import { Variables } from '../common/variables';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

export class CommentControlValueData {
	constructor(public id: number, public title: string, public dob: string, public description: string, public image: string, public name: string, public lastname: string) {

	}
}
@Component({
	selector: 'app-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
	public id = 0;
	public frameWidth = 0;
	public values: CommentControlValueData[] = [];
	constructor(protected activatedRoute: ActivatedRoute, protected globals: Variables, protected preferencesService: PreferencesService, protected i18nServices: I18nService, protected data: DataService, protected dialo: DialogService) {
		this.frameWidth = (window.innerWidth);
		setInterval(function () { window.location.reload() }, 1800000);
		if (this.activatedRoute.snapshot.params['id']) {
			this.id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
		}
	}



	ngOnInit() {
		this.loadDataAnonymous(0);
	}

	public loadDataAnonymous(v) {
		this.data.getItemsListAnonymous(v, this.id).subscribe((res) => {
			if (res) {
				for (let i = 0; i < res.length; i++) {
					let image = '';
					let da = res[i].dob.replace('T', ' ');
					let g2 = da.split(':');
					let hu: CommentControlValueData = new CommentControlValueData(res[i].id, res[i].title, g2[0] + ':' + g2[1], res[i].description, image, res[i].name, res[i].lastName);
					this.data.getItemImage(res[i].id).subscribe((res) => {
						hu.image = res;
						this.values.push(hu);
					});
				}
			}
		});
	}
}

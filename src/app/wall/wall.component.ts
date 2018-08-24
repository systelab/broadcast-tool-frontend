import { Component, Input, OnInit, Optional, Inject } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { DataService } from "../common/api/data.service";
import { Variables, BASE_PATH } from '../common/variables';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { Router } from '@angular/router';
import { Category } from '../common/model/category';
export class CommentControlValueData {
	constructor(public id: number, public title: string, public dob: string, public description: string, public image: string, public name: string, public lastname: string, public idCategory: number, public draft: boolean, public localization: string) {

	}
}
@Component({
	selector: 'app-wall',
	templateUrl: './wall.component.html',
	styleUrls: ['./wall.component.scss']
})

export class WallComponent implements OnInit {
	public values: Array<CommentControlValueData> = [];
	public valuesCategories: Array<Category> = [];
	public valuesCategoriesKey: Array<number> = [];
	public itemsV = 0;
	public rssUrl = '';
	@Input() user = 0;
	constructor(@Optional() @Inject(BASE_PATH) basePath: string, protected globals: Variables, private router: Router, protected preferencesService: PreferencesService, protected i18nServices: I18nService, protected data: DataService, protected dialo: DialogService) {

		this.rssUrl = basePath + '/api/rss';

	}

	ngOnInit() {
		if (this.user === 1) {
			this.loadData(-1);
		}
		else {
			this.loadDataAnonymous(-1);
		}

	}
	public loadData(v) {
		this.data.getItemsList(v).subscribe((res) => {
			if (res) {
				for (let i = 0; i < res.length; i++) {
					let image = '';
					let da = res[i].dob.replace('T', ' ');
					let g2 = da.split(':');
					if (!this.valuesCategoriesKey.includes(res[i].idCategory)) {
						let cat = new Category();
						cat.id = res[i].idCategory;
						cat.name = res[i].nameCategory;
						cat.active = true;
						this.valuesCategories.push(cat);
						this.valuesCategoriesKey.push(res[i].idCategory);
					}
					let hu: CommentControlValueData = new CommentControlValueData(res[i].id, res[i].title, g2[0] + ':' + g2[1], res[i].description, image, '', '', res[i].idCategory, res[i].draft, res[i].localization);
					this.values.push(hu);
					this.data.getItemImage(res[i].id).subscribe((res) => {
						let index = this.values.indexOf(hu);
						hu.image = res;
						this.values[index] = hu;
					})

				}
				this.itemsV = 1;
				this.valuesCategories = (this.valuesCategories || []).sort((a: Category, b: Category) => a.name < b.name ? -1 : 1);
			}
		});
	}
	public loadDataAnonymous(v) {
		this.data.getItemsListAnonymous(v, 0).subscribe((res) => {
			if (res) {
				for (let i = 0; i < res.length; i++) {
					let image = '';
					let da = res[i].dob.replace('T', ' ');
					let g2 = da.split(':');
					if (!this.valuesCategoriesKey.includes(res[i].idCategory)) {
						let cat = new Category();
						cat.id = res[i].idCategory;
						cat.name = res[i].nameCategory;
						cat.active = true;
						this.valuesCategories.push(cat);
						this.valuesCategoriesKey.push(res[i].idCategory);
					}
					let hu: CommentControlValueData = new CommentControlValueData(res[i].id, res[i].title, g2[0] + ':' + g2[1], res[i].description, image, res[i].name, res[i].lastName, res[i].idCategory, res[i].draft, res[i].localization);
					this.values.push(hu);
					this.data.getItemImage(res[i].id).subscribe((res) => {
						let index = this.values.indexOf(hu);
						hu.image = res;
						this.values[index] = hu;
					})
				}
				this.itemsV = 1;
				this.valuesCategories = (this.valuesCategories || []).sort((a: Category, b: Category) => a.name < b.name ? -1 : 1);
			}
		});
	}
	public goDetails(v) {
		this.router.navigate(['/item/' + v]);
	}
	public slChange(id) {
		if (this.valuesCategoriesKey.indexOf(id) != -1) {
			var index = this.valuesCategoriesKey.indexOf(id);
			if (index > -1) {
				this.valuesCategoriesKey.splice(index, 1);
			}
		}
		else {
			this.valuesCategoriesKey.push(id);
		}
	}

}

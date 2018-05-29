import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpParams } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { DataService } from '../../../common/api/data.service';
import { DialogService, MessagePopupService } from 'systelab-components/widgets/modal';
import { Item } from '../../../common/model/Item';


import { Category } from '../../../common/model/category';
@Component({
	selector: 'app-details-item',
	templateUrl: './details-item.component.html',
	styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent implements OnInit {
	public id: number;
	public form = 0;
	public item: Item = new Item();
	public image = '';
	public value = '';
	public access: number;
	public desCategory = "";
	public comboCategories: Array<Object> = [];
	public listPosts: Array<number> = []
	@Input() login = 0;
	constructor(private http: HttpClient, protected messagePopupService: MessagePopupService, protected activatedRoute: ActivatedRoute, private router: Router, protected preferencesService: PreferencesService, protected i18nServices: I18nService, protected data: DataService, protected dialo: DialogService) {
		this.id = this.activatedRoute.snapshot.params['id'];
		this.access = 0;
	}
	ngOnInit() {
		this.loadCategories();
		this.loadDetails();
		this.loadListWall();
	}

	public loadDetails() {
		if (this.id == 0) {
			this.changeForm(1);
			this.item = new Item();
			this.item.title = '';
			this.item.description = '';
			this.item.path = '';
			this.item.type = 0;
			this.item.pinned = false;
			this.item.name = '';
			this.item.lastname = '';
			this.item.idCategory = 0;
			this.item.draft = false;
			this.item.expirationDate = new Date();
		}
		else {

			this.data.getItemImage(this.id).subscribe((res) => {
				this.image = res;
			})
			if (this.login == 1) {
				this.data.getItemsList(this.id).subscribe((res) => {
					this.item.title = res.title;
					this.item.id = res.id;
					this.item.description = res.description;
					let da = res.dob.replace('T', ' ');
					let g2 = da.split(':');
					this.item.dob = g2[0] + ':' + g2[1];
					this.access = res.access;
					this.item.name = res.name;
					this.item.lastname = res.lastName;
					this.item.pinned = res.pinned;
					this.item.idCategory = res.idCategory;
					this.item.nameCategory = res.categoryName;
					this.desCategory = res.categoryName;
					this.item.draft = res.draft;
					const dt = res.expirationDate.split('T');
					this.item.expirationDate = new Date(dt[0]);
				}, (error) => {
				});
			}
			else {
				this.data.getItemsListAnonymous(this.id).subscribe((res) => {
					this.item.title = res.title;
					this.item.id = res.id;
					this.item.description = res.description;
					let da = res.dob.replace('T', ' ');
					let g2 = da.split(':');
					this.item.dob = g2[0] + ':' + g2[1];
					this.access = res.access;
					this.item.name = res.name;
					this.item.lastname = res.lastName;
					this.item.pinned = res.pinned;
					this.item.idCategory = res.idCategory;
					this.item.nameCategory = res.categoryName;
					this.desCategory = res.categoryName;
					this.item.draft = res.draft;
					const dt = res.expirationDate.split('T');
					this.item.expirationDate = new Date(dt[0]);
				}, (error) => {
				});

			}

		}
	}
	public doEdit() {
		this.changeForm(1);
	}
	public goBack() {
		if (this.id == 0) {
			this.router.navigate(['/main']);
		}
		else {
			this.changeForm(0);
		}
	}
	public goWall() {
		this.router.navigate(['/wall']);
	}
	public changeForm(v) {
		this.form = v;
	}
	public loadCategories() {
		this.data.ApiCategoryGet(0).subscribe((res) => {
			for (let i = 0; i < res.body.length; i++) {
				this.comboCategories.push({ description: res.body[i].name, id: res.body[i].id });
			}
		})
	}
	public goDetails() {
		this.id = this.item.id;
		this.changeForm(0);
		this.router.navigate(['/item/' + this.item.id]);
		this.loadDetails();
	}
	public reload() {
		this.changeForm(0);
		this.loadDetails();
	}

	public doDelete() {
		this.messagePopupService.showYesNoQuestionPopup(this.i18nServices.instant('COMMON_DELETE_ITEM'), this.i18nServices.instant('COMMON_QUESTION_DELETE_ITEM')).subscribe((res) => {
			if (res) {
				this.data.deleteItem(this.item.id).subscribe((res) => {
					if (res) {
						this.messagePopupService.showInformationPopup('', this.i18nServices.instant('COMMON_ITEM_DELETED'));
						this.router.navigate(['/main']);
					}
				});
			}
		}, (error) => {
		});
	}
	public goBackList() {
		this.router.navigate(['/main']);
	}
	public loadListWall() {
		if (this.login == 1) {
			this.data.getItemsList(-1).subscribe((res) => {
				if (res) {
					for (let i = 0; i < res.length; i++) {
						if (!this.listPosts.includes(res[i].id)) {
							this.listPosts.push(res[i].id);
						}
					}
				}
			});
		}
		else {
			this.data.getItemsListAnonymous(-1).subscribe((res) => {
				if (res) {
					for (let i = 0; i < res.length; i++) {
						if (!this.listPosts.includes(res[i].id)) {
							this.listPosts.push(res[i].id);
						}
					}
				}
			});
		}
	}
	public doNextItem(v) {
		const index = this.listPosts.indexOf(this.item.id);
		if (v == 1) {
			let sum = index + v;
			if (this.listPosts[sum]) {
				this.id = this.listPosts[sum];
			}
			else {
				this.id = this.listPosts[0];
			}
		}
		else {
			let sum = index - 1;
			if (this.listPosts[sum]) {
				this.id = this.listPosts[sum];
			}
			else {
				this.id = this.listPosts[this.listPosts.length - 1];
			}
		}
		this.loadDetails();
	}

}

import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../../../../common/api/data.service';
import { Item } from '../../../../common/model/Item';
import { I18nService } from '../../../../../../node_modules/systelab-translate/lib/i18n.service';


@Component({
	selector: 'app-item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
	private _item: Item;
	private _id: number;
	public maxLength: number;
	public remaining: number;
	@Input() desCategory = '';
	@Input() desLocalization = '';
	constructor(protected data: DataService, protected i18nServices: I18nService) {
		this.maxLength = 1400;

		i18nServices.get(['COMMON_SELECT_LOCALIZATION', 'COMMON_SELECT_CATEGORY']).subscribe((res) => {
			if (this.desLocalization === '') {
				this.desLocalization = res.COMMON_SELECT_LOCALIZATION;
			}
			if (this.desCategory === '') {
				this.desCategory = res.COMMON_SELECT_CATEGORY;
			}
		})

	}

	@Input()
	get item(): Item {
		return this._item;
	}

	@Output() itemChange = new EventEmitter();

	set item(value: Item) {
		this._item = value;
		this.itemChange.emit(this._item);
	}
	@Input()
	get id(): number {
		return this._id;
	}

	@Output() idChange = new EventEmitter();

	set id(value: number) {
		this._id = value;
		this.idChange.emit(this._id);
	}


	@Output() reload = new EventEmitter();
	@Output() changeForm = new EventEmitter<number>();
	@Input() comboLocalizations: Array<Object>;
	@Input() comboCategories: Array<Object>;
	ngOnInit() {
		if (this.item.id > 0) {
			this.remaining = 1400 - this.item.description.length;
		}
		else {
			this.remaining = this.maxLength;
		}
	}

	public checkDraft() {
		if (this.item.draft) {
			this.item.draft = false;
		}
		else {
			this.item.draft = true;
		}
	}
	public checkPublish() {
		if (this.item.pinned) {
			this.item.pinned = false;
		}
		else {
			this.item.pinned = true;
		}
	}
	public comboChangeEvent(event) {
		this.item.idCategory = event.id;
	}
	public comboLocalizationChangeEvent(event) {
		this.item.idLocalization = event.id;
	}
	public doUpdate() {
		this.data.putItem(this.item).subscribe((res) => {
			this.reload.emit();
		}, (error) => {
		});
	}
	public doSave() {
		this.data.postItem(this.item).subscribe((res) => {
			this.item.id = res.id;
			this.id = this.item.id;
			this.changeForm.emit(2);
		}, (error) => {
		});
	}
	public count() {
		var remaining = this.maxLength - this.item.description.length;
		if (remaining < 0) {
			this.item.description = this.item.description.substring(0, this.maxLength);
			remaining = 0;
		}
		this.remaining = remaining;
	}
}

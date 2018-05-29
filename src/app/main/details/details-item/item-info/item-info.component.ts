import { Component, Input } from '@angular/core';
import { Item } from '../../../../common/model/Item';

@Component({
	selector: 'app-item-info',
	templateUrl: './item-info.component.html',
	styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent {

	@Input() item: Item = new Item();
	@Input() image = '';
	constructor() { }
}

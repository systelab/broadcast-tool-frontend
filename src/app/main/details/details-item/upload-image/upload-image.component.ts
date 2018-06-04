import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Item } from '../../../../common/model/Item';
import { DataService } from '../../../../common/api/data.service';

@Component({
	selector: 'app-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
	public progress: number;
	@Output() goBack = new EventEmitter();
	@Output() changeForm = new EventEmitter<number>();
	@Input() item: Item;
	public id = 0;
	constructor(protected data: DataService) { this.id = this.item.id }


	public upload(files) {
		if (files.length === 0)
			return;
		const formData = new FormData();

		for (let file of files) {
			formData.append(file.name, file);
		}
		this.data.uploadFile(this.item.id, formData).subscribe((res) => {
			if (res) {
				this.changeForm.emit(3);
			}
		});
	}
	public returnBack() {
		this.goBack.emit();
	}
}

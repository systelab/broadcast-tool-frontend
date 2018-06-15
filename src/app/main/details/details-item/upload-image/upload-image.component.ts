import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../../common/api/data.service';
import { MessagePopupService } from 'systelab-components/widgets/modal/message-popup/message-popup.service';
import { I18nService } from 'systelab-translate/lib/i18n.service';


@Component({
	selector: 'app-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

	public progress: number;
	@Output() goBack = new EventEmitter();
	@Output() changeForm = new EventEmitter<number>();
	@Input() id: number;

	constructor(protected data: DataService, protected messagePopupService: MessagePopupService, protected i18nServices: I18nService) {
	}
	public upload(files) {
		if (files.length === 0)
			return;
		const formData = new FormData();

		for (let file of files) {
			if (file.type.indexOf('jpg') != -1 || file.type.indexOf('jpeg') != -1) {
				formData.append(file.name, file);
				this.data.uploadFile(this.id, formData).subscribe((res) => {
					if (res) {
						this.changeForm.emit(3);
					}
				});
			}
			else {
				this.showFormatAlert();
			}
		}

	}
	public returnBack() {
		this.goBack.emit();
	}
	public showFormatAlert() {
		this.i18nServices.get(['ERR_ERROR', 'ERR_FORMAT_INCORRECT']).subscribe((res) => {
			this.messagePopupService.showErrorPopup(res.ERR_ERROR, res.ERR_FORMAT_INCORRECT, null, 100, 100);
		});

	}

}

import { AfterViewInit, Component, Input } from '@angular/core';
import { AbstractGrid } from 'systelab-components/widgets/grid/abstract-grid.component';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PreferencesService } from 'systelab-preferences/lib/preferences.service';
import { DataService } from "../../../common/api/data.service";
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { Router } from '@angular/router';

export class CommentControlValueData {
	constructor(public id: number, public title: string, public dob: string, public description: string, public path: string, public localization: string) {

	}
}
@Component({
	selector: 'app-comment-list',
	template: `  <div #hidden class="height-hidden"></div>
  <ag-grid-angular id="agGrid" #agGrid
                   style="position:absolute; top:0; bottom:0; left:0; right:0; overflow: hidden;"
                   class="ag-fresh ag-theme-fresh listNormal"
                   [gridOptions]="gridOptions"
                   (gridReady)="doGridReady($event)"
                   [enableSorting]="true"
                   [enableFilter]="true"
                   [pagination]="true"
                   [paginationPageSize]="25"
                   (cellClicked)="doClick($event)"
                   (columnResized)="doColumnResized($event)"
                   (viewportChanged)="doViewportChanged()"
                   (modelUpdated)="onModelUpdated($event)">
  </ag-grid-angular>`,
	styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent extends AbstractGrid<CommentControlValueData> implements AfterViewInit {

	gridOptions: any;

	public values: CommentControlValueData[] = [];

	constructor(private router: Router, protected preferencesService: PreferencesService, protected i18nServices: I18nService, protected data: DataService, protected dialo: DialogService) {
		super(preferencesService, i18nServices, dialo);
	}

	public ngAfterViewInit() {
		this.loadData();
	}

	public CleanGrid() {
		this.values.splice(0, this.values.length);
		this.gridOptions.api.setRowData(this.values);
	}
	public loadData() {
		this.data.getItemsList(-1).subscribe((res) => {
			if (res) {
				for (let i = 0; i < res.length; i++) {
					let da = res[i].dob.replace('T', ' ');
					let g2 = da.split(':');
					let hu: CommentControlValueData = new CommentControlValueData(res[i].id, res[i].title, g2[0] + ':' + g2[1], res[i].description, res[i].path, res[i].localization);
					this.values.push(hu);
				}
				this.gridOptions.api.setRowData(this.values);
			}
		}, (error) => {
		});
	}
	protected getColumnDefs(): Array<any> {
		const columnDefs: Array<any> = [];
		columnDefs.push({ colId: 'title', headerName: 'Title', field: 'title', filter: 'text' });
		columnDefs.push({ colId: 'date', headerName: 'Date', field: 'dob' });
		columnDefs.push({ colId: 'localization', headerName: 'Localization', field: 'localization' });
		columnDefs.push({ colId: 'description', headerName: 'Description', field: 'description' });
		return columnDefs;
	}

	public doClick(e) {
		this.router.navigate(['/item/' + e.data.id]);
	}
}

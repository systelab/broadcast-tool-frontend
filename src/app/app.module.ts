import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SystelabComponentsModule } from 'systelab-components';
import { SystelabTranslateModule } from 'systelab-translate';
import { SystelabPreferencesModule } from 'systelab-preferences';
import { SystelabLoginModule } from 'systelab-login';
import { SystelabChartsModule } from 'systelab-charts';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app.routing';
import { LoginGuard } from './login/login.guard';
import { MainGuard } from './main/main.guard';
import { MessagePopupService } from 'systelab-components/widgets/modal/message-popup/message-popup.service';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';
import { UserService } from '../app/common/api/user.service';
import { DataService } from "../app/common/api/data.service";
import { ManageSessionService } from "../app/common/api/session.service";
import { BASE_PATH, Variables } from '../app/common/variables';
import { HeaderComponent } from './main/header/header.component';
import { CommentListComponent } from './main/lists/comment-list/comment-list.component';
import { DetailsItemComponent } from './main/details/details-item/details-item.component';
import { WallComponent } from './wall/wall.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { MainButtonsComponent } from './main/main-buttons/main-buttons.component';
import { ItemInfoComponent } from './main/details/details-item/item-info/item-info.component';
import { ItemFormComponent } from './main/details/details-item/item-form/item-form.component';
import { UploadImageComponent } from './main/details/details-item/upload-image/upload-image.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LoginComponent,
		HeaderComponent,
		CommentListComponent,
		DetailsItemComponent,
		WallComponent,
		ViewerComponent,
		MainButtonsComponent,
		ItemInfoComponent,
		ItemFormComponent,
		UploadImageComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		SystelabTranslateModule.forRoot(),
		SystelabPreferencesModule.forRoot(),
		SystelabComponentsModule.forRoot(),
		SystelabLoginModule.forRoot(),
		SystelabChartsModule.forRoot(),
		NgbModule.forRoot(),
		AppRoutingModule,
		BrowserAnimationsModule,
		MarkdownModule.forRoot()
	],
	providers: [
		LoginGuard,
		MainGuard,
		MessagePopupService,
		DialogService, DataService, ManageSessionService, Variables, UserService,
		{ provide: BASE_PATH, useValue: environment.BASE_PATH },
	],
	entryComponents: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

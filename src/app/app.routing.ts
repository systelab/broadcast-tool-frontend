import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MainGuard } from './main/main.guard';
import { WallComponent } from './wall/wall.component';
import { ViewerComponent } from './viewer/viewer.component';
const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [MainGuard] },
	{ path: 'main', component: MainComponent, canActivate: [LoginGuard] },
	{ path: 'item', component: WallComponent },
	{ path: 'item/:id', component: MainComponent },
	{ path: 'wall', component: WallComponent },
	{ path: 'viewer', component: ViewerComponent },
	{ path: '', redirectTo: 'wall', pathMatch: 'full' },
	{ path: '**', component: WallComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
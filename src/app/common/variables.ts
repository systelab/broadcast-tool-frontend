import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

@Injectable()
export class Variables {
	appname = 'Communication tool';
}
export const BASE_PATH = new InjectionToken<string>('basePath');
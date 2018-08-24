import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { ManageSessionService } from "./session.service";
import { BASE_PATH } from '../variables';

@Injectable()
export class DataService {
    private domain = "";

    constructor(private httpClient: HttpClient, private session: ManageSessionService, @Optional() @Inject(BASE_PATH) basePath: string) {
        if (basePath) {
            this.domain = basePath;
        }
    }
    public defaultHeaders = new HttpHeaders();

    public getItemsList(id) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            let params = new HttpParams().set('id', id);
            const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', tok);
            return this.httpClient.get<any>(this.domain + '/api/item', {
                headers: headers,
                params: params
            });
        }
    }

    public getItemsListAnonymous(id, localization) {
        let params = new HttpParams().set('id', id).set('localization', localization);
        const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded')
        return this.httpClient.get<any>(this.domain + '/api/item/anonymous', {
            headers: headers,
            params: params
        });
    }

    public getItemImage(id) {
        let params = new HttpParams().set('id', id);
        const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpClient.get<any>(this.domain + '/api/item/image', {
            headers: headers,
            params: params
        });
    }

    public postItem(item) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            let body = '';
            const dat = new Date(item.expirationDate);
            let result = this.pad(dat.getDate()) + "/" + this.pad(dat.getMonth() + 1) + "/" + dat.getFullYear();
            let params = new HttpParams().set('IdCategory', item.idCategory).set('title', item.title).set('description', item.description).set('draft', item.draft).set('expDate', result).set('pinned', item.pinned).set('IdLocalization', item.idLocalization);
            const headers = this.defaultHeaders.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', tok);
            return this.httpClient.post<any>(this.domain + '/api/item', body, {
                headers: headers,
                params: params
            });
        }
    }
    public pad(n) { return n < 10 ? "0" + n : n; }

    public uploadImage(content, name, type, id) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            let body = new FormData();
            body.append("content", content);
            let params = new HttpParams().set('id', id).set('type', type).set('name', name);
            const headers = this.defaultHeaders.set('Content-Type', 'application/json;').set('Authorization', tok);
            return this.httpClient.post<any>(this.domain + '/api/item/upload', body, {
                headers: headers,
                params: params
            });
        }
    }


    public deleteItem(id) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            let params = new HttpParams().set('uid', id);
            const headers = this.defaultHeaders.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', tok);
            return this.httpClient.delete<any>(this.domain + '/api/item', {
                headers: headers,
                params: params
            });
        }
    }


    public UpdateUserPassword(idcliente, pass) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            let params = new HttpParams().set('idcliente', idcliente).set('pass', pass);
            let body = '';
            const headers = this.defaultHeaders.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', tok);
            return this.httpClient.put<any>(this.domain + '/api/user/password', body, {
                headers: headers,
                params: params
            });
        }
    }
    public putItem(item) {
        let tok = this.session.GetCurrentToken();
        if (tok) {
            const dat = new Date(item.expirationDate);
            let result = this.pad(dat.getDate()) + "/" + this.pad(dat.getMonth() + 1) + "/" + dat.getFullYear();
            let params = new HttpParams().set('IdCategory', item.idCategory).set('id', item.id).set('title', item.title).set('description', item.description).set('pinned', item.pinned).set('draft', item.draft).set('expDate', result).set('IdLocalization', item.idLocalization);
            let body = '';
            const headers = this.defaultHeaders.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', tok);
            return this.httpClient.put<any>(this.domain + '/api/item', body, {
                headers: headers,
                params: params
            });
        }
    }

    public uploadFile(id, formData) {
        let params = new HttpParams().set('id', id.toString());
        let g = this.domain + '/api/item/upload';

        const uploadReq = new HttpRequest('POST', g, formData, {
            reportProgress: false,
            params: params
        });

        return this.httpClient.request(uploadReq);
    }



    public copyToClipboard(element) {
        let url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        let link = url + "/#/survey/" + element;
        let temp = document.createElement("input");
        temp.value = link;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        return true;
    }



    public ApiLocalizationGet(id: number, ): Observable<HttpResponse<any>> {
        let uri = `/api/Localization`;
        let headers = new HttpHeaders();
        let params = new HttpParams();
        if (id !== undefined && id !== null) {
            params = params.set('id', id + '');
        }
        return this.sendRequest<any>('get', uri, headers, params, null);
    }
    /**
      * Method ApiCategoryGet
      * @param id This is a Communication Tool for Systelab
      * @return Full HTTP response as Observable
      */
    public ApiCategoryGet(id: number, ): Observable<HttpResponse<any>> {
        let uri = `/api/category`;
        let headers = new HttpHeaders();
        let params = new HttpParams();
        if (id !== undefined && id !== null) {
            params = params.set('id', id + '');
        }
        return this.sendRequest<any>('get', uri, headers, params, null);
    }


    private sendRequest<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: any): Observable<HttpResponse<T>> {
        if (method === 'get') {
            return this.httpClient.get<T>(this.domain + uri, { headers: headers.set('Accept', 'application/json'), params: params, observe: 'response' });
        } else if (method === 'put') {
            return this.httpClient.put<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
        } else if (method === 'post') {
            return this.httpClient.post<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
        } else if (method === 'delete') {
            return this.httpClient.delete<T>(this.domain + uri, { headers: headers, params: params, observe: 'response' });
        } else {
            console.error('Unsupported request: ' + method);
            return Observable.throw('Unsupported request: ' + method);
        }
    }
}

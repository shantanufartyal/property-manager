import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlePropertiesService {

  constructor(private http: HttpClient) { }


  getProperties() {
    const header = new HttpHeaders({ 'Authorization': 'Bearer keycUqvMsCia9LN1N' })
    return this.http.get('https://api.airtable.com/v0/appXYVWxCp4vqUjEq/properties', { headers: header });
  }

  deleteProperty(propertyId: any) {
    const header = new HttpHeaders({ 'Authorization': 'Bearer keycUqvMsCia9LN1N'});
    return this.http.delete('https://api.airtable.com/v0/appXYVWxCp4vqUjEq/properties/' + propertyId, { headers: header });
  }

  addProperty(propertyData: any) {
    const header = new HttpHeaders({ 'Authorization': 'Bearer keycUqvMsCia9LN1N', 'Content-Type': 'application/json' });
    const body = {
      "fields": propertyData
    }
    return this.http.post('https://api.airtable.com/v0/appXYVWxCp4vqUjEq/properties', body, { headers: header });
  }
}

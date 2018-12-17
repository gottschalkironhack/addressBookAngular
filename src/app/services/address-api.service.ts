import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {
  BASE_URL: string = environment.baseURL;
  constructor(
    private http: HttpClient
  ) { }

  createAddress(addressData){
    return this.http.post(`${this.BASE_URL}/api/address`, addressData )
      .pipe(map(res => res))
  }

  getAddressList(){
    return this.http.get(`${this.BASE_URL}/api/address`)
      .pipe(map(res =>res)) 
  }

  getAddressData(id){
    return this.http.get(`${this.BASE_URL}/api/address/${id}`)
      .pipe(map(res =>res)) 
  }

  editAddressData(addressData, id){
    return this.http.put(`${this.BASE_URL}/api/address/${id}`, addressData )
      .pipe(map(res => res ))
  }
}

import { Component, OnInit } from '@angular/core'
import { AddressApiService } from '../../services/address-api.service'

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  providers: [ AddressApiService ]
})
export class AddressListComponent implements OnInit {

  addresses : any = []
  constructor( private addressApi: AddressApiService ) { }

  ngOnInit() {
    this.addressApi.getAddressList()
    .subscribe((addresses) => {
      this.addresses = addresses;
    })
  }
}
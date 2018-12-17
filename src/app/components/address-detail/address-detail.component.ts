import { Component, OnInit, Input } from '@angular/core'
import { MapsAPILoader } from '@agm/core'
declare var google: any

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  @Input() address : any
  constructor(
    private _mapsAPILoader  : MapsAPILoader
  ) { }

  ngOnInit() {
    this._mapsAPILoader.load().then(() => {
      const geocoder = new google.maps.Geocoder 
      let latlng = { lat: parseFloat(this.address.addressLatitude), lng: parseFloat(this.address.addressLatitude) }
      geocoder.geocode({'location': latlng }, (results, status) => {
        console.log('status',status)
        if (status === 'OK') {
          console.log(results)
          if(results[0]){
            console.log(results[0])
          } 
        }
      })
    })
  }
}


import { Component, OnInit, NgZone } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AddressApiService } from '../../services/address-api.service'
import { ActivatedRoute } from '@angular/router'
import { MapsAPILoader } from '@agm/core'
declare var google: any

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  message: any
  addressForm: FormGroup
  firstName: FormControl
  lastName: FormControl
  phoneNr: FormControl
  address: FormControl
  addressLat: FormControl
  addressLng: FormControl
  addressId: ''
  addressData: {}

  constructor(
    private api: AddressApiService,
    private route: ActivatedRoute,
    private _mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.addressId = params.id
      this.getAddressDetails(params.id)
    })
    this.createFormControls()
    this.createForm()
  }

  ngAfterViewInit(){
    this.initializeGoogleApi()
  } 

  createFormControls() {
    this.firstName = new FormControl('', Validators.required)
    this.lastName = new FormControl('', Validators.required)
    this.phoneNr = new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    this.address = new FormControl('', Validators.required)
    this.addressLat = new FormControl('', Validators.required)
    this.addressLng = new FormControl('', Validators.required)
  }

  createForm() {
    this.addressForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNr: this.phoneNr,
      address: this.address,
      geoData: new FormGroup({
        addressLng: this.addressLng,
        addressLat: this.addressLat
      }),
    })
  }

  getAddressDetails(id) {
    this.api.getAddressData(id)
      .subscribe((addressData) => {
        this.preFillAddressForm(addressData)   
    })
  }

  preFillAddressForm(addressData){
    this.addressForm.patchValue({
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      phoneNr: addressData.phoneNr,
      address: addressData.address,
      geoData: {
        addressLng: addressData.addressLng,
        addressLat: addressData.addressLat
      }
    })
  }

  initializeGoogleApi(){
    this._mapsAPILoader.load().then(() => {
      const input = document.getElementById('addressInput')
      const autocomplete = new google.maps.places.Autocomplete(input)
      const geocoder = new google.maps.Geocoder  
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // GET THE PLACES SEARCH RESPONSE
          let place = autocomplete.getPlace()    
          if(place.place_id){
            let Lng = place.geometry.location.lng()
            let Lat = place.geometry.location.lat()

            // STORE INFO IN FORM
            this.addressLat = Lat
            this.addressLng = Lng
            this.addressForm.patchValue({ address: place.name })
            this.addressForm.patchValue({ geoData: { addressLat: Lat }}) 
            this.addressForm.patchValue({ geoData: { addressLng: Lng }})             
          }
          
          //RUN GEOCODER TO GET GEOMETRY DATA IF PLACE ID UNDEFINED
          else if(!place.place_id){
            geocoder.geocode({'address': place.name }, function(results, status) {
              if (status === 'OK') {
                if(results[0]){
                  let Lat = results[0].geometry.location.lat()
                  let Lng = results[0].geometry.location.lng()
                  
                  // STORE INFO IN FORM
                  this.addressForm.patchValue({address: place.name })
                  this.addressForm.patchValue({ geoData: { addressLat: Lat }}) 
                  this.addressForm.patchValue({ geoData: { addressLng: Lng }})    
                } 
              }
            })
          }
        })
      })
    })
  }

  submitForm(){
    if (this.addressForm.valid) {
      this.api.editAddressData(this.addressForm.value, this.addressId)
        .subscribe(
          (addressData) => {
            this.message = 'Data saved correctly'
          },
          (err) => {
            this.message = "Please try again, something went wrong"
          }
        )
    }
  }
}

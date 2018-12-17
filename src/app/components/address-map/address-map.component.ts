import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.scss']
})
export class AddressMapComponent implements OnInit {

  @Input() latitude : any
  @Input() longitude : any
  constructor() { }

  ngOnInit() {

  }
}

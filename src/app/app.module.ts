//********************************* PACKAGES**************************************/
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AgmCoreModule } from '@agm/core'
import { HttpClientModule } from '@angular/common/http'

//********************************* COMPONENTS **************************************/
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { AddressDetailComponent } from './components/address-detail/address-detail.component'
import { AddressListComponent } from './components/address-list/address-list.component'
import { CreateAddressComponent } from './components/create-address/create-address.component'
import { EditAddressComponent } from './components/edit-address/edit-address.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { AddressMapComponent } from './components/address-map/address-map.component'

//********************************* ROUTING **************************************/
export const routes = [ 
  { path: '', component : HomeComponent},
  { path: 'address-detail', component : AddressDetailComponent },
  { path: 'address-list', component: AddressListComponent },
  { path: 'create-address',   component: CreateAddressComponent},
  { path: 'edit-address/:id', component: EditAddressComponent },
  { path: '**', redirectTo: '' }
] 

@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    AddressDetailComponent,
    AddressListComponent,
    HomeComponent,
    CreateAddressComponent,
    EditAddressComponent,
    NavbarComponent,
    AddressMapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkWJTPz_pycG85UrdhOcVkULsxqoQua-4',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



import { Component , OnInit } from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import {Location as AutoCompleteLocation} from '@angular-material-extensions/google-maps-autocomplete';
import { Location } from '@angular/common';
import { SHARED } from '../../shared';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-newcities',
  standalone: true,
  imports: [SHARED],
  templateUrl: './newcities.component.html',
  styleUrl: './newcities.component.scss'
})
export class NewcitiesComponent implements OnInit {
  city: any;
  lat: any;
  lng: any;
  address: any;
  loading = false;
  visible = false;
  confirm = false;
  inputData: any = {
    title: 'Are you sure?',
    body: 'Do you want to add this city?'
  }
  constructor(
    private api: BackendService,private comm: CommonService,
    private navCtrl: Location
  ) { }

  handleConfirmation() {
    this.confirm = true;
    console.log('Confirmed! Perform the action here.');
  }
  ngOnInit() {
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.city = result.name;
    this.lat = result.geometry.location.lat();
    this.lng = result.geometry.location.lng();
  }

  onLocationSelected(location: AutoCompleteLocation) {
    console.log('onLocationSelected: ', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    
  }
 


  create():any {

    if (!this.city || this.city === '' || !this.lat || !this.lng) {
      this.comm.openSnackBar('Please select valid city name');
      return false;
    }
    const id = Math.floor(100000000 + Math.random() * 900000000);
    const param = {
      name: this.city,
      status: 'active',
      id: id.toString(),
      lat: this.lat,
      lng: this.lng
    };
    console.log('ok', param, id.toString());
    this.loading = true;
    this.api.addCity(id.toString(), param).then(data => {
      this.loading = false;
      console.log(data);
      this.comm.openSnackBar('Success City Added');
      this.navCtrl.back();
    }).catch(error => {
      this.loading = false;
      console.log(error);
      this.comm.openSnackBar('Error: Something went wrong');
    });
  }

}


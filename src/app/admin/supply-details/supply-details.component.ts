import { Component ,OnInit,ViewChild, ChangeDetectorRef} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, RouterLink ,ActivatedRoute} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';
import  firebase from "firebase/compat/app";
import { serverTimestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-supply-details',
  standalone: true,
  imports: [SHARED,RouterLink],
  templateUrl: './supply-details.component.html',
  styleUrl: './supply-details.component.scss'
})
export class SupplyDetailsComponent implements OnInit {
  

updateSupply() {

}
  
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  suppliers: any=[];
  uomList: any=[];
new: boolean;


name: any = '';
uom: any = '';
supplier: any = {name: '',id: ''};
supplyImage: any = '';
storageCondition: any = '';
notes: any = '';
qty: number = 0;
cost: number = 0;
reorder: number = 0;
  banner_to_upload: any[];
  storageConditionList: any[];

  constructor(
    private route: ActivatedRoute,
    private api: BackendService,private comm: CommonService,
     private firebase: AngularFireStorage,
    private navCtrl: Location,
    private chMod: ChangeDetectorRef
  ) {
    this.getUsers();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      console.log('data=>', data);
      this.new = data.new === 'true' ? true : false;
      console.log(this.new);
     
        this.uomList = [
          { name: 'Litres' },
          { name: 'Kilograms' },
          { name: 'Bags' },
        ];

        this.storageConditionList = [
          { name: 'Needs Refridgeration' },
          { name: 'Room Temperature' },
        ];



        
      
    });
  }


  create() : any {
   
    this.loading = true;
  
            const param = {
              uid: this.comm.generateRandomUid(),
              name: this.name,
              uom: this.uom,
              supplier: this.supplier,
              supply_image: this.supplyImage,
              storage_condition: this.storageCondition,
              notes: this.notes,
              quantity: this.qty,
              instock: this.qty,
              cost: this.cost,
              reorder: this.reorder,
              status: 'available',
              created_at: serverTimestamp(),
              created_by: {
                name: this.comm.getCurrentUser().user.fullname,
                uid: this.comm.getCurrentUser().user.uid,
              },
              restaurant: {
                name: this.comm.getCurrentRestaurant().name,
                uid: this.comm.getCurrentRestaurant().uid,
              },
            };
            console.log('param', param);
            this.api.create('supply',param).then((data) => {
              this.loading = false;
              console.log(data);
              this.comm.openSnackBar('Success Supply added ');

              this.navCtrl.back();
            }, error => {
              this.loading = false;
              console.log(error);
              this.error(error);
            }).catch(error => {
              this.loading = false;
              console.log(error);
              this.error(error);
            });

  }
     
  


  handleConfirmation() {
    this.confirm = true;
    console.log('Confirmed! Perform the action here.');
  }

  getImage(cover) {
    return cover ? cover : 'assets/supply.png';
  }

  getDates(date) {
    this.comm.getDate(date);
   }

   getUsers() {
    this.api.getUsers().subscribe((data) => {
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }

  
  preview_banner(files:any,path:string) {

    console.log('fle', files.target.files[0]);
    this.banner_to_upload = [];
    if (files.target.files.length === 0) {
      return;
    }
    const mimeType = files.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.banner_to_upload = files.target.files[0];
    if (this.banner_to_upload) {
      this.loading = true;
      console.log('ok');
      const file1 = files.target.files[0];
      const storageRef = this.firebase.ref(path + '/' + file1.name);
      const task = storageRef.put(file1);
      task.snapshotChanges().subscribe(
        () => {
        },
        (error) => {
          this.loading = false;
          this.error('Something went wrong');
          // this.api.alerts('Error', 'Something went wrong', 'error');
          console.error(error);
        },
        () => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            console.log('download ur', downloadURL);
           
            this.supplyImage = downloadURL;
       
            this.loading = false;
          },
            (error) => {
              this.loading = false;
              this.error('Something went wrong');
              console.error('upload rejected', error);
            });
        }
      );

    } else {
      console.log('no');
    }
  }
  error(message) {
    this.comm.openSnackBar(message);
    }
    success(message) {
      this.comm.openSnackBar(message);
    }
}

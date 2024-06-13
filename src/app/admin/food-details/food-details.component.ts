import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AsyncPipe, Location } from '@angular/common';
import firebase from 'firebase/compat/app';
import { FoodItem } from 'src/app/services/models/models';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [SHARED, RouterLink,AsyncPipe],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss',
})
export class FoodDetailsComponent implements OnInit {
  dropdownList:any []= [];
  selectedAccompaniments = [];
  dropdownSettings = {};
  dropdownSettings1 = {};

  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  suppliers: any = [];
  uomList: any = [];
  categories: any = [];
  new: boolean;

  name: any = '';
  uom: any = '';
  menuName: any = '';
  category: any = '';
  supplier: any = { name: '', id: '' };
  foodImage: any = '';
  storageCondition: any = '';
  description: any = '';
  qty: number = 0;
  discount: number = 0;
  cost: number = 0;
  reorder: number = 0;
  banner_to_upload: any[];
  storageConditionList: any[];
  id: any;
  selectedTags: any;
  dropdownList1: any=[];
  menuNameList: any=[];
  constructor(
    private route: ActivatedRoute,
    private api: BackendService,
    private comm: CommonService,
    private firebase: AngularFireStorage,
    private navCtrl: Location,
    private chMod: ChangeDetectorRef
  ) {
    
    this.getCommmons();
    this.getFoods(); 
    this.addRow();
  }
  getCommmons() {
     this.api.getCommons().then((data) => {
      console.log(data);
      this.categories = data.categories;
      this.menuNameList = data.menu_name;
      this.dropdownList1 = data.tags;
     });
    
    }

  formData: any[] = []; // Array to store form data
  options = []; // Options for the select

  addRow() {
    this.formData.push({
      name: '',
      quantity: '',
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  removeRow(index: number) {
    if (this.formData.length > 1) {
      this.formData.splice(index, 1);
    }
  }

  updateFood() {}
  create(): any {
    this.loading = true;

    const param:FoodItem = {
      name: this.name,
      uom: this.uom,
      category: this.category,
      menuName: this.menuName,
      foodImage: this.foodImage,
      description: this.description,
      quantity: this.qty,
      instock: this.qty,
      orderedQuantity: 0,
      veg: true,
      cost: this.cost,
      discount: this.discount,
      reorder: this.reorder,
      tags: this.selectedTags,
      supplysUsed: this.formData,
      accompaniments: this.selectedAccompaniments,
      createdBy: {
        name: this.comm.getCurrentUser().user.fullname,
        uid: this.comm.getCurrentUser().user.uid,
      },
      restaurant: {
        name: this.comm.getCurrentRestaurant().name,
        uid: this.comm.getCurrentRestaurant().uid,
      },
      extras: [],
      createdAt: serverTimestamp(),
    };
    console.log('param', param);
    this.api
      .create('foods',param)
      .then(
        (data) => {
          this.loading = false;
          console.log(data);
          this.comm.openSnackBar('Success Food added ');

          this.navCtrl.back();
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.error(error);
        }
      )
      .catch((error) => {
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
    return cover ? cover : 'assets/images/food.jpg';
  }

  getDates(date) {
    this.comm.getDate(date);
  }

  getFoods() {
    this.api.getFoods(this.comm.getCurrentRestaurant().uid)
      .subscribe((data) => {
        console.log(data);
        data.forEach((element: any) => {
          this.dropdownList.push(element.name);
        });
        this.dropdownList = [...this.dropdownList];
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      console.log('data=>', data);
      this.new = data.new === 'true' ? true : false;
      console.log(this.new);  
        this.getSupplies();     
           
        this.uomList = [{ name: 'Portion' }, { name: 'Plate' }];

        this.selectedAccompaniments = [];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
        };
       
      });
    
  }
  getSupplies() {
    this.api.getSupplies(this.comm.getCurrentRestaurant().uid)
    .subscribe((data) => {
      console.log(data);
      this.options = [...data];
    });
}

  preview_banner(files: any, path: string) {
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
        () => {},
        (error) => {
          this.loading = false;
          this.error('Something went wrong');
          // this.api.alerts('Error', 'Something went wrong', 'error');
          console.error(error);
        },
        () => {
          storageRef.getDownloadURL().subscribe(
            (downloadURL) => {
              console.log('download ur', downloadURL);

              this.foodImage = downloadURL;

              this.loading = false;
            },
            (error) => {
              this.loading = false;
              this.error('Something went wrong');
              console.error('upload rejected', error);
            }
          );
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

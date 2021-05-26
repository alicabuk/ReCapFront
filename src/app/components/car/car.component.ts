import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { City } from 'src/app/models/city';
import { BrandService } from 'src/app/services/brand.service';
import { CityService } from 'src/app/services/city.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  brands:Brand[]=[];
  cities:City[]=[];
  filterForm:FormGroup;
  cars:Car[]=[];
  dataLoaded=false;
  imageUrl="https://localhost:44374/";

  constructor(private carService:CarService,private activatedRoot:ActivatedRoute,
    private brandService:BrandService,
    private cityService:CityService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {    
    
    this.getBrands();
    this.getCities();
    this.createFilterForm();
    this.activatedRoot.params.subscribe(params=>{    
        this.getCarsDetails();       
    })
  }  

  getCarsDetails(){
    this.carService.getCarsDetails().subscribe(response=>{           
      this.cars=response.data;
      this.dataLoaded=true;      
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
  getCities(){
    this.cityService.getCities().subscribe(response=>{
      this.cities=response.data
    })
  }
  createFilterForm(){
    this.filterForm=this.formBuilder.group({
      brandId: ["",Validators.required],
      cityId: ["",Validators.required],
      minPrice: [null,Validators.required],
      maxPrice: [null,Validators.required]
    });
  }
  clear(){
   this.filterForm.reset(); 
  }
}

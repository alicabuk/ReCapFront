import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  car:Car;
  carImages:CarImage[]=[];
  imageUrl="https://localhost:44374/";

  constructor(private activatedRoot: ActivatedRoute,
    private carDetailService:CarImagesService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe((params) => {
      if (params['carId']) {
         this.getImagesByCarId(params['carId']);
         this.getCarDetailById(params['carId']);
      }
   });
  }
  getImagesByCarId(carId:number){
    this.carDetailService.getCarImages(carId).subscribe(response=>{    
      this.carImages=response.data; 
      console.log(this.carImages)

    })
  }
  getCarDetailById(id:number){
    this.carService.getCarsDetails().subscribe(response => {
      this.car =  response.data.find(car => car.carId == id);
   });
  }
  getCurrentSliderImageClass(sliderImage: CarImage): string {
    if (this.carImages[0] === sliderImage) {
       return 'carousel-item active';
    }

    return 'carousel-item';
 }
  
}

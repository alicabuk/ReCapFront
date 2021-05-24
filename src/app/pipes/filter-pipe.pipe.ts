import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], brandName : string, cityName : string, minPrice : number, maxPrice : number): Car[] {
    // let transformCar:Car[];

    brandName = brandName?brandName.toLocaleLowerCase():"";
    cityName = cityName?cityName.toLocaleLowerCase():"";
    minPrice = minPrice?minPrice:null;
    maxPrice = maxPrice?maxPrice:null;

    if (brandName){
      value=value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(brandName)!==-1);
    } 
    if (cityName){
      value=value.filter((c:Car)=>c.cityName.toLocaleLowerCase().indexOf(cityName)!==-1);
    }
    if (minPrice !== null){
      value=value.filter((c:Car)=>c.dailyPrice>minPrice);
    }
    if (maxPrice !== null){
      value=value.filter((c:Car)=>c.dailyPrice<maxPrice);
    }

    return value;
  }

}

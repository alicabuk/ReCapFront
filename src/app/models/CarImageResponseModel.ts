import { CarImage } from "./carImage";
import { ResponseModel } from "./ResponseModel";

export interface CarImageResponseModel extends ResponseModel{
    data:CarImage[];
}
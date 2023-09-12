import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarbonFootprint, CarbonFootprintMonthly } from '../models/carbon-footprint.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {

  constructor(private http:HttpClient) { }

  getCarbonFootprintForUser(username:string) {
    const reqParams = {
      "username": username
    }
    return this.http.get<CarbonFootprint[]>(`/user/api/carbon-footprint`,{params:reqParams});
  }

  postCarbonFootprint(carbon:CarbonFootprint, type:string) {
    const reqParams = {
      "type": type
    }
    return this.http.post(`/api/footprint`,carbon,{params:reqParams});
  }

  getCarbonFootprintsByMonthAndYear(startDate:string,endDate:string) {
    const reqParams = {
      "startDate": startDate,
      "endDate": endDate
    }

    return this.http.get<CarbonFootprintMonthly[]>(`/api/footprint/monthly`,{params:reqParams});
  }
  getTopEmissions(startDate:string,endDate:string) {
    const reqParams = {
      "startDate": startDate,
      "endDate": endDate
    }

    return this.http.get(`/api/footprint/topEmissions`,{params:reqParams});
  }
}

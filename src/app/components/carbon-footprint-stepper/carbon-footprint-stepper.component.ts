import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CarbonFootprint } from 'src/app/models/carbon-footprint.interface';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';

@Component({
  selector: 'app-carbon-footprint-stepper',
  templateUrl: './carbon-footprint-stepper.component.html',
  styleUrls: ['./carbon-footprint-stepper.component.css']
})
export class CarbonFootprintStepperComponent {
  optionCar: AnimationOptions = {
    path: '/assets/animations/car.json',
  };

  optionTransit: AnimationOptions = {
    path: '/assets/animations/bus.json',
  };

  optionPlane: AnimationOptions = {
    path: '/assets/animations/plane.json',
  };

  optionEnergy: AnimationOptions = {
    path: '/assets/animations/energy.json',
  };

  optionFood: AnimationOptions = {
    path: '/assets/animations/food.json',
  };

  optionFuel: AnimationOptions = {
    path: '/assets/animations/fuel.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }


  carFormGroup = this._formBuilder.group({
    cars: ['', Validators.required],
    carKM: ['', Validators.required],
  });
  publicTransportFormGroup = this._formBuilder.group({
    transit: ['', Validators.required],
    transitKM: ['', Validators.required],
  });
  planeFormGroup = this._formBuilder.group({
    plane: ['', Validators.required],
    planeKM: ['', Validators.required],
  });
  energyFormGroup = this._formBuilder.group({
    energy: ['', Validators.required],
    energyKW: ['', Validators.required],
  });
  foodFormGroup = this._formBuilder.group({
    food: ['', Validators.required],
    foodCalories: ['', Validators.required],
  });
  fuelFormGroup = this._formBuilder.group({
    fuel: ['', Validators.required],
    fuelLiters: ['', Validators.required],
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private carbonService: CarbonFootprintService) { }

  sendCar() {
    const formData = this.carFormGroup.value;
    const vehicleType = formData.cars;
    const vehDistance = formData.carKM;

    if (vehicleType && vehDistance) {

      let carbonBody: CarbonFootprint = {
        distance: vehDistance,
        vehicle: vehicleType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "car").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }

  sendTransit() {
    const formData = this.publicTransportFormGroup.value;
    const transitType = formData.transit;
    const transitDistance = formData.transitKM;

    if (transitType && transitDistance) {

      let carbonBody: CarbonFootprint = {
        distance: transitDistance,
        type: transitType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "public").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }

  sendPlane() {
    const formData = this.planeFormGroup.value;
    const planeType = formData.plane;
    const planeDistance = formData.planeKM;

    if (planeType && planeDistance) {

      let carbonBody: CarbonFootprint = {
        distance: planeDistance,
        type: planeType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "plane").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }

  sendEnergy() {
    const formData = this.energyFormGroup.value;
    const energyType = formData.energy;
    const energyConsumption = formData.energyKW;

    if (energyType && energyConsumption) {

      let carbonBody: CarbonFootprint = {
        consumption: energyConsumption,
        energy: energyType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "energy").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }

  sendFood() {
    const formData = this.foodFormGroup.value;
    const vehicleType = formData.food;
    const vehDistance = formData.foodCalories;

    if (vehicleType && vehDistance) {

      let carbonBody: CarbonFootprint = {
        distance: vehDistance,
        vehicle: vehicleType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "food").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }

  sendFuel() {
    const formData = this.fuelFormGroup.value;
    const fuelType = formData.fuel;
    const fueLiters = formData.fuelLiters;

    if (fuelType && fueLiters) {

      let carbonBody: CarbonFootprint = {
        liters: fueLiters,
        type: fuelType
      }

      this.carbonService.postCarbonFootprint(carbonBody, "fuel").subscribe(date => {
        console.log("DATA", date);
      })

    }
  }
}

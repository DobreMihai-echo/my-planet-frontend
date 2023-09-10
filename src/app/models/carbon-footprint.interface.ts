export class CarbonFootprint {
    distance?: string;
    vehicle?: string;
    type?: string;
    energy?: string;
    consumption?: string;
    liters?: string;
}
export class CarbonFootprintMonthly {
    month: number;
    year: number;
    carEmission: number;
    transitEmission: number;
    planeEmission: number;
    energyEmission: number;
    foodEmission: number;
    fuelEmission: number;
}
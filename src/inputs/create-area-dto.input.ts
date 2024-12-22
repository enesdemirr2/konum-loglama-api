export class CreateAreaDto {
  name: string;

  // GeoJSON formatında bir alan
  coordinates: {
    type: string; // Örneğin: "Polygon"
    coordinates: number[][][]; // GeoJSON'da kullanılan koordinat yapısı
  };
}

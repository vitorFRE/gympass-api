export interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceBetweenCoordinates(
  coordinate1: Coordinate,
  coordinate2: Coordinate
): number {
  const R = 6371e3; // metres
  const φ1 = (coordinate1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coordinate2.latitude * Math.PI) / 180;
  const Δφ = ((coordinate2.latitude - coordinate1.latitude) * Math.PI) / 180;
  const Δλ = ((coordinate2.longitude - coordinate1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c / 1000; // in metres
  return d;
}
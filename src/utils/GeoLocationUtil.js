// @flow

// import MathUtil from './MathUtil';
// const RADIUS_OF_EARTH = 6371;

const DEFAULT_GPS_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000
};

export default class GeoLocationUtil {
    // static getDistanceBetweenPoints(lon1, lat1, lon2, lat2) {
    //     const dLat = MathUtil.degreeToRadius(lat2 - lat1);
    //     const dLon = MathUtil.degreeToRadius(lon2 - lon1);
    //     const verticalLength = Math.sin(dLat * 0.5);
    //     const horizontalLength = Math.sin(dLon * 0.5);
    //
    //     var a = verticalLength * verticalLength +
    //           Math.cos(MathUtil.degreeToRadius(lat1)) * Math.cos(MathUtil.degreeToRadius(lat2)) *
    //           horizontalLength * horizontalLength;
    //
    //     return RADIUS_OF_EARTH * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // }

    static requestGPS(options?: Object): Promise<Position> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (coordinate) => {
                    resolve(coordinate);
                },
                (err: Error) => {
                    reject(err.stack);
                },
                {
                    ...DEFAULT_GPS_OPTIONS,
                    ...options
                }
            );
        });
    }
}

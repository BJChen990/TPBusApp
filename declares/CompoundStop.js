declare type CompoundStop = {
    id: number,
    nameZh: string,
    position: {
        type: string,
        coordinates: [number, number]
    },
    goBack: number,
    stopIds: string,
    routeIds: string
}

declare type Coordinate = {
    longitude: number,
    latitude: number
}

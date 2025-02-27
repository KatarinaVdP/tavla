import { useEffect, useState } from 'react'

import { Coordinates } from '@entur/sdk'
import { Station } from '@entur/sdk/lib/mobility/types'

import service from '../service'
import { useSettingsContext } from '../settings'
import { createAbortController } from '../utils'

async function fetchBikeRentalStationsById(
    allStationIds: string[],
    signal?: AbortSignal,
): Promise<Station[]> {
    return await service.mobility.getStationsById(
        {
            stationIds: allStationIds,
        },
        { signal },
    )
}

async function fetchBikeRentalStationsNearby(
    coordinates: Coordinates,
    distance: number,
    signal?: AbortSignal,
): Promise<Station[]> {
    return await service.mobility.getStations(
        {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            range: distance,
        },
        { signal },
    )
}

const EMPTY_BIKE_RENTAL_STATIONS: Station[] = []

export default function useBikeRentalStations(
    removeHiddenStations = true,
): Station[] | undefined {
    const [settings] = useSettingsContext()
    const [bikeRentalStations, setBikeRentalStations] = useState<
        Station[] | undefined
    >(EMPTY_BIKE_RENTAL_STATIONS)
    const [nearbyStations, setNearbyStations] = useState<
        Station[] | undefined
    >()
    const [userSelectedStations, setUserSelectedStations] = useState<Station[]>(
        [],
    )

    const {
        coordinates,
        distance,
        newStations = [],
        hiddenStations = [],
        hiddenModes,
    } = settings || {}

    const isDisabled = Boolean(hiddenModes?.includes('bysykkel'))

    useEffect(() => {
        const abortController = createAbortController()
        if (!coordinates || !distance || isDisabled) {
            return setBikeRentalStations(EMPTY_BIKE_RENTAL_STATIONS)
        }
        fetchBikeRentalStationsNearby(
            coordinates,
            distance,
            abortController.signal,
        )
            .then((stations) => setNearbyStations(stations || []))
            .catch((error) => {
                if (error.name !== 'AbortError') throw error
            })

        return () => {
            abortController.abort()
        }
    }, [coordinates, distance, isDisabled])

    useEffect(() => {
        const abortController = createAbortController()
        if (isDisabled) {
            return setBikeRentalStations(EMPTY_BIKE_RENTAL_STATIONS)
        }
        fetchBikeRentalStationsById(newStations, abortController.signal)
            .then(setUserSelectedStations)
            .catch((error) => {
                if (error.name !== 'AbortError') throw error
            })
        return () => {
            abortController.abort()
        }
    }, [newStations, isDisabled])

    useEffect(() => {
        if (!nearbyStations) return

        if (isDisabled) {
            return setBikeRentalStations(EMPTY_BIKE_RENTAL_STATIONS)
        }
        const uniqueUserStations = userSelectedStations.filter(
            (userStation) =>
                !nearbyStations.some(
                    (nearbyStation) => nearbyStation.id === userStation.id,
                ),
        )
        setBikeRentalStations([...nearbyStations, ...uniqueUserStations])
    }, [nearbyStations, userSelectedStations, isDisabled])

    if (removeHiddenStations && bikeRentalStations) {
        return bikeRentalStations.filter(
            (station) => !hiddenStations.includes(station.id),
        )
    }

    return bikeRentalStations
}

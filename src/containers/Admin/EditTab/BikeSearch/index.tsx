import React, { useState, useEffect } from 'react'

import { Coordinates, BikeRentalStation } from '@entur/sdk'
import { Dropdown } from '@entur/dropdown'

import service from '../../../../service'

import './styles.scss'

interface Item {
    value: string
    label: string
}

function mapFeaturesToItems(features: BikeRentalStation[]): Item[] {
    return features.map(({ id, name }) => ({
        value: id,
        label: name,
    }))
}

const BikePanelSearch = ({ onSelected, position }: Props): JSX.Element => {
    const [stations, setStations] = useState<BikeRentalStation[]>([])

    useEffect(() => {
        let isMounted = true
        if (position) {
            service
                .getBikeRentalStationsByPosition(position, 100000)
                .then((data) => {
                    if (isMounted) {
                        setStations(data)
                    }
                })
        }
        return () => {
            isMounted = false
        }
    }, [position])

    const getItems = (query: string): Item[] => {
        const inputValue = query.trim().toLowerCase()
        const inputLength = inputValue.length
        if (!inputLength) return []

        return mapFeaturesToItems(
            stations.filter((station) =>
                station.name.toLowerCase().match(new RegExp(inputValue)),
            ),
        )
    }

    const onItemSelected = (item: Item | null): void => {
        if (item) {
            onSelected(item.value)
        }
    }

    return (
        <div className="bike-search">
            <Dropdown
                searchable
                openOnFocus
                placeholder="Søk på bysykkelstativ for å legge til"
                items={getItems}
                onChange={onItemSelected}
                highlightFirstItemOnOpen
            />
        </div>
    )
}

interface Props {
    onSelected: (stationId: string) => void
    position: Coordinates | undefined
}

export default BikePanelSearch

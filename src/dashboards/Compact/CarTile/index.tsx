import React, { useState, useEffect, useMemo } from 'react'

import { colors } from '@entur/tokens'
import { CarIcon } from '@entur/icons'
import { Station } from '@entur/sdk/lib/mobility/types'

import Tile from '../components/Tile'
import TileRow from '../components/TileRow'
import { useSettingsContext } from '../../../settings'
import { IconColorType } from '../../../types'
import { getIconColorType, getTranslation } from '../../../utils'

const CarTile = ({ stations }: Props): JSX.Element => {
    const [settings] = useSettingsContext()

    const [iconColorType, setIconColorType] = useState<IconColorType>(
        IconColorType.CONTRAST,
    )

    useEffect(() => {
        if (settings) {
            setIconColorType(getIconColorType(settings.theme))
        }
    }, [settings])

    return (
        <Tile
            title="Bildeling"
            icons={[
                <CarIcon
                    key="car-icon"
                    color={colors.transport[iconColorType].mobility}
                />,
            ]}
        >
            {stations.map((station) => (
                <TileRow
                    key={station.id}
                    icon={
                        <CarIcon
                            color={colors.transport[iconColorType].mobility}
                        />
                    }
                    label={getTranslation(station.name) || ''}
                    subLabels={[
                        {
                            time:
                                `${station.numBikesAvailable}` +
                                (station.numBikesAvailable === 1
                                    ? ` biler`
                                    : ` biler`),
                            departureTime: new Date(),
                        },
                        {
                            time:
                                `${station.numDocksAvailable}` +
                                (station.numDocksAvailable === 1
                                    ? ` parkering`
                                    : ` parkeringer`),
                            departureTime: new Date(),
                        },
                    ]}
                />
            ))}
        </Tile>
    )
}

interface Props {
    stations: Station[]
}

export default CarTile

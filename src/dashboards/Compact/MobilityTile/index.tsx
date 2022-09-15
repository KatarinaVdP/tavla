import { FormFactor } from '@entur/sdk/lib/mobility/types'
import React from 'react'
import { getStopPlaces } from '../../../logic/getStopPlaces'
import BikeTile from '../../Compact/BikeTile'
import CarTile from '../CarTile'

const MobilityTile = ({ mobilityType }: Props): JSX.Element => {
    const { data, loading, error } = getStopPlaces(mobilityType)

    if (loading) return <div>'Loading...'</div>
    if (error) return <div>`Error! ${error.message}`</div>

    return (
        <>
            {mobilityType === FormFactor.BICYCLE && (
                <BikeTile stations={data?.stations} />
            )}
            {mobilityType === FormFactor.CAR && (
                <CarTile stations={data?.stations} />
            )}
        </>
    )
}

interface Props {
    mobilityType: FormFactor
}

export default MobilityTile

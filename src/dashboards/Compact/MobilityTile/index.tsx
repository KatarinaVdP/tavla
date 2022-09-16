import { SmallAlertBox } from '@entur/alert'
import { Loader } from '@entur/loader'
import { FormFactor } from '@entur/sdk/lib/mobility/types'
import React from 'react'
import { useStopPlaceData } from '../../../logic/useStopPlaceData'
import BikeTile from '../../Compact/BikeTile'
import CarTile from '../CarTile'

const MobilityTile = ({ mobilityType }: Props): JSX.Element => {
    const { data, loading, error } = useStopPlaceData(mobilityType)

    if (loading) return <Loader> Henter data ...</Loader>
    if (error)
        return (
            <div>
                <SmallAlertBox width="fluid" variant="error">
                    Error! ${error.message}
                </SmallAlertBox>
            </div>
        )

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

import React, { useState } from 'react'

import { TextField } from '@entur/form'
import { Heading2 } from '@entur/typography'

import './styles.scss'

const DEFAULT_DISTANCE = 500

const DistanceEditor = () => {
    const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE)
    const [feedback, setFeedback] = useState<string>('')

    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.currentTarget.value)
        if (isNaN(value)) {
            setFeedback('Ugyldig tall')
        } else if (value > 1000 || value < 1) {
            setFeedback('Vennligst velg et tall mellom 1 og 1000')
        } else {
            setFeedback('')
            setDistance(value)
        }
    }

    return (
        <div className="distance-editor">
            <Heading2>Viser kollektivtilbud innenfor</Heading2>
            <div className="distance-editor__textfield-wrapper">
                <TextField
                    className="distance-editor__text-field"
                    label=""
                    defaultValue={DEFAULT_DISTANCE}
                    type="number"
                    onChange={validateInput}
                    append="m"
                    feedback={feedback}
                    variant={feedback ? 'error' : 'info'}
                />
            </div>
            <Heading2>
                {/* rundt {locationName?.split(',')[0]} */}
                rundt Oslo
            </Heading2>
            {distance}
        </div>
    )
}

export default DistanceEditor

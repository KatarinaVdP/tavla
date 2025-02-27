import React from 'react'

import { CloseIcon } from '@entur/icons'

import './styles.scss'

interface Props {
    onClick: () => void
}

const CloseButton = ({ onClick }: Props): JSX.Element => (
    <button className="close-button" onClick={onClick}>
        <CloseIcon className="icon" />
        Lukk
    </button>
)

export default CloseButton

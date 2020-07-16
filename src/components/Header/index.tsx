import React from 'react'

import { Contrast } from '@entur/layout'

import { DashboardHeader } from './DashboardHeader'
import { DefaultHeader } from './DefaultHeader'

import './styles.scss'

function Header({ theme }: Props): JSX.Element {
    const path = window.location.pathname.split('/')[1]
    const featureToggleDisplayHeader = path == '' || path == 'privacy'
    if (featureToggleDisplayHeader) return null

    const onDashboard = path == 't' || path == 'dashboard'
    const header = onDashboard ? (
        <DashboardHeader theme={theme} />
    ) : (
        <DefaultHeader theme={theme} />
    )

    return <Contrast>{header}</Contrast>
}

interface Props {
    theme?: 'dark' | 'light' | 'positive' | 'negative'
}

export default Header

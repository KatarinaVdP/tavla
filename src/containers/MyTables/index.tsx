import React, { useEffect, useState } from 'react'

import ThemeContrastWrapper from '../ThemeWrapper/ThemeContrastWrapper'
import { Theme } from '../../types'
import { useSettingsContext } from '../../settings'

import './styles.scss'

const MyTables = ({ history }: Props): JSX.Element => {
    const [settings] = useSettingsContext()

    return (
        <ThemeContrastWrapper useContrast={settings?.theme === Theme.DEFAULT}>
            <div></div>
        </ThemeContrastWrapper>
    )
}

interface Props {
    history: any
}

export default MyTables

import React, { FC, useMemo, useEffect } from 'react'

import { Theme } from '../../types'
import { useSettingsContext } from '../../settings'

type ThemeContextType = {
    themeContext: Theme
}

const ThemeContext = React.createContext<ThemeContextType>({
    themeContext: Theme.DEFAULT,
})

const ThemeProvider: FC = (props): JSX.Element => {
    const [settings] = useSettingsContext()

    const themeContext = settings?.theme || Theme.DEFAULT

    useEffect(() => {
        const themes = [Theme.DARK, Theme.LIGHT, Theme.GREY, Theme.DEFAULT]
        themes.forEach((theme) => {
            document.body.classList.remove(`${theme}-theme`)
        })

        document.body.classList.add(`${themeContext}-theme`)
    }, [settings, themeContext])

    const contextValue = useMemo(
        (): ThemeContextType => ({ themeContext }),
        [themeContext],
    )

    return <ThemeContext.Provider value={contextValue} {...props} />
}

export const useTheme = (): ThemeContextType => React.useContext(ThemeContext)

export default ThemeProvider

import React, { useState, useEffect } from 'react'

import { Heading2, Heading3, Paragraph } from '@entur/typography'

import { useSettingsContext,  } from '../../../settings'
import { saveToLocalStorage, getFromLocalStorage } from '../../../settings/LocalStorage'

import { Theme } from '../../../types'
import RadioCard from '../../../components/RadioCard'
import Grey from '../../../assets/previews/Grey-theme.svg'
import Dark from '../../../assets/previews/Dark-theme.svg'
import Light from '../../../assets/previews/Light-theme.svg'
import Entur from '../../../assets/previews/Entur-theme.svg'

import { getDocumentId } from '../../../utils'

import './styles.scss'
import { FloatingButton, PrimaryButton } from '@entur/button'
import { AddIcon, SubtractIcon } from '@entur/icons'

const ThemeTab = (): JSX.Element => {
    const [radioValue, setRadioValue] = useState<Theme | null>(null)
    const [settings, setSettings] = useSettingsContext()
    const documentId = getDocumentId()
    const [fontScale, setFontScale] = useState(getFromLocalStorage("fontScale") || 1)
    const baseFontSize = 16

    useEffect(() => {
        if (settings?.theme && !radioValue) {
            setRadioValue(settings.theme)
        }
    }, [settings, radioValue])

    const switchTheme = (value: Theme): void => {
        setRadioValue(value)
        setSettings({
            theme: value,
        })
    }

    if (!documentId) {
        return (
            <div className="legacy-theme-tab">
                <Heading2 className="heading">Velg farger</Heading2>
                <Paragraph className="legacy-theme-tab__eds-paragraph">
                    Vi har oppgradert tavla. Ønsker du tilgang på denne
                    funksjonaliteten må du lage en ny tavle.
                </Paragraph>
            </div>
        )
    }

    enum eFontChangeAction {
        increase = 1,
        decrease
    }

    function onChangeFontSize(action: eFontChangeAction) {
        let newFontScale = fontScale

        switch(action){
            case eFontChangeAction.increase:
                newFontScale += 0.5
                break

            case eFontChangeAction.decrease:
                newFontScale = (newFontScale - 0.5) || 0.5
                break
            
            default:
                break
        }

        setFontScale(newFontScale)
        saveToLocalStorage("fontScale", newFontScale)
    }

    return (
        <div>
            <Heading2 className="heading">
                Tilpass utseende
            </Heading2>
            <Heading3 className="heading">Velg farger</Heading3>
            <div className="theme-tab">
                <RadioCard
                    title="Entur (standard)"
                    cardValue="default"
                    preview={Entur}
                    selected={radioValue === 'default'}
                    callback={(val): void => switchTheme(val as Theme)}
                    className="theme-tab__theme-card"
                />
                <RadioCard
                    title="Mørkt"
                    cardValue="dark"
                    preview={Dark}
                    selected={radioValue === 'dark'}
                    callback={(val): void => switchTheme(val as Theme)}
                    className="theme-tab__theme-card"
                />
                <RadioCard
                    title="Lyst"
                    cardValue="light"
                    preview={Light}
                    selected={radioValue === 'light'}
                    callback={(val): void => switchTheme(val as Theme)}
                    className="theme-tab__theme-card"
                />
                <RadioCard
                    title="Grått"
                    cardValue="grey"
                    preview={Grey}
                    selected={radioValue === 'grey'}
                    callback={(val): void => switchTheme(val as Theme)}
                    className="theme-tab__theme-card"
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", width: "17%"}}>
                <div><Heading3 className="heading">Velg tekststørrelse</Heading3></div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                    <FloatingButton onClick={() => onChangeFontSize(eFontChangeAction.decrease)} style={{width: "11rem", minWidth: "8rem"}} aria-label="Mindre">Mindre<SubtractIcon/></FloatingButton>
                    <text style={{margin: "2rem"}}>{fontScale*100}%</text>
                    <FloatingButton onClick={() => onChangeFontSize(eFontChangeAction.increase)} style={{width: "11rem", minWidth: "8rem"}} aria-label="Større">Større<AddIcon/></FloatingButton>
                </div>
                <div style={{fontSize:fontScale*baseFontSize}}>Her kommer forhåndsvisning: </div>
            </div>
        </div>
    )

}

export default ThemeTab

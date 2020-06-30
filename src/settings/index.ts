import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from 'react'
import { useLocation } from 'react-router-dom'
import { LegMode, Coordinates } from '@entur/sdk'

import { useIsFirebaseInitialized } from '../firebase-init'
import { updateSettingField } from '../services/firebase'
import { persist, restore } from './UrlStorage'

// Matches the ID in an URL, if it exists.
const ID_REGEX = /\/(?:t|(?:admin))\/(.+)(?:\/)?/

export interface Settings {
    coordinates?: Coordinates
    hiddenStations: Array<string>
    hiddenStops: Array<string>
    hiddenModes: Array<LegMode>
    hiddenRoutes: {
        [stopPlaceId: string]: Array<string>
    }
    distance?: number
    newStations?: Array<string>
    newStops?: Array<string>
    dashboard?: string | void
}

interface SettingsSetters {
    setHiddenStations: (
        hiddenStations: Array<string>,
        options?: SetOptions,
    ) => void
    setHiddenStops: (hiddenStops: Array<string>, options?: SetOptions) => void
    setHiddenModes: (hiddenModes: Array<LegMode>, options?: SetOptions) => void
    setHiddenRoutes: (
        hiddenModes: { [stopPlaceId: string]: Array<string> },
        options?: SetOptions,
    ) => void
    setDistance: (distance: number, options?: SetOptions) => void
    setNewStations: (newStations: Array<string>, options?: SetOptions) => void
    setNewStops: (newStops: Array<string>, options?: SetOptions) => void
    setDashboard: (dashboard: string, options?: SetOptions) => void
}

interface SetOptions {
    persist?: boolean
}

type Persistor = () => void

export const SettingsContext = createContext<
    [Settings | null, SettingsSetters, Persistor]
>([
    null,
    {
        setHiddenStations: (): void => undefined,
        setHiddenStops: (): void => undefined,
        setHiddenModes: (): void => undefined,
        setHiddenRoutes: (): void => undefined,
        setDistance: (): void => undefined,
        setNewStations: (): void => undefined,
        setNewStops: (): void => undefined,
        setDashboard: (): void => undefined,
    },
    (): void => console.log('Persistor not set up yet'), // eslint-disable-line no-console
])

export function useSettingsContext(): [Settings, SettingsSetters, Persistor] {
    return useContext(SettingsContext)
}

const getDocumentId = (): string | undefined => {
    const id = window.location.pathname.match(ID_REGEX)

    if (id) {
        return id[1]
    }
}

export function useSettings(): [Settings, SettingsSetters, Persistor] {
    const [settings, setSettings] = useState<Settings>()

    const documentId = getDocumentId()

    const firebaseInitialized = useIsFirebaseInitialized()

    const location = useLocation()

    useEffect(() => {
        if (location.pathname == '/' || !firebaseInitialized) return

        async function loadSettings(): Promise<void> {
            const settings = await restore(documentId)

            if (!settings.coordinates) {
                const positionArray = location.pathname
                    .split('/')[2]
                    .split('@')[1]
                    .split('-')
                    .join('.')
                    .split(/,/)
                
                settings.coordinates = {
                    latitude: Number(positionArray[0]),
                    longitude: Number(positionArray[1]),
                }
            }

            setSettings(await restore(documentId))
        }

        loadSettings()
    }, [firebaseInitialized, location, documentId])

    const persistSettings = useCallback(() => {
        persist(settings, getDocumentId())
    }, [settings])

    const set = useCallback(
        <T>(key: string, value: T, options?: SetOptions): void => {
            const newSettings = { ...settings, [key]: value }
            setSettings(newSettings)
            if (options && options.persist) {
                persist(newSettings, getDocumentId())
            }
        },
        [settings],
    )

    const setHiddenStations = useCallback(
        (newHiddenStations: Array<string>, options?: SetOptions): void => {
            if (!documentId) {
                set('hiddenStations', newHiddenStations, options)
                return
            }

            updateSettingField(
                documentId,
                'hiddenStations',
                newHiddenStations,
            ).then(() => set('hiddenStations', newHiddenStations, options))
        },
        [set, documentId],
    )

    const setHiddenStops = useCallback(
        (newHiddenStops: Array<string>, options?: SetOptions): void => {
            if (!documentId) {
                set('hiddenStops', newHiddenStops, options)
                return
            }

            updateSettingField(
                documentId,
                'hiddenStops',
                newHiddenStops,
            ).then(() => set('hiddenStops', newHiddenStops, options))
        },
        [set, documentId],
    )

    const setHiddenModes = useCallback(
        (newHiddenModes: Array<LegMode>, options?: SetOptions): void => {
            if (!documentId) {
                set('hiddenModes', newHiddenModes, options)
                return
            }

            updateSettingField(
                documentId,
                'hiddenModes',
                newHiddenModes,
            ).then(() => set('hiddenModes', newHiddenModes, options))
        },
        [set, documentId],
    )

    const setHiddenRoutes = useCallback(
        (
            newHiddenRoutes: { [stopPlaceId: string]: Array<string> },
            options?: SetOptions,
        ): void => {
            if (!documentId) {
                set('hiddenRoutes', newHiddenRoutes, options)
                return
            }

            updateSettingField(
                documentId,
                'hiddenRoutes',
                newHiddenRoutes,
            ).then(() => set('hiddenRoutes', newHiddenRoutes, options))
        },
        [set, documentId],
    )

    const setDistance = useCallback(
        (newDistance: number, options?: SetOptions): void => {
            if (!documentId) {
                set('distance', newDistance, options)
                return
            }

            updateSettingField(
                documentId,
                'distance',
                newDistance,
            ).then(() => set('distance', newDistance, options))
        },
        [set, documentId],
    )

    const setNewStations = useCallback(
        (newStations: Array<string>, options?: SetOptions): void => {
            if (!documentId) {
                set('newStations', newStations, options)
                return
            }

            updateSettingField(
                documentId,
                'newStations',
                newStations,
            ).then(() => set('newStations', newStations, options))
        },
        [set, documentId],
    )

    const setNewStops = useCallback(
        (newStops: Array<string>, options?: SetOptions): void => {
            if (!documentId) {
                set('newStops', newStops, options)
                return
            }

            updateSettingField(documentId, 'newStops', newStops).then(() =>
                set('newStops', newStops, options),
            )
        },
        [set, documentId],
    )

    const setDashboard = useCallback(
        (dashboard: string, options?: SetOptions): void => {
            if (!documentId) {
                set('dashboard', dashboard, options)
                return
            }

            updateSettingField(documentId, 'dashboard', dashboard).then(() =>
                set('dashboard', dashboard, options),
            )
        },
        [set, documentId],
    )

    const setters = {
        setHiddenStations,
        setHiddenStops,
        setHiddenModes,
        setHiddenRoutes,
        setDistance,
        setNewStations,
        setNewStops,
        setDashboard,
    }

    return [settings, setters, persistSettings]
}

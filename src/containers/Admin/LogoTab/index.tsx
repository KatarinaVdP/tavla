import React, { useState, useEffect } from 'react'

import {
    Heading2,
    Paragraph,
    UnorderedList,
    ListItem,
    Heading4,
    Link,
} from '@entur/typography'
import { GridItem, GridContainer } from '@entur/grid'

import { useFirebaseAuthentication } from '../../../auth'

import LoginModal from '../LoginModal'
import LogoUpload from './LogoUpload'
import SizePicker from './SizePicker'
import Description from './Description'

const Requirements = (): JSX.Element => (
    <>
        <Heading4>Krav til logo for best resultat</Heading4>
        <UnorderedList>
            <ListItem>
                Logo bør lastes opp med transparent bakgrunn i .png eller
                .svg-format.
            </ListItem>
            <ListItem>
                Ha god nok kontrast til bakgrunnen i valgt fargetema. Vi
                anbefaler å bruke en lys eller hvit logo på de mørke temaene, og
                farget/sort logo på lys bakgrunn for å sikre krav til universell
                utforming. Om du er i tvil kan du sjekke kontrasten{' '}
                <Link href="https://webaim.org/resources/contrastchecker">
                    her
                </Link>
                .
            </ListItem>
            <ListItem>
                For å unngå en pikslete logo, bør den lastes opp i dobbel
                størrelse som høyden i valgt logostørrelse. Minste høyde på
                filen bør derfor være 64 piksler. Ved stor logo bør filen være
                minst 112px høy.
            </ListItem>
        </UnorderedList>
    </>
)

const LogoTab = ({ tabIndex, setTabIndex }: Props): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const user = useFirebaseAuthentication()

    useEffect((): void => {
        if (tabIndex === 1 && user && user.isAnonymous) {
            setOpen(true)
        }

        if (user && !user.isAnonymous) {
            setOpen(false)
        }
    }, [user, tabIndex])

    const handleModal = (): void => {
        setOpen(false)
        if (!(user && !user.isAnonymous)) {
            setTabIndex()
        }
    }

    return (
        <>
            <LoginModal onDismiss={handleModal} open={open} />
            <Heading2>Last opp logo</Heading2>
            <GridContainer spacing="small">
                <GridItem small={6}>
                    <Paragraph>
                        Her kan du legge inn egen logo på din tavle. Logoen vil
                        være plassert i øverste venstre hjørne, og ha en høyde
                        på 32 piksler som standard. Du kan velge å sette
                        størrelsen til stor logo (56px), men da vil du ikke
                        kunne legge til en beskrivelse av avgangstavla.
                    </Paragraph>
                    <Requirements />
                    <LogoUpload />
                    <SizePicker />
                </GridItem>
                <GridItem small={6}>
                    <Description />
                </GridItem>
            </GridContainer>
        </>
    )
}

interface Props {
    tabIndex: number
    setTabIndex: () => void
}

export default LogoTab

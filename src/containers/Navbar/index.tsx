import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import firebase from 'firebase/app'

import { useToast } from '@entur/alert'
import { TopNavigationItem } from '@entur/menu'
import { UserIcon, LogOutIcon, GithubIcon, PrivacyIcon } from '@entur/icons'

import { TavlaLogo } from '../../assets/icons'
import LoginModal from '../../components/LoginModal'

import { useUser } from '../../auth'

import './styles.scss'

export default function Navbar(): JSX.Element {
    const location = useLocation()
    const [displayLoginModal, setDisplayLoginModal] = useState<boolean>(false)
    const user = useUser()
    const userLoggedIn = user && !user.isAnonymous
    const { addToast } = useToast()

    const login = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ): void => {
        event.preventDefault()
        setDisplayLoginModal(true)
    }

    const logout = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ): void => {
        event.preventDefault()
        firebase.auth().signOut()
        setDisplayLoginModal(false)
        addToast({
            title: 'Logget ut',
            content: 'Du er nå logget ut av din konto.',
            variant: 'success',
        })
    }

    const loginModal = !userLoggedIn ? (
        <LoginModal
            open={displayLoginModal}
            onDismiss={(): void => setDisplayLoginModal(false)}
            loginCase="default"
        />
    ) : null

    const userItem = userLoggedIn ? (
        <li>
            <TopNavigationItem onClick={logout}>
                <span>Logg ut</span>
                <LogOutIcon />
            </TopNavigationItem>
        </li>
    ) : (
        <li>
            <TopNavigationItem onClick={login}>
                <span>Logg inn</span>
                <UserIcon />
            </TopNavigationItem>
        </li>
    )

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <Link to="/">
                    <TavlaLogo
                        className="landing-page__logo"
                        forceColor="white"
                    />
                </Link>
            </div>
            <div className="navbar__right">
                <ul>
                    {location.pathname === '/tavler' ? (
                        userItem
                    ) : (
                        <li>
                            <TopNavigationItem as={Link} to="/tavler">
                                <span>Mine tavler</span>
                                <UserIcon />
                            </TopNavigationItem>
                        </li>
                    )}
                    <li>
                        <TopNavigationItem
                            as={Link}
                            to="/privacy"
                            active={location.pathname === '/privacy'}
                        >
                            <span>Informasjonskapsler</span>
                            <PrivacyIcon />
                        </TopNavigationItem>
                    </li>
                    <li>
                        <TopNavigationItem
                            as="a"
                            href="https://github.com/entur/tavla"
                        >
                            <span>GitHub</span>
                            <GithubIcon />
                        </TopNavigationItem>
                    </li>
                </ul>
            </div>
            {loginModal}
        </nav>
    )
}

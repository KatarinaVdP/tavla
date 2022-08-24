import { SubwayIcon } from '@entur/icons'
import { TransportMode } from '@entur/sdk/lib/journeyPlanner/types'
import { colors } from '@entur/tokens'
import { Heading3, Paragraph } from '@entur/typography'
import { format, formatISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import React, { Fragment, useEffect } from 'react'
import PlatformInfo from '../../../../dashboards/Compact/components/TileRow/PlatformInfo'
import { getFromLocalStorage } from '../../../../settings/LocalStorage'
import { IconColorType, TileSubLabel } from '../../../../types'
import { getIcon, isMobileWeb } from '../../../../utils'
import './styles.scss'

const isMobile = isMobileWeb()

const now = new Date()
let oneWeekFromNow: Date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 7,
)

export function FontSizePreview(props: any): JSX.Element {
    const subLabels = [
        {
            departureTime: oneWeekFromNow,
            hasCancellation: false,
            situation: undefined,
            time: 'Nå',
        },
        {
            departureTime: oneWeekFromNow,
            hasCancellation: false,
            situation: undefined,
            time: '4 min',
        },
        {
            departureTime: oneWeekFromNow,
            hasCancellation: false,
            situation: undefined,
            time: '13 min',
        },
        {
            departureTime: oneWeekFromNow,
            hasCancellation: false,
            situation: undefined,
            time: '10:05',
        },
        {
            departureTime: oneWeekFromNow,
            hasCancellation: false,
            situation: undefined,
            time: '10:13',
        },
    ]

    useEffect(() => {
        let tileElement = document.getElementById('tile-tilerow')
        let fontSize =
            ((getFromLocalStorage(props.boardId + '-fontScale') as number) ||
                1) *
                16 +
            'px'
        console.log('fontsize', fontSize)
        if (tileElement != undefined) {
            tileElement.style.fontSize = fontSize
        }
        console.log('tilelemenet<: ', tileElement)
    }, [getFromLocalStorage(props.boardId + '-fontScale')])

    return (
        <div>
            <Paragraph>Forhåndsvisning av tekstørrelsen:</Paragraph>
            <div className="tile" id="tile-preview">
                <div id="tile-tilerow" className="tilerow">
                    <div className="tilerow__icon">
                        <SubwayIcon
                            color={
                                colors.transport[IconColorType.CONTRAST].metro
                            }
                        ></SubwayIcon>
                    </div>
                    <div className="tilerow__texts">
                        <Heading3 className="tilerow__label">
                            1 Bergkrystallen
                        </Heading3>
                        <PlatformInfo platform={'1'} type={'Spor'} />
                        <div className="tilerow__sublabels">
                            {subLabels.map((subLabel, index) => {
                                const nextLabel: TileSubLabel | undefined =
                                    subLabels[index + 1]

                                const isLastDepartureOfDay = false

                                const showDate = false

                                const isoDate = formatISO(
                                    subLabel.departureTime,
                                )

                                return (
                                    <Fragment key={index}>
                                        <div className="tilerow__sublabel">
                                            <time dateTime={isoDate}>
                                                {subLabel.time}
                                            </time>

                                            {showDate && (
                                                <PreviewDate
                                                    date={
                                                        subLabel.departureTime
                                                    }
                                                />
                                            )}
                                        </div>
                                        {isLastDepartureOfDay && <Divider />}
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Divider() {
    return <div role="separator" className="tilerow__sublabel__divider"></div>
}

function PreviewDate({ date }: { date: Date }) {
    const formatedDate = format(date, 'd. MMMM', { locale: nb })

    return <div className="tilerow__sublabel__date">{`(${formatedDate})`}</div>
}

export default FontSizePreview

import { SubwayIcon } from "@entur/icons"
import { colors } from "@entur/tokens"
import { Paragraph } from "@entur/typography"
import React, { Fragment, useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { getFromLocalStorage } from "../../../../settings/LocalStorage"
import { IconColorType } from "../../../../types"
import "./styles.scss"

// const BREAKPOINTS = {
//     lg: 1200,
//     md: 996,
//     sm: 768,
//     xs: 480,
//     xxs: 0,
// }

// const COLS: { [key: string]: number } = {
//     lg: 3,
//     md: 2,
//     sm: 2,
//     xs: 1,
//     xxs: 1,
// }

// function getDefaultBreakpoint() {
//     if (window.innerWidth > BREAKPOINTS.lg) {
//         return 'lg'
//     } else if (window.innerWidth > BREAKPOINTS.md) {
//         return 'md'
//     }
//     return 'sm'
// }

// const [breakpoint, setBreakpoint] = useState<string>(getDefaultBreakpoint())
// const maxWidthCols = COLS[breakpoint] || 1

const FontSizePreview = () => {
    const boardId = useRouteMatch<{ documentId: string }>('/admin/:documentId')?.params?.documentId
    const [baseFontSize, setBaseFontSize] = useState(16)

    useEffect(() => {
        const fontScale = getFromLocalStorage(boardId + "-fontScale") as number
        const updatedFontSize = fontScale * 16
        setBaseFontSize(updatedFontSize)
    }, [getFromLocalStorage(boardId + '-fontScale')])

    const subLabels = [{time: 'Nå'}, {time: '4 min'}, {time: '13 min'}, {time: '10:05'}, {time: '10:13'}]

    return (
        <div>
        <Paragraph className="introductoryText">Forhåndsvisning av tekstørrelsen:</Paragraph>
            <div className="tilePreview" style={{fontSize: baseFontSize}}>
                <div className="tilePreview__tileRow">
                    <div className="tilePreview__icon">
                        <SubwayIcon color={colors.transport[IconColorType.CONTRAST].metro}/>
                    </div>
                    <div className = "tilePreview__texts">
                    <div className="tilePreview__label">
                        1 Bergkrystallen
                    </div>
                    <div className="tilePreview__platform-info">Spor 1</div>
                        <div className="tilePreview__sublabels">
                            {subLabels.map((subLabel, index) => {
                                const nextLabel = subLabels[index + 1]

                                return (
                                    <Fragment key={index}>
                                        <div className="tilePreview__sublabel">
                                            {subLabel.time}
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default FontSizePreview

// import { SubwayIcon } from '@entur/icons'
// import { TransportMode } from '@entur/sdk/lib/journeyPlanner/types'
// import { colors } from '@entur/tokens'
// import { Heading3, Paragraph } from '@entur/typography'
// import { format, formatISO } from 'date-fns'
// import { nb } from 'date-fns/locale'
// import React, { Fragment, useEffect } from 'react'
// import PlatformInfo from '../../../../dashboards/Compact/components/TileRow/PlatformInfo'
// import { getFromLocalStorage } from '../../../../settings/LocalStorage'
// import { IconColorType, TileSubLabel } from '../../../../types'
// import { getIcon, isMobileWeb } from '../../../../utils'
// import './styles.scss'

// const isMobile = isMobileWeb()

// const now = new Date()
// let oneWeekFromNow: Date = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate() + 7,
// )

// export function FontSizePreview(props: any): JSX.Element {
//     const subLabels = [
//         {
//             departureTime: oneWeekFromNow,
//             hasCancellation: false,
//             situation: undefined,
//             time: 'Nå',
//         },
//         {
//             departureTime: oneWeekFromNow,
//             hasCancellation: false,
//             situation: undefined,
//             time: '4 min',
//         },
//         {
//             departureTime: oneWeekFromNow,
//             hasCancellation: false,
//             situation: undefined,
//             time: '13 min',
//         },
//         {
//             departureTime: oneWeekFromNow,
//             hasCancellation: false,
//             situation: undefined,
//             time: '10:05',
//         },
//         {
//             departureTime: oneWeekFromNow,
//             hasCancellation: false,
//             situation: undefined,
//             time: '10:13',
//         },
//     ]

//     useEffect(() => {
//         let tileElement = document.getElementById('tile-tilerow')
//         let fontSize =
//             ((getFromLocalStorage(props.boardId + '-fontScale') as number) ||
//                 1) *
//                 16 +
//             'px'
//         console.log('fontsize', fontSize)
//         if (tileElement != undefined) {
//             tileElement.style.fontSize = fontSize
//         }
//         console.log('tilelemenet<: ', tileElement)
//     }, [getFromLocalStorage(props.boardId + '-fontScale')])

//     return (
//         <div>
//             <Paragraph>Forhåndsvisning av tekstørrelsen:</Paragraph>
//             <div className="tilePreview" id="tile-preview">
//                 <div id="tile-tilerow" className="tilerowPreview">
//                     <div className="tilerowPreview__icon">
//                         <SubwayIcon
//                             color={
//                                 colors.transport[IconColorType.CONTRAST].metro
//                             }
//                         ></SubwayIcon>
//                     </div>
//                     <div className="tilerowPreview__texts">
//                         <Heading3 className="tilerowPreview__label">
//                             1 Bergkrystallen
//                         </Heading3>
//                         <PlatformInfo platform={'1'} type={'Spor'} />
//                         <div className="tilerowPreview__sublabels">
//                             {subLabels.map((subLabel, index) => {
//                                 const nextLabel: TileSubLabel | undefined =
//                                     subLabels[index + 1]

//                                 const isLastDepartureOfDay = false

//                                 const showDate = false

//                                 const isoDate = formatISO(
//                                     subLabel.departureTime,
//                                 )

//                                 return (
//                                     <Fragment key={index}>
//                                         <div className="tilerowPreview__sublabel">
//                                             <time dateTime={isoDate}>
//                                                 {subLabel.time}
//                                             </time>

//                                             {showDate && (
//                                                 <PreviewDate
//                                                     date={
//                                                         subLabel.departureTime
//                                                     }
//                                                 />
//                                             )}
//                                         </div>
//                                         {isLastDepartureOfDay && <Divider />}
//                                     </Fragment>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function Divider() {
//     return <div role="separator" className="tilerowPreview__sublabel__divider"></div>
// }

// function PreviewDate({ date }: { date: Date }) {
//     const formatedDate = format(date, 'd. MMMM', { locale: nb })

//     return <div className="tilerowPreview__sublabel__date">{`(${formatedDate})`}</div>
// }

// export default FontSizePreview

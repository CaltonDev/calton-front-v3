import {
    forceCenter,
    forceCollide,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
} from 'd3-force'
import { select } from 'd3-selection'
import React, { useEffect, useState } from 'react'
import { interpolate } from './timings'
import BubbleDrawer from './BubbleDrawer'
import { generateNodes } from './nodes'
import 'react-bubble-ui/dist/index.css'

function BubbleChart(props) {
    const {
        // eslint-disable-next-line react/prop-types
        bubbles,
        // eslint-disable-next-line react/prop-types
        scale,
        // eslint-disable-next-line react/prop-types
        height,
        // eslint-disable-next-line react/prop-types
        width,
        // eslint-disable-next-line react/prop-types
        onBubbleClick,
        // eslint-disable-next-line react/prop-types
        onBubbleHover,
        // eslint-disable-next-line react/prop-types
        onBubbleFocus,
        // eslint-disable-next-line react/prop-types
        type,
        // eslint-disable-next-line react/prop-types
        heading,
    } = props
    const [svg, setSvg] = useState(null)
    const [simulation, setSimulation] = useState(null)
    const [bubbleDrawer, setBubbleDrawer] = useState(null)
    const [center, setCenter] = useState({ x: 500, y: 300 })

    useEffect(() => {
        if (svg) {
            let tmpSvg = JSON.parse(JSON.stringify(svg))
            tmpSvg = tmpSvg.append('g')
            setSvg(tmpSvg)
        }
        let tmpCenter = JSON.parse(JSON.stringify(center))
        tmpCenter.x = width / 2
        tmpCenter.y = height / 2
        setCenter(tmpCenter)
        renderSimulation()
    }, [])

    useEffect(() => {
        renderSimulation()
    }, [svg])

    useEffect(() => {
        if (bubbleDrawer) {
            bubbleDrawer.draw(simulation)

            if (type) {
                joinBubblesByType()
            } else {
                joinBubbles()
            }
        }
    }, [bubbleDrawer])

    useEffect(() => {
        if (type) {
            joinBubblesByType()
        } else {
            joinBubbles()
        }
        bubbleDrawer && setBubbleDrawer(type)
    }, [type])

    const setSVGRef = (passedSvg) => {
        if (passedSvg && !svg) {
            setSvg(select(passedSvg))
        }
    }

    const defaultCharge = (d) => -0.07 * Math.pow(d.r, 2.0)
    const weakCharge = (d) => -0.078 * Math.pow(d.r, 2.0)

    const getMasteryGroups = () => {
        const target = width / 2
        const outsidePosX = {
            positive: width + center.x,
            negative: -center.x,
            neutral: center.x,
        }

        return {
            positive: type === 'positive' ? target : outsidePosX.positive,
            negative: type === 'negative' ? target : outsidePosX.negative,
            neutral: type === 'neutral' ? target : outsidePosX.neutral,
        }
    }

    const joinBubbles = () => {
        const forceStrength = 0.04
        const targetY = {
            positive: center.y - interpolate(scale / 20, 15, 50),
            negative: center.y + interpolate(scale / 20, 15, 50),
            neutral: center.y + interpolate(scale / 20, 5, 15),
        }

        bubbleDrawer && bubbleDrawer.highlightType()

        simulation &&
            simulation
                .alpha(0.85)
                .alphaDecay(0.00358)
                .alphaTarget(0)
                .alphaMin(0.15)
                .velocityDecay(0.11)
                .force('collide', null)
                .force('center', forceCenter(width / 2, height / 2))
                .force('charge', forceManyBody().strength(defaultCharge))
                .force('x', forceX().strength(forceStrength).x(center.x))
                .force(
                    'y',
                    forceY()
                        .strength(forceStrength + 0.015)
                        .y((d) => targetY[d.mastery])
                )
                .restart()
    }

    const joinBubblesByType = () => {
        if (!simulation) return
        const forceStrength = 0.04
        const groups = getMasteryGroups()
        const offset = 20

        bubbleDrawer && bubbleDrawer.highlightType(type)

        simulation &&
            simulation
                .alpha(1)
                .alphaDecay(0.025)
                .alphaTarget(0)
                .alphaMin(0)
                .velocityDecay(0.13)

                .force(
                    'x',
                    forceX()
                        .strength(forceStrength)
                        .x((d) => groups[d.mastery] + offset)
                )
                .force(
                    'y',
                    forceY()
                        .strength(forceStrength + 0.002)
                        .y(center.y)
                )
                .force('collide', null)
                .force('center', null)
                .force('charge', forceManyBody().strength(weakCharge))
                .restart()
    }

    const splitBubbles = () => {
        const groupsTarget = {
            positive: width * 0.6,
            negative: width * 0.2,
            neutral: width * 0.2,
        }
        const forceStrength = 0.02
        const offset = 100

        bubbleDrawer && bubbleDrawer.highlightType()

        simulation &&
            simulation
                .alpha(1)
                .alphaDecay(0.0228)
                .alphaTarget(0)
                .alphaMin(0)
                .velocityDecay(0.1)

                .force(
                    'x',
                    forceX()
                        .strength(forceStrength)
                        .x((d) => groupsTarget[d.mastery])
                )
                .force(
                    'y',
                    forceY()
                        .strength(forceStrength)
                        .y(center.y - offset)
                )
                .force(
                    'collide',
                    forceCollide().radius((d) => d.r + 3)
                )
                .force('charge', null)
                .force('center', null)
                .restart()
    }

    const handleMouseLeave = () => {
        bubbleDrawer && bubbleDrawer.handleMouseLeave()
    }

    const renderSimulation = () => {
        const nodes = generateNodes({
            bubbles,
            scale,
            height,
            width,
            centerY: center.y,
        })

        if (!nodes.length) return
        const tmpSimulation = forceSimulation(nodes)
        setSimulation(tmpSimulation)

        const tmpbubbleDrawer = new BubbleDrawer({
            svg: svg,
            onBubbleClick,
            onBubbleHover,
            onBubbleFocus,
        })
        setBubbleDrawer(tmpbubbleDrawer)
    }

    return (
        <div
            aria-controls="bubbleChartTabPanel"
            onMouseLeave={handleMouseLeave}
            tabIndex={-1}
            id={heading}
            {...props}
        >
            <svg
                id="bubblesvgprint"
                focusable="false"
                height={height}
                ref={setSVGRef}
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                onClick={(e) => {
                    onBubbleClick(
                        e.target?.attributes?.name?.value,
                        e.target?.attributes?.sentiment?.value,
                        e.target?.attributes?.isText?.value
                    )
                }}
            />
        </div>
    )
}

export default BubbleChart

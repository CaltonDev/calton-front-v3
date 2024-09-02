export default class BubbleDrawer {
    props
    bubblesPositive
    rectPositive
    bubblesNegative
    rectNegative
    bubblesNeutral
    rectNeutral
    bubblesText
    bubblesTextPercentage

    constructor(props) {
        this.props = props
    }

    draw(simulation) {
        const { svg } = this.props
        if (!svg) return this

        const leafRoot = svg.selectAll('a').data(simulation.nodes()).join('a')
        //.attr("href", (d) => `#${d.name}`);

        const leafPositive = leafRoot
            .append('g')
            .join('g')
            .attr('class', 'gPositive')

        this.rectPositive = leafPositive
            .append('clipPath')
            .attr('id', (d) => `clip-${d.bubbleId}-positive`)
            .append('rect')
            .attr('height', (d) => d.r * 2 + 10)
            .attr('width', (d) => d.r * 2 + 10)

        this.bubblesPositive = leafPositive
            .append('circle')
            .attr('clip-path', (d) => `url(#clip-${d.bubbleId}-positive)`)
            .attr('r', (d) => d.r)
            .attr('class', 'bubble')
            .style('cursor', 'pointer')
            .attr('name', (d) => d.name)
            .attr('sentiment', 1)
            .on('mouseover', this.handleMouseOver)
            .on('focus', this.handleFocus)
        //.on("click", (d) => this.handleClick(d, 1));

        const leafNeutral = leafRoot
            .append('g')
            .join('g')
            .attr('class', 'gNeutral')

        this.rectNeutral = leafNeutral
            .append('clipPath')
            .attr('id', (d) => `clip-${d.bubbleId}-neutral`)
            .append('rect')
            .attr('height', (d) => d.r * 2 + 10)
            .attr('width', (d) => d.r * 2 + 10)

        this.bubblesNeutral = leafNeutral
            .append('circle')
            .attr('clip-path', (d) => `url(#clip-${d.bubbleId}-neutral`)
            .attr('r', (d) => d.r)
            .attr('class', 'bubble')
            .attr('name', (d) => d.name)
            .style('cursor', 'pointer')
            .attr('sentiment', 0)
            .on('mouseover', this.handleMouseOver)
            .on('focus', this.handleFocus)

        const leafNegative = leafRoot
            .append('g')
            .join('g')
            .attr('class', 'gNegative')

        this.rectNegative = leafNegative
            .append('clipPath')
            .attr('id', (d) => `clip-${d.bubbleId}-negative`)
            .append('rect')
            .style('cursor', 'pointer')
            .attr('height', (d) => d.r * 2 + 10)
            .attr('width', (d) => d.r * 2 + 10)

        this.bubblesNegative = leafNegative
            .append('circle')
            .attr('clip-path', (d) => `url(#clip-${d.bubbleId}-negative`)
            .attr('r', (d) => d.r)
            .attr('class', 'bubble')
            .attr('name', (d) => d.name)
            .attr('sentiment', -1)
            .style('cursor', 'pointer')
            .on('mouseover', this.handleMouseOver)
            .on('focus', this.handleFocus)
        //.on("click", (d) => this.handleClick(d, -1));

        this.bubblesText = leafRoot
            .append('text')
            .text((d) => String(d.name))
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .style('cursor', 'pointer')
            .style('font-size', (d) => d.r / d.name)
            .style('font-weight', 'bold')
            .attr('name', (d) => d.name)
            .attr('sentiment', null)
            .attr('isText', true)
        //.on("click", (d) => this.handleClick(d, null, true));

        this.bubblesTextPercentage = leafRoot
            .append('text')
            .text((d) => `${String(d.count.positive)}%`)
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('cursor', 'pointer')
            .style('fill', 'white')
            .style('font-size', (d) => d.r / d.name)
            .attr('name', (d) => d.name)
            .attr('sentiment', null)
            .attr('isText', true)
        //.on("click", (d) => this.handleClick(d, false, true));

        simulation.on('tick', this.handleTick).restart()
        return this
    }

    handleTick = () => {
        this.rectPositive &&
            this.rectPositive
                .attr('x', (d) => {
                    return d.x - d.r - 5
                })
                .attr('y', (d) => d.y - d.r - 5)

        this.bubblesPositive &&
            this.bubblesPositive
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', (d) => d.r)

        this.rectNeutral &&
            this.rectNeutral
                .attr('x', (d) => {
                    const percentage =
                        (d.count.positive + d.count.negative) / 100
                    const width = d.r * 2
                    const result = width * percentage
                    const start = d.x - d.r - 3
                    return start + result
                })
                .attr('y', (d) => d.y - d.r)

        this.bubblesNeutral &&
            this.bubblesNeutral
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', (d) => d.r)

        this.rectNegative &&
            this.rectNegative
                .attr('x', (d) => {
                    const percentage =
                        (d.count.positive + d.count.neutral) / 100
                    const width = d.r * 2.2
                    const result = width * percentage
                    const start = d.x - d.r
                    return start + result
                })
                .attr('y', (d) => d.y - d.r)

        this.bubblesNegative &&
            this.bubblesNegative
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', (d) => d.r)

        this.bubblesText &&
            this.bubblesText.attr('x', (d) => d.x).attr('y', (d) => d.y)

        this.bubblesTextPercentage &&
            this.bubblesTextPercentage
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y + 20)
    }

    handleClick = (d, sentiment = 1, isText = false) => {
        const { onBubbleClick } = this.props
        onBubbleClick &&
            onBubbleClick(d.target?.attributes?.name?.value, sentiment, isText)
    }

    handleMouseOver = ({ skillId, type }) => {
        const { onBubbleHover } = this.props
        onBubbleHover && onBubbleHover(skillId, type)

        // svg &&
        //   svg
        //     .selectAll<SVGCircleElement, any>("circle")
        //     .attr("opacity", (d) => (skillId === d.skillId ? 1 : 0.5));
    }

    handleMouseLeave = () => {
        const { onBubbleHover, svg } = this.props
        onBubbleHover && onBubbleHover(null)

        svg && svg.selectAll('circle').attr('opacity', 1)
    }

    handleFocus = ({ skillId, type }) => {
        const { onBubbleFocus } = this.props
        onBubbleFocus && onBubbleFocus(skillId, type)
    }

    focus = (skillId, type) => {
        const { svg } = this.props
        const node = svg && svg.select(`#bubble${skillId}${type}`).node()
        let nextBubble = node && node.nextElementSibling
        while (nextBubble && nextBubble.getAttribute('tabindex') !== '0') {
            nextBubble = nextBubble.nextElementSibling
        }
        nextBubble &&
            nextBubble instanceof SVGElement &&
            nextBubble.focus &&
            nextBubble.focus()
        return this
    }

    setTabbableBubbles = (type) => {
        const { svg } = this.props
        svg &&
            svg
                .selectAll('circle')
                .attr('tabindex', (d) => (!type || type === d.mastery ? 0 : -1))
        return this
    }

    highlightType = (type = null) => {
        const { svg } = this.props
        if (!svg) return this
        const count = {
            positive: 0,
            negative: 0,
            neutral: 0,
        }
        const bubbles = svg.selectAll('circle')
        bubbles.each((d) => {
            count[d.mastery] += d.initialRadius
        })
        const alpha = type
            ? (count.positive + count.negative + count.neutral) /
              count[type] /
              2
            : 1
        bubbles.each((d) => {
            d.r = d.initialRadius * Math.min(d.mastery === type ? alpha : 1, 5)
        })
        return this
    }

    remove = () => {
        const { svg } = this.props
        //svg && svg.selectAll("circle").remove();
        return this
    }
}

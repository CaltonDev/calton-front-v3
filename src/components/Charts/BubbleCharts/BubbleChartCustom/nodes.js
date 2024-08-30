export function generateNodes({
  bubbles,
  scale,
  width,
}) {
    const nodes = [];

    for (const bubble of bubbles) {
        const { id, total, title: name, count } = bubble;
        //const MIN_RADIUS = 10;
        const MIN_RADIUS = 20;
        const MAX_RADIUS = 80;

        let totalR = Math.max(total * scale, MIN_RADIUS + total * scale);
        totalR = Math.min(totalR, MAX_RADIUS)

        total > 0 &&
        nodes.push({
            bubbleId: `bubble${id}`,
            initialRadius: totalR,
            mastery: "positive",
            name,
            r: totalR,
            skillId: id,
            x: Math.random() * width,
            y: 0,
            count: count,
        });
    }
    return nodes;
}

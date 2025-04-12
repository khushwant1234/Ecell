export function checkCollision(
    x1: number,
    y1: number,
    radius1: number,
    x2: number,
    y2: number,
    radius2: number
): boolean {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius1 + radius2;
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
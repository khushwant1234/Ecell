export class Bullet {
    x: number;
    y: number;
    angle: number;
    speed: number;
    radius: number;

    constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 4;
        this.radius = 10;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#8182e8'; // Bullet color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
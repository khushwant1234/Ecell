import { CENTER_X, CENTER_Y, circleRadius } from '../constants';

export class Enemy {
    x: number;
    y: number;
    angle: number;
    speed: number;
    radius: number;

    constructor() {
        const angle = Math.random() * Math.PI * 2;
        const spawnDistance = circleRadius + 30;
        this.x = CENTER_X + Math.cos(angle) * spawnDistance;
        this.y = CENTER_Y + Math.sin(angle) * spawnDistance;
        this.angle = Math.atan2(CENTER_Y - this.y, CENTER_X - this.x);
        this.speed = 2;
        this.radius = 30;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#8182e8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
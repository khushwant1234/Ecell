import { CENTER_X, CENTER_Y, PLAYER_COLOR } from '../constants';

export class Player {
    x: number;
    y: number;
    radius: number;
    angle: number;
    lives: number;
    imageLoaded: boolean;

    constructor() {
        this.x = CENTER_X;
        this.y = CENTER_Y;
        this.radius = 50;
        this.angle = Math.PI;
        this.lives = 9;
        this.imageLoaded = false;
    }

    draw(ctx: CanvasRenderingContext2D, playerImage: HTMLImageElement) {
        if (this.imageLoaded) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            const size = 300;
            ctx.drawImage(playerImage, -size / 2, -size / 2, size, size);
            ctx.restore();
        } else {
            ctx.fillStyle = PLAYER_COLOR;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    update(mouseX: number, mouseY: number) {
        this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
    }
}
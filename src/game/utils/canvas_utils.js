import HUD from "../hud";
import Player from "../player/humanPlayer";
let playerHUD 

export let thisPlayer;

export const modal = ctx => {
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillRect(0, 0, 800, 500)
    //cover background with darker box, emphasizing foreground menu
}

export const clearWithHUD = (canv, ctx, player) => {
    ctx.clearRect(0, 0, 800, 500);
    thisPlayer = thisPlayer || new Player(JSON.parse(sessionStorage.getItem("player")))
    playerHUD = playerHUD || new HUD(canv, thisPlayer, 2)
    playerHUD.render(player)
}

export class rectButton {
    constructor(canv, onClick, { name, x, y, w, h, fill, strokeColor, strokeWidth, noStroke = true, buttonText, textColor, font } ) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.noStroke = noStroke;
        
        
        this.canv = canv
        this.onClick = onClick
        
        this.buttonText = buttonText;
        this.font = font
        this.textColor = textColor || "black";
        
        this.clicked = this.clicked.bind(this)
        console.log(this)
    }

    render(bgColorChange){
        const ctx = this.canv.getContext("2d")
        ctx.save();
        ctx.beginPath();
        if (this.fill) ctx.fillStyle = this.fill;
        if (bgColorChange) ctx.fillStyle = bgColorChange;
        if (this.strokeColor) ctx.strokeStyle=this.strokeColor;
        if (this.strokeWidth) ctx.lineWidth=this.strokewidth;
        ctx.rect(this.x, this.y, this.w, this.h);
        if ( !this.noStroke ) ctx.stroke();
        ctx.fill();

        if (this.buttonText) {
            ctx.fillStyle = this.textColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.buttonText, (this.x + ( this.w / 2 )), (this.y + ( this.h / 2 )) )
        }
        
        ctx.restore();
    }

    mouseInside(x,y){
        return (
            ( x > this.x && x < (this.x + this.w) ) &&
            (  y > this.y && y < (this.y + this.h) )
        )
    }

    clicked(e){
        const bounds = this.canv.getBoundingClientRect();

        const mouseXPos = e.clientX - bounds.x;
        const mouseYPos = e.clientY - bounds.y;
        if (this.mouseInside(mouseXPos, mouseYPos)) {
            this.onClick();
        }
    }
}
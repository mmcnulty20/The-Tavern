import { modal, rectButton, clearWithHUD } from "./utils/canvas_utils"
import chooseGame from "./choose_game";
const welcomeScreen = (canv, ctx) => {
    clearWithHUD(canv, ctx);
    modal(ctx)
    
    ctx.textAlign = "center"
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Georgia";
    ctx.fillText("welcome to", 400, 150);
    ctx.font = "30px Georgia";
    ctx.fillText("THE TAVERN", 400, 180);
    
    ctx.font = "18px Georgia"
    ctx.fillText("Click to Enter", 400, 280)

    canv.addEventListener("click", settingExplanation(canv, ctx), {once: true} )
    
}

const settingExplanation = ( canv, ctx ) => () => {
    clearWithHUD(canv, ctx);
    modal(ctx)

    // Replace with pixel-drawn box eventually
    ctx.beginPath();
    ctx.rect(200,75,400,350);
    ctx.fillStyle = "antiquewhite";
    ctx.strokeStyle = "grey"
    ctx.stroke();
    ctx.fill();    

    ctx.textAlign = "center"
    ctx.font = "16px Georgia"
    ctx.fillStyle = "black"
    ctx.fillText("Sometimes, adventuring isn't easy..", 400, 125)
    
    ctx.font = "12px Georgia";
    const introText = [
        "     You step out of the cold, damp night into the warm glow of the",
        "local inn. As you push your way through the patrons to an unoccupied",
        "table, your adventuring companions cluster in behind you. It's been a",
        "rough day: a quest was abandoned, your rogue tried and conspicuously",
        "failed to steal a priceless artifact, and somewhere a distressed damsel",
        "remains decidedly un-saved. But there's nothing you can do about any",
        "of that now. By all the Gods, you need a drink."
    ]

    ctx.textAlign = "left"
    introText.forEach( (str, i) => ctx.fillText(str, 225, 150 + (i * 16) ));
    ctx.font = "15px Georgia"
    const explText = [
        "Luckily, you have cards and dice in your pack,",
        "and the bar seems to have plenty of ale."
    ]

    ctx.textAlign = "center"
    explText.forEach( (str, i) => ctx.fillText(str, 400, 275 + ( i * 20 )) );

    const buttonTest = new rectButton(canv, () => chooseGame(canv, ctx), {
        name: "test",
        x: 350,
        y: 325,
        w: 100,
        h: 50,
        fill: "blue",
        buttonText: "Click me",
        textColor: "white"
    })
    buttonTest.render()
    canv.addEventListener("click", buttonTest.clicked, {once: true} );
}

export default welcomeScreen;
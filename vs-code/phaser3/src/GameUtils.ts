namespace GreedyArcher{

    interface sizable {
        width : number
        height : number
    
        setPosition(x:number, y:number) : void
    }

    export class GUIUtils {

        static bgColor : Phaser.Display.Color = Phaser.Display.Color.ValueToColor(0x8080f0)
        static textStile : Object = { font: "bold 24px Arial", fill: "#fff"}

        static setSizeablePos (xp : number, yp : number, obj : sizable, dimX : number, dimY : number) : void{
                let x = dimX * xp / 100 - obj.width/2
                let y = dimY * yp / 100 - obj.height/2
                
                obj.setPosition(x, y)
        }

        static setTextProperties(text : Phaser.GameObjects.Text, callBack : (() => void) | boolean = false, shadow : boolean = false){
            
            if(callBack){
                text.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains);
                text.on('pointerdown', <() => void> callBack)
            }

            if(shadow)
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        }

    }

    

}

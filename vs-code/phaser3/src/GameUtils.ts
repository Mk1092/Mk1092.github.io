namespace MaintainableGame{
    interface sizable {
        width : number
        height : number
    
        setPosition(x:number, y:number) : void
    }
    
    export function hello (xp : number, yp : number, obj : sizable, dimX : number, dimY : number) : void{
            let x = dimX * xp / 100 - obj.width/2
            let y = dimY * yp / 100 - obj.height/2
            
            obj.setPosition(x, y)
        }
}

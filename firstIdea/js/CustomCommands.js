
class CustomCommands {

    constructor(keyboard){
        //this.object = object;
        this.keyboard = keyboard;

        this.cursors = this.keyboard.createCursorKeys();
        this.createKeyboardEvents();
    }

    setObject(object){
        this.object = object;
    }

    setWEvent(funz, interObj){
        console.log(funz + "\n\n" + interObj)
        //Nel caso in cui si abbiano argomenti
        //this.keyboard.on('keydown_W', function(){func(arg)}, this);
        //this.keyboard.on('keydown_W', funz, interObj);
    }

    createKeyboardEvents(){

        this.keyboard.on('keydown_W', function (event) {
           if(this.object !== 'undefined'){
                this.object.WAction();
           }
        }, this);

        /*this.keyboard.on('keydown_A', function (event) {
            //this.commandsType = 1;
        }, this);

        this.keyboard.on('keydown_Z', function (event) {
            this.object.angle += 2;
        }, this);

        this.keyboard.on('keydown_X', function (event) {
            this.object.angle -= 2;
        }, this);*/
    }

    exec(){
        if(this.object == undefined){
            return;
        }

        this.isometricCommands();
    }

    isometricCommands(){

        var nil = 'nil';
        var horiz = nil;
        var vert = nil;

        if (this.cursors.left.isDown)
        {
            horiz = 'left';
        }
        
        if (this.cursors.right.isDown)
        {
            if(horiz == nil){
                horiz = 'right';
            }
            else{
                horiz = nil;
            }
        }

        if (this.cursors.up.isDown) {
            vert = 'up';
        }

        if (this.cursors.down.isDown) {
            if(vert == nil){
                vert = 'down';
            }
            else{
                vert = nil;
            }
        }

        if(horiz == nil){
            if(vert == nil){
                this.object.move('superstill', false);
            }
            else{
                this.object.move(vert, true);
            }
        }
        else{
            if(vert == nil){
                this.object.move(horiz, true);
            }
            else{
                this.object.move(horiz, false);
                this.object.move(vert, false);
            }
        }
        
    }
}
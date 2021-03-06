
class CustomCommands {

    constructor(keyboard){
        //this.object = object;
        this.keyboard = keyboard;

        this.cursors = this.keyboard.createCursorKeys();
        this.commandsType = 0;

        this.createKeyboardEvents();
    }

    setObject(object){
        this.object = object;
    }

    createKeyboardEvents(){

        this.keyboard.on('keydown_W', function (event) {
            this.commandsType = 0;
        }, this);

        this.keyboard.on('keydown_A', function (event) {
            this.commandsType = 1;
        }, this);

        /*this.keyboard.on('keydown_Z', function (event) {
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

        switch(this.commandsType){
            case 0:
                this.platformerCommands();
            break;
            case 1:
                this.isometricCommands();
            break;
            default:
                console.log("Undefined commandsType:" + commandsType);

        }
    }

    platformerCommands(){

        //this.object.body.allowGravity = true;
        this.object.setGravity(true);

        if (this.cursors.left.isDown)
        {
            this.object.move('left', false);
            /*this.object.setVelocityX(-160);
            this.object.anims.play('left', true);*/
        }
        else if (this.cursors.right.isDown)
        {
            this.object.move('right', false);
            /*this.object.setVelocityX(160);
            this.object.anims.play('right', true);*/
        }
        else
        {
            this.object.move('still', false);
            /*this.object.setVelocityX(0);
            this.object.anims.play('turn');*/
        }

        if (this.cursors.up.isDown)// && this.object.body.touching.down)
        {
            this.object.move('jump', false);
            //this.object.setVelocityY(-330);
        }
    }

    isometricCommands(){

        //this.object.body.allowGravity = false;
        this.object.setGravity(false);

        var nil = 'nil';
        var horiz = nil;
        var vert = nil;

        if (this.cursors.left.isDown)
        {
            //this.object.move('left', true);
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
            //this.object.move('right', true);
            //left -= 1;
        }

        if (this.cursors.up.isDown) {
            //this.object.move('up', true);
            vert = 'up';
        }

        if (this.cursors.down.isDown) {
            //this.object.move('down', true);
            if(vert == nil){
                vert = 'down';
            }
            else{
                vert = nil;
            }
            //up -= 1;
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

/*function createKeyboardEvents(placeholder){
    placeholder.input.keyboard.on('keydown_W', function (event) {
    placeholder.commandsType = 1;
    });

    placeholder.input.keyboard.on('keydown_A', function (event) {
        placeholder.commandsType = 2;
    });

    placeholder.input.keyboard.on('keydown_Z', function (event) {
        placeholder.object.angle += 2;
        //object.angularVelocity = 2;
        //object.refreshBody();
    });

    placeholder.input.keyboard.on('keydown_X', function (event) {
        placeholder.object.angle -= 2;
        //object.angularVelocity = 2;
        //object.refreshBody();
    });
}

function platformerCommands(object, cursors){
	if (cursors.left.isDown)
    {
        object.setVelocityX(-160);

        object.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        object.setVelocityX(160);

        object.anims.play('right', true);
    }
    else
    {
        object.setVelocityX(0);

        object.anims.play('turn');
    }

    if (cursors.up.isDown && object.body.touching.down)
    {
        object.setVelocityY(-330);
    }
}

function isometricCommands(object, cursors){

	var moving = false;
	var vel = 0;
	var d = 160;

	if (cursors.left.isDown)
    {
    	vel -= d;
    }
    
    if (cursors.right.isDown)
    {
        vel += d
    }
    
    if(vel > 0){
    	object.anims.play('right', true);
    }

    if(vel < 0){
        object.anims.play('left', true);
    }

    if(vel != 0){
    	moving = true;
    }

	object.setVelocityX(vel);
    vel = 0;

    if (cursors.up.isDown) 
    {
    	vel -= d;
    }

    if (cursors.down.isDown)
    {
    	vel += d;
    }

    if (vel != 0){
    	moving = true;
    }

    object.setVelocityY(vel);

    if (!moving)
    {
        object.anims.play('turn');
    }
}
*/
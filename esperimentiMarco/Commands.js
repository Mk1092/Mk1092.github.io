
class CustomCommands {

    constructor(player, keyboard){
        this.player = player;
        this.keyboard = keyboard;

        this.cursors = this.keyboard.createCursorKeys();
        this.commandsType = 0;

        this.createKeyboardEvents();
    }

    createKeyboardEvents(){

        this.keyboard.on('keydown_W', function (event) {
            this.commandsType = 0;
        }, this);

        //this.keyboard.on('keydown_W', this.setCommandsType, 0, event );

        this.keyboard.on('keydown_A', function (event) {
            this.commandsType = 1;
        }, this);

        //this.keyboard.on('keydown_A', this.setCommandsType, 1, event );

        this.keyboard.on('keydown_Z', function (event) {
            this.player.angle += 2;
            //player.angularVelocity = 2;
            //player.refreshBody();
        }, this);

        this.keyboard.on('keydown_X', function (event) {
            this.player.angle -= 2;
            //player.angularVelocity = 2;
            //player.refreshBody();
        }, this);
    }

    exec(){
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

        this.player.body.allowGravity = true;

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    isometricCommands(){

        this.player.body.allowGravity = false;

        var moving = false;
        var vel = 0;
        var d = 160;

        if (this.cursors.left.isDown)
        {
            vel -= d;
        }
        
        if (this.cursors.right.isDown)
        {
            vel += d
        }
        
        if(vel > 0){
            this.player.anims.play('right', true);
        }

        if(vel < 0){
            this.player.anims.play('left', true);
        }

        if(vel != 0){
            moving = true;
        }

        this.player.setVelocityX(vel);
        vel = 0;

        if (this.cursors.up.isDown) 
        {
            vel -= d;
        }

        if (this.cursors.down.isDown)
        {
            vel += d;
        }

        if(vel > 0 && ! moving){
            this.player.anims.play('down', true);
        }

        if(vel < 0 && ! moving){
            this.player.anims.play('up', true);
        }

        if (vel != 0){
            moving = true;
        }

        this.player.setVelocityY(vel);

        if (!moving)
        {
            this.player.anims.play('turn');
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
        placeholder.player.angle += 2;
        //player.angularVelocity = 2;
        //player.refreshBody();
    });

    placeholder.input.keyboard.on('keydown_X', function (event) {
        placeholder.player.angle -= 2;
        //player.angularVelocity = 2;
        //player.refreshBody();
    });
}

function platformerCommands(player, cursors){
	if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function isometricCommands(player, cursors){

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
    	player.anims.play('right', true);
    }

    if(vel < 0){
        player.anims.play('left', true);
    }

    if(vel != 0){
    	moving = true;
    }

	player.setVelocityX(vel);
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

    player.setVelocityY(vel);

    if (!moving)
    {
        player.anims.play('turn');
    }
}
*/
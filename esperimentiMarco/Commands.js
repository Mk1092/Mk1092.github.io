
function createKeyboardEvents(placeholder){
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
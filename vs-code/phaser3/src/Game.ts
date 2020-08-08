namespace MaintainableGame {

    export class Game extends Phaser.Game {

        // --------------------------------------------------------------------
        constructor() {

            // default renderer
            let renderer: number = Phaser.AUTO;

            // init game
            super(
                {
                    type: renderer,

                    parent: "game_content",

                    physics: {
                        default: "arcade",
                        arcade: {
                            gravity: {x: 0, y: 0},
                            debug: false,
                            x: -400,
                            y: -300,
                            width: 800,
                            height: 600
                        }
                    },

                    width: 800,
                    height: 600,

                    title: "Maintainable Game",
                }
            );

            // states
            this.scene.add("Welcome", Welcome);
            this.scene.add("Level1", Level1);
            this.scene.add("Preloader", Preloader);
            this.scene.add("Menu", Menu);

            // start
            this.scene.start("Welcome")
        }
    }
}
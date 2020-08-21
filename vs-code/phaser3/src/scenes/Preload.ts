////<reference path = "BaseScene.ts" />

namespace GreedyArcher {

    export class Preloader extends Phaser.Scene {

        // -------------------------------------------------------------------------
        public create(): void {
            console.log("Preloader");

            this.scene.start("Menu");
        }
    }
}
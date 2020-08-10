///<reference path = "BaseScene.ts" />

namespace GreedyArcher {

    export class Preloader extends BaseScene {

        // -------------------------------------------------------------------------
        public create(): void {
            console.log("Preloader");

            this.scene.start("Menu");
        }
    }
}
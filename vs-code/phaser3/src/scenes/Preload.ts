///<reference path = "BaseScene.ts" />

namespace MaintainableGame {

    export class Preloader extends BaseScene {

        // -------------------------------------------------------------------------
        public create(): void {
            console.log("Preloader");

            this.scene.start("Menu");
        }
    }
}
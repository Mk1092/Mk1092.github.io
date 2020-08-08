namespace MaintainableGame {

    export class BaseScene extends Phaser.Scene {
        debugText : Phaser.GameObjects.Text

        create(){
            var style = { font: "bold 18px Arial", fill: "#f44"};

            this.debugText = this.add.text(-400, -300, "", style);
            this.debugText.depth = 2
            //this.debugText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        }

        // --------------------------------------------------------------------
        public get gameWidth(): number {
            return this.sys.game.config.width as number;
        }

        // --------------------------------------------------------------------
        public get gameHeight(): number {
            return this.sys.game.config.height as number;
        }

        // --------------------------------------------------------------------
        protected setView(): void {
            // focus on center
            this.cameras.main.centerOn(0, 0);
        }

        public setDebugText(message : string){
            this.debugText.setText(message)
        }
    }
}
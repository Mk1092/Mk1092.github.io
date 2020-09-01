namespace GreedyArcher {

    export class Menu extends Phaser.Scene {
        private numLevels = 3

        // -------------------------------------------------------------------------
        public create(): void {

            this.cameras.main.backgroundColor = GUIUtils.bgColor

            let{width, height} = this.sys.game.canvas

            for(let i = 0; i < 3; i++){
                let lvNum = "Livello " + (i+1)
                let text = this.add.text(0, 0, lvNum, GUIUtils.textStile)
                let scene = this
                GUIUtils.setTextProperties(text, function () {scene.selectLevel(i)})
                GUIUtils.setSizeablePos(50, 50 + (10 * i), text, width, height)
            }

        }

        private selectLevel(levelIndex : number){
            let levelNum = levelIndex + 1

            if(levelIndex < this.numLevels){
                this.scene.start("Level" + levelNum)
            }
            else{
                console.log("Livello " + levelNum + " in fase di creazione")
            }

        }
    }
}
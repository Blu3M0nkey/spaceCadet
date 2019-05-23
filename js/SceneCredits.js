/* eslint-env es6 */
/* eslint-disable */

class SceneCredits extends Phaser.Scene {
    constructor() {
        super({key:"SceneCredits"});
    }
    preload() {

        this.load.image("bckgrd","asset/Images/stary_bckgrd.png");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');      
    }
    create(){
        this.image=this.add.image(350,250, 'bckgrd');
        var credits = [
            "Producer/Developer: ME! Sam", "\nConcept Artist: Diego and also me", "\nMusic: Not me. Bensound.com ", "\nSound FX: also not me, freesound.org"
        ]
        var add = this.add;
    var input = this.input;

    WebFont.load({
        google: {
            families: [ 'Rock Salt' ]
        },
        active: function ()
        {
            add.text(150, 100, credits,{
                font:' 20px Rock Salt',
                fill: 'cyan',
                width:420
            })
            }});
        }
    } 


// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }
    // シーンの事前読み込み処理
    preload() {
        // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky','assets/undersky.png');
        this.load.image('taro','assets/TARO.png');
        this.load.image('hanako','assets/HANAKO.png');

    }
    // シーン初期化処理
    create() {
    //     // 単体画像をシーンに追加(X座標,Y座標,画像名)
    
    this.add.image(400, 300, 'sky');
    
    const taro = this.physics.add.sprite(50, 50, 'taro');
    
    const hanako = this.physics.add.sprite(750, 400, 'hanako');

    // MainSceneクラスのプロパティにplayerを設定
    this.taro = taro;
    this.hanako = hanako;
    }
    arrow_move(cursors, object1,object2){
        if(cursors.up.isDown){
            console.log("Up!!");
            object1.setVelocityY(-40);// 上方向の速度を設定
            object2.setVelocityY(40);// 上方向の速度を設定
        }else if(cursors.down.isDown){
            console.log("down!!");
            object1.setVelocityY(40);// 下方向の速度を設定
            object2.setVelocityY(-40);// 下方向の速度を設定
        }else if(cursors.left.isDown){
            console.log("Left");
            object1.setVelocityX(-40);// 左方向の速度を設定
            object2.setVelocityX(40);// 左方向の速度を設定
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object1.setVelocityX(40);// 右方向の速度を設定
            object2.setVelocityX(-40);// 右方向の速度を設定
        }else{
            object1.setVelocity(0,0);// 横方向の速度を0
            object2.setVelocity(0,0);// 横方向の速度を0
        }
    }


    // 毎フレーム実行される繰り返し処理
    update() {
        let cursors = this.input.keyboard.createCursorKeys();

        // 矢印キーのカーソル情報とplayerスプライトをarrow_move()メソッドに渡す
        this.arrow_move(cursors, this.taro,this.hanako);
    }
}
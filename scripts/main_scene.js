// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
        //果物カウンター
        this.fruitsCounter = 0; 
    }
    // シーンの事前読み込み処理
    preload() {
        // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky','assets/undersky.png');
        this.load.image('taro','assets/TARO.png');
        this.load.image('hanako','assets/HANAKO.png');
        this.load.image('apple','assets/APPLE.png');
        this.load.image('orenge','assets/ORENGE.png');

    }
    // シーン初期化処理
    create() {
    //     // 単体画像をシーンに追加(X座標,Y座標,画像名)
    
    this.add.image(400, 300, 'sky');
    
    const taro = this.physics.add.sprite(50, 50, 'taro');
    const hanako = this.physics.add.sprite(750, 400, 'hanako');

    // 動かない物体をまとめる
    let staticGroup = this.physics.add.staticGroup();



    function generateRandomPosition() {
        const x = Phaser.Math.Between(25, 775);
        const y = Phaser.Math.Between(25, 425);
        return { x, y };
    }

    for (let i = 0; i < 5; i++) {
        const applePos = generateRandomPosition();
        staticGroup.create(applePos.x, applePos.y, 'apple'); 
    }

    for (let i = 0; i < 5; i++) {
        const orengePos = generateRandomPosition();
        staticGroup.create(orengePos.x, orengePos.y, 'orenge'); 
    }
    // MainSceneクラスのプロパティにplayerを設定
    this.taro = taro;
    this.hanako = hanako;

    //hanakoと果物の衝突判定
    this.physics.add.overlap(this.hanako, staticGroup, this.hitFruit, null, this);

    //太郎と静止物グループの衝突判定
    // this.physics.add.collider(this.taro, staticGroup);
    // リンゴまたはオレンジに当たったらゲームを停止
    //「TARO」の当たり判定処理
    //this.physics.add.overlap(this.taro, staticGroup, hitFruit, null, this);
        // this.physics.add.overlap(this.hanako, staticGroup, hitFruit, null, this);
        // function hitFruit(taro, fruit) {
        //     // ここにゲームを停止する処理を追加
        //     this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Over!', { fontSize: '32px', fill: '#CDC' });
        //     this.physics.pause();
        //     console.log("Game Over!");
        // }
}
    arrow_move(cursors, object1,object2){
        if(cursors.up.isDown){
            console.log("Up!!");
            object1.setVelocityY(-100);// 上方向の速度を設定
            object2.setVelocityY(100);// 上方向の速度を設定
        }else if(cursors.down.isDown){
            console.log("down!!");
            object1.setVelocityY(100);// 下方向の速度を設定
            object2.setVelocityY(-100);// 下方向の速度を設定
        }else if(cursors.left.isDown){
            console.log("Left");
            object1.setVelocityX(-100);// 左方向の速度を設定
            object2.setVelocityX(100);// 左方向の速度を設定
        }else if(cursors.right.isDown){
            console.log("Right!!");
            object1.setVelocityX(100);// 右方向の速度を設定
            object2.setVelocityX(-100);// 右方向の速度を設定
        }else{
            object1.setVelocity(0,0);// 横方向の速度を0
            object2.setVelocity(0,0);// 横方向の速度を0
        }
    }
    hitFruit(hanako, fruit) {
        this.fruitsCounter++;
        console.log("Fruits Count: " + this.fruitsCounter);
        // this.add.text(200,200, "Fruits Count: " + this.fruitsCounter, { fontSize: '32px', fill: '#CDC' });
        fruit.destroy();//フルーツを消す


    }

    gameClear() {
        this.physics.pause(this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'CLEAR', { fontSize: '32px', fill: '#CDC' }));
    }

    // 毎フレーム実行される繰り返し処理
    update() {
        let cursors = this.input.keyboard.createCursorKeys();

        // 矢印キーのカーソル情報とplayerスプライトをarrow_move()メソッドに渡す
        this.arrow_move(cursors, this.taro,this.hanako);

        //フルーツを10個取ったらゲームを止める
        if (this.fruitsCounter === 10) {
            this.gameClear();
        }
    }
}
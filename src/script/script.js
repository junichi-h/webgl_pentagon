
// = 004 ======================================================================
// 三次元的な座標を自在に頭の中で思い描くのは、一種の慣れを必要とします。
// ここではそんな 3D 特有の感覚を養うために、自力で頂点を定義することに挑戦して
// みましょう。
// また、頂点はどのようなプリミティブタイプを選択したかによって、その外観が全く
// 別物になります。これについても、ここで理解を深めておきましょう。
// ============================================================================

(() => {
    window.addEventListener('load', () => {
        // glcubic の初期化
        gl3.initGL('canvas');
        // ready プロパティが false の場合初期化失敗
        if(!gl3.ready){
            console.log('initialize error');
            return;
        }

        // キャンバスの大きさはウィンドウの短辺
        let canvasSize = Math.min(window.innerWidth, window.innerHeight);
        gl3.canvas.width  = canvasSize;
        gl3.canvas.height = canvasSize;

        // glcubic の機能を使ってプログラムを生成
        let prg = gl3.program.create(
            'vs',
            'fs',
            ['position', 'color'],
            [3, 4],
            ['globalColor'],
            ['4fv']
        );

        // - [やってみよう] ---------------------------------------------------
        // 現在は、三角形がひとつだけ表示されるような構造になっています。これは
        // サンプル 003 とまったく同じ初期状態です。
        // これを自分で修正して、いびつな形で構わないので「五角形」にしてみてく
        // ださい。WebGL では、原則として「三角形」以外のポリゴンは作れません。
        // よって、五角形を形作るためには、最低でも三枚のポリゴンが必要になると
        // いうことがヒントです。がんばってチャレンジしてみてください。
        // --------------------------------------------------------------------
        // 頂点の座標データ
        // 四角形の頂点座標
        /*let position = [
             1.0, 1.0, 0.0,
             1.0, -1.0, 0.0,
             -1.0, -1.0, 0.0,
             1.0, 1.0, 0.0,
             -1.0, 1.0, 0.0,
             -1.0, -1.0, 0.0
        ];

        // 頂点の色データ
        let color = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.1, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0
        ];
        gl3.draw_arrays(gl3.gl.TRIANGLE_STRIP, 6); // ok
        */
        const z = 0.0;
        const alpha = 1.0;
        let position = [
            // upper
            0.0, 0.9, z,// top center
            1.0, 0.25, z,// top right
            -1.0, 0.25, z,// top left

            1.0, 0.25, z,// top right
            -0.9, -0.25, z,
            -0.75, -1.0, z,

            1.0, 0.25, z,// top right
            0.75, -1.0, z,
            -0.75, -1.0, z
        ];

        // 頂点の色データ
        let color = [
            1.0, 0.0, 0.0, alpha,
            0.0, 1.0, 0.0, alpha,
            0.0, 0.0, 1.0, alpha,
            0.0, 1.0, 0.0, alpha,
            1.0, 0.0, 0.0, alpha,
            0.0, 1.0, 0.0, alpha,
            0.0, 0.0, 1.0, alpha,
            0.0, 1.0, 0.0, alpha,
            1.0, 0.0, 0.0, alpha,
        ];

        // 座標データから頂点バッファを生成
        let VBO = [
            gl3.create_vbo(position),
            gl3.create_vbo(color)
        ];

        // レンダリング関数を呼ぶ
        render();

        function render(){
            // ビューを設定
            gl3.scene_view(null, 0, 0, gl3.canvas.width, gl3.canvas.height);
            // シーンのクリア
            gl3.scene_clear([0.7, 0.7, 0.7, 1.0]);
            // プログラムをセット
            prg.set_program();
            // プログラムに頂点バッファをアタッチ
            prg.set_attribute(VBO);
            // uniform 変数をシェーダにプッシュ
            prg.push_shader([[1.0, 1.0, 1.0, 1.0]]);
            // - プリミティブタイプ -------------------------------------------
            // WebGL には代表的なプリミティブタイプには以下のようなものがありま
            // す。これらを変更すると、いったいどのような変化が起こるのかを観察
            // しながら、それぞれのプリミティブタイプの違いについて理解を深めて
            // おきましょう。
            // * gl.POINTS
            // * gl.LINES
            // * gl.LINE_STRIP
            // * gl.TRIANGLES
            // * gl.TRIANGLE_STRIP
            //
            // また、ドローコールを行う glcubic.js のメソッドの、第二引数を見て
            // ください。そこには「3」という意味ありげな数値が書いてあります。
            // これは「何個の頂点を描くか」ということを表す数値です。
            // 三角形がひとつなら、頂点は三個あればいいので「3」ですが、五角形を
            // 描画するとなれば、この部分についても変更を行う必要があるので、気
            // をつけましょう。
            // ----------------------------------------------------------------
            // ドローコール（描画命令）
            gl3.draw_arrays(gl3.gl.TRIANGLE_STRIP, 9);
        }
    }, false);
})();

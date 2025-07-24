// 診断データの管理
let answers = {
    q1: null,
    q2: null,
    q3: null,
    'q4-1': null,
    'q4-2': null,
    'q4-3': null
};

// 色情報とリンク
const colorInfo = {
    spring: {
        colors: [
            { name: 'コーラルピンク', hex: '#FF6B6B', link: 'https://www.google.com/search?q=コーラルピンク+ファッション' },
            { name: 'ピーチ', hex: '#FFDAB9', link: 'https://www.google.com/search?q=ピーチ色+コーディネート' },
            { name: 'イエローグリーン', hex: '#ADFF2F', link: 'https://www.google.com/search?q=イエローグリーン+春服' },
            { name: 'ターコイズ', hex: '#40E0D0', link: 'https://www.google.com/search?q=ターコイズ+アクセサリー' }
        ]
    },
    summer: {
        colors: [
            { name: 'ラベンダー', hex: '#E6E6FA', link: 'https://www.google.com/search?q=ラベンダー色+ファッション' },
            { name: 'パステルブルー', hex: '#87CEEB', link: 'https://www.google.com/search?q=パステルブルー+コーデ' },
            { name: 'ローズピンク', hex: '#FFB6C1', link: 'https://www.google.com/search?q=ローズピンク+メイク' },
            { name: 'ミントグリーン', hex: '#98FB98', link: 'https://www.google.com/search?q=ミントグリーン+夏服' }
        ]
    },
    autumn: {
        colors: [
            { name: 'テラコッタ', hex: '#D2691E', link: 'https://www.google.com/search?q=テラコッタ色+ファッション' },
            { name: 'マスタード', hex: '#FFDB58', link: 'https://www.google.com/search?q=マスタード色+秋服' },
            { name: 'カーキ', hex: '#8B8C0A', link: 'https://www.google.com/search?q=カーキ色+コーディネート' },
            { name: 'バーガンディ', hex: '#800020', link: 'https://www.google.com/search?q=バーガンディ+メイク' }
        ]
    },
    winter: {
        colors: [
            { name: 'ロイヤルブルー', hex: '#4169E1', link: 'https://www.google.com/search?q=ロイヤルブルー+ファッション' },
            { name: 'ピュアホワイト', hex: '#FFFFFF', link: 'https://www.google.com/search?q=ピュアホワイト+コーデ' },
            { name: 'ブラック', hex: '#000000', link: 'https://www.google.com/search?q=ブラック+ファッション' },
            { name: 'マゼンタ', hex: '#FF00FF', link: 'https://www.google.com/search?q=マゼンタ+リップ' }
        ]
    }
};

// ラジオボタンの変更を監視
document.addEventListener('DOMContentLoaded', function() {
    // 各質問のラジオボタンにイベントリスナーを追加
    const radioGroups = ['q1', 'q2', 'q3', 'q4-1', 'q4-2', 'q4-3'];
    
    radioGroups.forEach(group => {
        const radios = document.querySelectorAll(`input[name="${group}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                answers[group] = this.value;
                // 次へボタンを有効化
                const section = this.closest('.content-section');
                const nextBtn = section.querySelector('.next-btn');
                if (nextBtn) {
                    nextBtn.disabled = false;
                }
            });
        });
    });
});

function startDiagnosis() {
    showSection('question1');
}

function showSection(sectionId) {
    // すべてのセクションを非表示
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 指定されたセクションを表示
    document.getElementById(sectionId).classList.add('active');
}

function nextQuestion(questionNumber) {
    if (typeof questionNumber === 'string') {
        showSection(`question${questionNumber}`);
    } else {
        showSection(`question${questionNumber}`);
    }
}

function analyzeFirstThreeQuestions() {
    const q1 = answers.q1;
    const q2 = answers.q2;
    const q3 = answers.q3;
    
    let yellowBase = 0;
    let blueBase = 0;
    let spring = 0;
    let autumn = 0;
    let summer = 0;
    let winter = 0;
    
    // 各回答をカウント
    [q1, q2, q3].forEach(answer => {
        switch(answer) {
            case 'a':
                yellowBase++;
                spring++;
                break;
            case 'b':
                yellowBase++;
                autumn++;
                break;
            case 'c':
                blueBase++;
                summer++;
                break;
            case 'd':
                blueBase++;
                winter++;
                break;
        }
    });
    
    // ベースタイプを判定
    const baseType = yellowBase > blueBase ? 'yellow' : 'blue';
    
    // シーズンタイプを判定
    let seasonType;
    if (baseType === 'yellow') {
        seasonType = spring >= autumn ? 'spring' : 'autumn';
    } else {
        seasonType = summer >= winter ? 'summer' : 'winter';
    }
    
    return { baseType, seasonType };
}

function showFirstResult() {
    const result = analyzeFirstThreeQuestions();
    const resultContent = document.getElementById('firstResultContent');
    
    let html = '<div class="result-section">';
    
    if (result.baseType === 'yellow') {
        if (result.seasonType === 'spring') {
            html += `
                <h4>あなたは「イエローベース・スプリング」タイプです！</h4>
                <div class="color-palette">
                    ${colorInfo.spring.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>明るく澄んだ色が得意！コーラルピンクやピーチなどの暖かみのある色がお似合いです</li>
                    <li>メイクは、オレンジ系のチークとリップで健康的な印象に</li>
                    <li>ゴールドのアクセサリーが肌に馴染みます</li>
                    <li>春らしいフレッシュな色使いで若々しい印象を演出できます</li>
                </ul>
            `;
        } else {
            html += `
                <h4>あなたは「イエローベース・オータム」タイプです！</h4>
                <div class="color-palette">
                    ${colorInfo.autumn.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>深みのある暖色が得意！テラコッタやマスタードなどのこっくりした色がお似合いです</li>
                    <li>メイクは、ブラウン系のアイシャドウとベージュ系リップで大人っぽく</li>
                    <li>アンティークゴールドのアクセサリーが素敵です</li>
                    <li>秋らしいリッチな色使いで落ち着いた印象を演出できます</li>
                </ul>
            `;
        }
    } else {
        if (result.seasonType === 'summer') {
            html += `
                <h4>あなたは「ブルーベース・サマー」タイプです！</h4>
                <div class="color-palette">
                    ${colorInfo.summer.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>柔らかく優しい色が得意！ラベンダーやパステルブルーなどの涼しげな色がお似合いです</li>
                    <li>メイクは、青みピンクのチークとローズ系リップでエレガントに</li>
                    <li>シルバーやプラチナのアクセサリーが肌に馴染みます</li>
                    <li>夏らしい爽やかな色使いで上品な印象を演出できます</li>
                </ul>
            `;
        } else {
            html += `
                <h4>あなたは「ブルーベース・ウィンター」タイプです！</h4>
                <div class="color-palette">
                    ${colorInfo.winter.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>はっきりとした色が得意！ロイヤルブルーやマゼンタなどの鮮やかな色がお似合いです</li>
                    <li>メイクは、ワインレッドのリップとグレー系アイシャドウでクールに</li>
                    <li>シルバーやホワイトゴールドのアクセサリーが映えます</li>
                    <li>冬らしいシャープな色使いでモダンな印象を演出できます</li>
                </ul>
            `;
        }
    }
    
    html += '</div>';
    resultContent.innerHTML = html;
    showSection('firstResult');
}

function continueToQuestion4() {
    showSection('question4-1');
}

function analyzeFinalQuestions() {
    let yellowBase4 = 0;
    let blueBase4 = 0;
    
    // 質問4の回答を分析
    if (answers['q4-1'] === 'a') yellowBase4++;
    else blueBase4++;
    
    if (answers['q4-2'] === 'a') yellowBase4++;
    else blueBase4++;
    
    if (answers['q4-3'] === 'a') yellowBase4++;
    else blueBase4++;
    
    return yellowBase4 > blueBase4 ? 'yellow' : 'blue';
}

function showFinalResult() {
    const firstResult = analyzeFirstThreeQuestions();
    const finalBase = analyzeFinalQuestions();
    const finalResultContent = document.getElementById('finalResultContent');
    
    let html = '';
    
    if (firstResult.baseType === finalBase) {
        // ベースタイプが一致している場合
        html += '<div class="result-section">';
        html += '<p style="text-align: center; font-size: 1.2rem; color: #FF69B4; margin-bottom: 20px;">✨ あなたは自分に似合う色をよく理解していますね！ ✨</p>';
        
        if (firstResult.baseType === 'yellow' && firstResult.seasonType === 'spring') {
            html += `
                <h4>「イエローベース・スプリング」タイプの魅力を最大限に活かしましょう！</h4>
                <div class="color-palette">
                    ${colorInfo.spring.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>バッグは明るいベージュやキャメル、コーラルピンクがおすすめ</li>
                    <li>靴はヌードベージュやライトブラウンで足元を軽やかに</li>
                    <li>スカーフやストールは黄みのあるパステルカラーで華やかさをプラス</li>
                    <li>時計のベルトはブラウンレザーやゴールドメタルが◎</li>
                </ul>
            `;
        } else if (firstResult.baseType === 'yellow' && firstResult.seasonType === 'autumn') {
            html += `
                <h4>「イエローベース・オータム」タイプの魅力を最大限に活かしましょう！</h4>
                <div class="color-palette">
                    ${colorInfo.autumn.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>バッグはダークブラウンやカーキ、バーガンディがおすすめ</li>
                    <li>靴はキャメルやダークブラウンで足元に深みを</li>
                    <li>スカーフは秋色のペイズリー柄やチェック柄が素敵</li>
                    <li>ベルトや財布は本革のブラウン系で高級感を演出</li>
                </ul>
            `;
        } else if (firstResult.baseType === 'blue' && firstResult.seasonType === 'summer') {
            html += `
                <h4>「ブルーベース・サマー」タイプの魅力を最大限に活かしましょう！</h4>
                <div class="color-palette">
                    ${colorInfo.summer.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>バッグはグレージュやダスティピンク、ラベンダーがおすすめ</li>
                    <li>靴はグレーやネイビー、パウダーピンクで優しい印象に</li>
                    <li>スカーフは水彩画のような淡い花柄が似合います</li>
                    <li>パールのアクセサリーで上品さをプラス</li>
                </ul>
            `;
        } else {
            html += `
                <h4>「ブルーベース・ウィンター」タイプの魅力を最大限に活かしましょう！</h4>
                <div class="color-palette">
                    ${colorInfo.winter.colors.map(color => 
                        `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                            <span>${color.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <ul class="advice-list">
                    <li>バッグは黒やネイビー、真っ赤なものがおすすめ</li>
                    <li>靴はブラックやダークグレー、パテントレザーでシャープに</li>
                    <li>スカーフはモノトーンや幾何学模様でモダンな印象に</li>
                    <li>メタリックシルバーの小物でクールさを演出</li>
                </ul>
            `;
        }
    } else {
        // ベースタイプが異なる場合
        html += '<div class="result-section">';
        html += '<p style="text-align: center; font-size: 1.2rem; color: #FF69B4; margin-bottom: 20px;">💫 イメチェンや新しい自分を発見するのもいいかも！！ 💫</p>';
        
        if (finalBase === 'yellow') {
            html += '<h4>イエローベース系にチャレンジするなら...</h4>';
            if (Math.random() > 0.5) {
                html += `
                    <div class="color-palette">
                        ${colorInfo.spring.colors.map(color => 
                            `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                                <span>${color.name}</span>
                            </div>`
                        ).join('')}
                    </div>
                    <ul class="advice-list">
                        <li>まずはベージュ系のリップから始めてみて</li>
                        <li>ゴールドのアクセサリーを1点投入してみる</li>
                        <li>トップスに暖色系を持ってくると顔色が明るく見えます</li>
                        <li>キャメルのバッグや靴で温かみのあるコーデに</li>
                    </ul>
                `;
            } else {
                html += `
                    <div class="color-palette">
                        ${colorInfo.autumn.colors.map(color => 
                            `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                                <span>${color.name}</span>
                            </div>`
                        ).join('')}
                    </div>
                    <ul class="advice-list">
                        <li>ブラウン系のアイシャドウで深みのある目元に</li>
                        <li>テラコッタカラーのチークで健康的な印象を</li>
                        <li>カーキやマスタードの小物から取り入れてみて</li>
                        <li>秋冬はこっくりカラーのニットがおすすめ</li>
                    </ul>
                `;
            }
        } else {
            html += '<h4>ブルーベース系にチャレンジするなら...</h4>';
            if (Math.random() > 0.5) {
                html += `
                    <div class="color-palette">
                        ${colorInfo.summer.colors.map(color => 
                            `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                                <span>${color.name}</span>
                            </div>`
                        ).join('')}
                    </div>
                    <ul class="advice-list">
                        <li>青みピンクのリップで透明感をプラス</li>
                        <li>シルバーアクセサリーで涼しげな印象に</li>
                        <li>パステルカラーのトップスで優しい雰囲気を演出</li>
                        <li>グレージュのバッグで上品なコーデに</li>
                    </ul>
                `;
            } else {
                html += `
                    <div class="color-palette">
                        ${colorInfo.winter.colors.map(color => 
                            `<div class="color-chip" style="background-color: ${color.hex}" onclick="window.open('${color.link}', '_blank')">
                                <span>${color.name}</span>
                            </div>`
                        ).join('')}
                    </div>
                    <ul class="advice-list">
                        <li>真っ赤なリップでインパクトのある口元に</li>
                        <li>モノトーンコーデでシャープな印象を</li>
                        <li>ネイビーやロイヤルブルーで知的な雰囲気に</li>
                        <li>黒のレザーバッグでクールなスタイルを完成</li>
                    </ul>
                `;
            }
        }
        
        // 元のタイプの情報も表示
        html += '</div><div class="result-section" style="margin-top: 20px;">';
        html += '<h4>でも、あなたの本来のタイプも素敵です！</h4>';
        
        if (firstResult.baseType === 'yellow' && firstResult.seasonType === 'spring') {
            html += '<p>本来の「イエローベース・スプリング」タイプの明るく華やかな魅力も忘れずに！</p>';
        } else if (firstResult.baseType === 'yellow' && firstResult.seasonType === 'autumn') {
            html += '<p>本来の「イエローベース・オータム」タイプの深みのある魅力も忘れずに！</p>';
        } else if (firstResult.baseType === 'blue' && firstResult.seasonType === 'summer') {
            html += '<p>本来の「ブルーベース・サマー」タイプの優しく上品な魅力も忘れずに！</p>';
        } else {
            html += '<p>本来の「ブルーベース・ウィンター」タイプのクールでシャープな魅力も忘れずに！</p>';
        }
    }
    
    html += '</div>';
    finalResultContent.innerHTML = html;
    showSection('finalResult');
}

function restartDiagnosis() {
    // 回答をリセット
    answers = {
        q1: null,
        q2: null,
        q3: null,
        'q4-1': null,
        'q4-2': null,
        'q4-3': null
    };
    
    // ラジオボタンをリセット
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // 次へボタンを無効化
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // 最初の画面に戻る
    showSection('welcome');
}

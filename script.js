// 抽選対象の番号リスト
let numbers = [];

// 既に出た番号を保存するリスト
let drawnNumbers = [];

// 抽選ボタンのクリックイベント
document.getElementById("drawButton").addEventListener("click", function () {
  // 初回のみ入力された番号をリストに保存
  if (numbers.length === 0) {
    const input = document.getElementById("numberInput").value;
    numbers = input.split(",").map(num => num.trim()).filter(num => !isNaN(num) && num !== "");

    if (numbers.length === 0) {
      alert("有効な番号を入力してください！");
      return;
    }
  }

  // 抽選可能な番号を計算
  const remainingNumbers = numbers.filter(num => !drawnNumbers.includes(num));

  if (remainingNumbers.length === 0) {
    document.getElementById("result").textContent = "すべての番号が抽選されました！";
    return;
  }

  // ランダムに番号を選択
  const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
  const result = remainingNumbers[randomIndex];

  // 選ばれた番号を保存
  drawnNumbers.push(result);

  document.getElementById("result").textContent = `当選番号: ${result}`;
});

// リセットボタンのクリックイベント
document.getElementById("resetButton").addEventListener("click", function () {
  // 全データを初期化
  numbers = [];
  drawnNumbers = [];
  document.getElementById("numberInput").value = "";
  document.getElementById("result").textContent = "リセットしました。番号を入力してください。";
});

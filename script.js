// クイズデータ（answer は choices の正解インデックス）
const quizData = [
  {
    question: "日本で一番面積が大きい都道府県はどこ？",
    choices: ["北海道", "岩手県", "長野県", "新潟県"],
    answer: 0,
    explanation: "北海道が最大で、日本の面積の約5分の1を占めます。"
  },
  {
    question: "水は何度で沸騰する？（1気圧のとき）",
    choices: ["80℃", "90℃", "100℃", "120℃"],
    answer: 2,
    explanation: "1気圧のもとでは水は100℃で沸騰します。"
  },
  {
    question: "1年は何日？（うるう年を除く）",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2,
    explanation: "通常の年は365日、うるう年は366日です。"
  },
  {
    question: "太陽系で一番大きい惑星はどれ？",
    choices: ["地球", "木星", "土星", "火星"],
    answer: 1,
    explanation: "木星が太陽系最大の惑星です。"
  },
  {
    question: "日本の首都はどこ？",
    choices: ["大阪", "京都", "名古屋", "東京"],
    answer: 3,
    explanation: "日本の首都は東京です。"
  },
  {
    question: "世界で一番面積が大きい国はどこ？",
    choices: ["カナダ", "中国", "アメリカ", "ロシア"],
    answer: 3,
    explanation: "ロシアが世界最大の面積を持つ国です。"
  },
  {
    question: "虹は一般的に何色といわれている？",
    choices: ["5色", "6色", "7色", "8色"],
    answer: 2,
    explanation: "日本では赤・橙・黄・緑・青・藍・紫の7色といわれます。"
  },
  {
    question: "1時間は何秒？",
    choices: ["600秒", "3600秒", "6000秒", "36000秒"],
    answer: 1,
    explanation: "1時間は60分、1分は60秒なので3600秒です。"
  },
  {
    question: "日本で一番高い山はどれ？",
    choices: ["富士山", "北岳", "槍ヶ岳", "御嶽山"],
    answer: 0,
    explanation: "富士山（標高3776m）が日本一高い山です。"
  },
  {
    question: "人間の体で一番大きい臓器はどれ？",
    choices: ["心臓", "肝臓", "皮膚", "胃"],
    answer: 2,
    explanation: "皮膚は面積・重さともに体で最大の臓器です。"
  }
];

let currentIndex = 0;
let score = 0;

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const commentEl = document.getElementById("comment");
const retryBtn = document.getElementById("retry-btn");

// 問題を表示する
function showQuestion() {
  const q = quizData[currentIndex];
  progressEl.textContent = `第${currentIndex + 1}問 / 全${quizData.length}問`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectChoice(i));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
}

// 選択肢を選んだときの処理
function selectChoice(selected) {
  const q = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  buttons.forEach((b) => (b.disabled = true));
  buttons[q.answer].classList.add("correct");

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = `正解！ ${q.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    buttons[selected].classList.add("incorrect");
    feedbackEl.textContent = `不正解… 正解は「${q.choices[q.answer]}」です。${q.explanation}`;
    feedbackEl.classList.add("incorrect");
  }

  nextBtn.textContent = currentIndex === quizData.length - 1 ? "結果を見る" : "次へ";
  nextBtn.hidden = false;
}

// 結果を表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${quizData.length}問中${score}問正解`;
  if (score === quizData.length) {
    commentEl.textContent = "全問正解！すばらしい！";
  } else if (score >= quizData.length / 2) {
    commentEl.textContent = "よくできました！";
  } else {
    commentEl.textContent = "もう一度挑戦してみましょう。";
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
});

showQuestion();

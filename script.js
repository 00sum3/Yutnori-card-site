

function pickRandomCardNumber() {
  return Math.floor(Math.random() * TOTAL_CARDS) + 1;
}

function numberToFilename(n) {
  const fileNumber = String(n).padStart(3, "0");
  return `images/card_${fileNumber}.jpg`;
}

/* index.html: 버튼 클릭 → 로딩 페이지 */
const drawBtn = document.getElementById("draw-btn");
if (drawBtn) {
  drawBtn.addEventListener("click", () => {
    window.location.href = "loading.html";
  });
}

/* loading.html: 1초 후 결과 페이지로 이동 */
if (window.location.pathname.includes("loading.html")) {
  setTimeout(() => {
    const randomNumber = pickRandomCardNumber();
    sessionStorage.setItem("cardNumber", String(randomNumber));
    window.location.href = "result.html";
  }, 1000);
}



/* result.html: 카드 보여주기 및 다시 뽑기 */
const TOTAL_CARDS = 217; // 테스트면 3, 실제면 100

function pickRandomCardNumber() {
  return Math.floor(Math.random() * TOTAL_CARDS) + 1;
}

function numberToFilename(n) {
  const fileNumber = String(n).padStart(3, "0");
  return `images/card_${fileNumber}.jpg`;
}

const stage = document.getElementById("stage");
const currentImg = document.getElementById("card-current");
const nextImg = document.getElementById("card-next");
const redrawBtn = document.getElementById("redraw-btn");

if (stage && currentImg && nextImg && redrawBtn) {
  let saved = sessionStorage.getItem("cardNumber");
  if (!saved) {
    saved = String(pickRandomCardNumber());
    sessionStorage.setItem("cardNumber", saved);
  }
  currentImg.src = numberToFilename(Number(saved));

  let isAnimating = false;
  const DURATION = 720; // CSS transition과 동일

  redrawBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    redrawBtn.disabled = true;

    const next = pickRandomCardNumber();
    sessionStorage.setItem("cardNumber", String(next));
    nextImg.src = numberToFilename(next);

    stage.classList.add("is-transitioning");

    setTimeout(() => {
      currentImg.src = nextImg.src;
      stage.classList.remove("is-transitioning");

      isAnimating = false;
      redrawBtn.disabled = false;
    }, DURATION + 40);
  });
}

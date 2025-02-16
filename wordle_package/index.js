let index = 0;
let attempt = 0;
let userWord = "";

async function appStart() {
  //서버에서 정답을 받아오는 코드
  const response = await fetch("/answer");
  const data = await response.json();
  const answer = data.answer;

  startTimer();
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    if (key.length === 1 && key >= "A" && key <= "Z") {
      if (thisBlock) {
        thisBlock.innerText = key;
        index += 1;
      }
    } else if (key === "ENTER") {
      if (index < 5) {
        return;
      }
      checkAnswer();
      if (attempt < 6) {
        attempt += 1;
        index = 0;
      }
      if (attempt === 6) {
        stopTimer();
        alert("실패하였습니다.");
      }
    } else if (key === "BACKSPACE") {
      if (index > 0) {
        index -= 1;
        const prevBlock = document.querySelector(
          `.board-block[data-index='${attempt}${index}']`
        );
        if (prevBlock) prevBlock.innerText = "";
      }
      return;
    }
  };

  //정답 비교기능
  const checkAnswer = () => {
    userWord = "";

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempt}${i}']`
      );
      if (block) userWord += block.innerText;
      if (userWord == answer) {
        stopTimer();
        setTimeout(() => {
          alert("정답입니다!");
        }, 100);
      }
    }

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempt}${i}']`
      );

      if (block) {
        if (userWord[i] === answer[i]) {
          block.style.backgroundColor = "green";
        } else if (answer.includes(userWord[i])) {
          block.style.backgroundColor = "yellow";
        } else {
          block.style.backgroundColor = "gray";
        }
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // 타이머 시작 함수
  function startTimer() {
    let seconds = 0;
    let minutes = 0;
    const timeElement = document.querySelector(".time");
    timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      timeElement.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }
  // 타이머 멈추는 함수
  function stopTimer() {
    clearInterval(timerInterval);
  }

  // 정답이후에 다음칸에 입력이 안되게 수정해야함
}

appStart();

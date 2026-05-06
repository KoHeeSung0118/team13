const codes = {
    business: "8",
    auditorium: "2",
    food: "7",
    math: "4",
    word: "1",
    pe: "9"
};

const collected = [];

const quizzes = {
    business: {
        title: "e비즈니스과 경제 퀴즈",
        reward: "8",
        questions: [
            {
                q: "가격이 오르면 수요가 감소하는 현상은?",
                options: ["공급 증가", "수요의 법칙", "기회비용", "한계효용"],
                answer: 1
            },
            {
                q: "어떤 선택을 할 때 포기해야 하는 가장 큰 가치는?",
                options: ["매몰비용", "기회비용", "한계비용", "고정비용"],
                answer: 1
            },
            {
                q: "총수입 - 총비용 = ?",
                options: ["매출", "이익", "비용", "자산"],
                answer: 1
            }
        ]
    },

    auditorium: {
        title: "강당 탈출 퀴즈",
        reward: "2",
        questions: [
            {
                q: "디미고 OT는 몇 번일까?",
                options: ["1번", "2번", "3번"],
                answer: 2
            },
            {
                q: "동아리 홍보는 강당에서 진행한다.",
                options: ["O", "X"],
                answer: 0
            }
        ]
    },

    food: {
        title: "급식 메뉴 초성 퀴즈",
        reward: "7",
        questions: [
            {
                q: "ㄷㄲㅅ",
                options: ["돈까스", "닭갈비", "도토리묵"],
                answer: 0
            },
            {
                q: "ㅉㅈㅁ",
                options: ["짬짜면", "짜장면", "쫄쫄면"],
                answer: 1
            },
            {
                q: "ㄹㅈㅁㄹㄸㅂㅇ",
                options: ["로제마라떡볶이", "리조마라떡볶음", "로제마늘떡볶이"],
                answer: 0
            }
        ]
    },

    math: {
        title: "행수쌤의 퀴즈",
        reward: "4",
        questions: [
            {
                q: "행수쌤의 이름은?",
                options: ["이효현", "이효원", "김효현"],
                answer: 0
            },
            {
                q: "행수쌤은 어디 반의 부 담임 쌤일까?",
                options: ["1반", "2반", "3반"],
                answer: 0
            },
            {
                q: "행수쌤을 만나면?",
                options: ["인사한다", "못 본 척 한다", "물구나무를 선다"],
                answer: 0
            }
        ]
    },

    word: {
        title: "제제쌤의 초성 퀴즈",
        reward: "1",
        questions: [
            {
                q: "주식을 몰래 사면?",
                options: ["시크릿 주주", "비밀 투자자", "몰래 개미"],
                answer: 0
            },
            {
                q: "사회가 망하면?",
                options: ["사회가 부도", "사회 파산", "경제 멸망"],
                answer: 0
            },
            {
                q: "제제쌤의 이름은?",
                options: ["이민주", "김민주", "박민주"],
                answer: 0
            }
        ]
    },

    pe: {
        title: "동영쌤의 체육 퀴즈",
        reward: "9",
        questions: [
            {
                q: "올바른 운동 순서는?",
                options: [
                    "운동 → 준비 스트레칭 → 마사지 → 마무리 스트레칭",
                    "준비 스트레칭 → 운동 → 마무리 스트레칭 → 마사지",
                    "마사지 → 운동 → 준비 스트레칭 → 마무리 스트레칭"
                ],
                answer: 1
            },
            {
                q: "친구가 다쳤을 때 가장 먼저 해야 할 일은?",
                options: ["쌤 부르기", "친구 놀리기", "다치게 한 친구 때리기"],
                answer: 0
            }
        ]
    }
};

function goScene(sceneId) {
  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });

  document.getElementById(sceneId).classList.add("active");

  document.querySelectorAll(".map-panel button").forEach(btn => {
    btn.classList.remove("active-map");
  });

  const mapButtons = document.querySelectorAll(".map-panel button");

  mapButtons.forEach(btn => {
    if (btn.getAttribute("onclick").includes(sceneId)) {
      btn.classList.add("active-map");
    }
  });
}

function openModal(title, text) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalText").innerHTML = text;
    document.getElementById("quizArea").innerHTML = "";
    document.getElementById("modalBg").style.display = "flex";
}

function closeModal() {
    document.getElementById("modalBg").style.display = "none";
}

function openQuiz(type) {
    const quiz = quizzes[type];

    document.getElementById("modalTitle").innerText = quiz.title;
    document.getElementById("modalText").innerHTML =
        "문제를 모두 맞히면 비밀번호 숫자 하나를 얻을 수 있다.";

    const quizArea = document.getElementById("quizArea");
    quizArea.innerHTML = "";

    let current = 0;

    function renderQuestion() {
        const question = quiz.questions[current];

        quizArea.innerHTML = `
      <p><b>${current + 1}. ${question.q}</b></p>
    `;

        question.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "quiz-btn";
            btn.innerText = option;

            btn.onclick = () => {
                if (index === question.answer) {
                    current++;

                    if (current >= quiz.questions.length) {
                        clearQuiz(type);
                    } else {
                        renderQuestion();
                    }
                } else {
                    quizArea.innerHTML += `<p class="wrong">틀렸다. 다시 생각해보자.</p>`;
                }
            };

            quizArea.appendChild(btn);
        });
    }

    renderQuestion();

    document.getElementById("modalBg").style.display = "flex";
}

function clearQuiz(type) {
    const quiz = quizzes[type];

    if (!collected.includes(quiz.reward)) {
        collected.push(quiz.reward);
    }

    updateCodeBox();

    document.getElementById("quizArea").innerHTML = `
    <p class="correct">정답이다!</p>
    <p>비밀번호 숫자 <b>${quiz.reward}</b> 를 획득했다.</p>
  `;
}

function updateCodeBox() {
    document.getElementById("codeBox").innerText =
        collected.length ? collected.join(" ") : "없음";
}

function checkFinalCode() {
    const input = document.getElementById("finalInput").value;
    const answer = "827419";

    if (input === answer) {
        openModal(
            "탈출 성공",
            `
      자물쇠가 열린다.<br><br>
      정문 밖으로 나가자 벚꽃이 흩날린다.<br><br>
      A는 디미고에서의 추억을 떠올리며 조용히 웃는다.<br><br>
      그런데 눈을 떠보니 낯선 강의실이다.<br><br>
      칠판에는 이렇게 적혀 있다.<br><br>
      <b>대학교 OT를 시작하겠습니다.</b><br><br>
      [ TO BE CONTINUED... ]
      `
        );
    } else {
        openModal(
            "탈출 실패",
            "비밀번호가 맞지 않는다.<br><br>학교 곳곳에서 숫자 6개를 모두 모아야 한다."
        );
    }
}
goScene("intro");
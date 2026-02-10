/* =========================
   1. 노션 연동 정보
========================= */
const NOTION_TOKEN = "ntn_k6686049164ay7IY9aNDVzS5tn4Y8NBjepUtL4N...";
const DATABASE_ID = "303e76dfc6a380308c28f18aa37cde15";
/* =========================
   2. 실행 확인용 로그
========================= */
console.log("script.js 정상 실행됨");

/* =========================
   3. 노션 데이터 불러오기
========================= */
async function loadPortfolio() {
  console.log("노션 fetch 시작");

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("응답 상태:", response.status);

    const data = await response.json();
    console.log("노션 데이터:", data);

    renderPortfolio(data.results);
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

/* =========================
   4. 화면에 출력
========================= */
function renderPortfolio(items) {
  const container = document.getElementById("portfolio");

  if (!container) {
    console.error("#portfolio 요소가 없음");
    return;
  }

  if (!items || items.length === 0) {
    container.innerHTML = "<p>불러온 포트폴리오가 없습니다.</p>";
    return;
  }

  items.forEach(item => {
    const title =
      item.properties?.["수산물 상세"]?.title?.[0]?.plain_text ||
      "제목 없음";

    const subtitle =
      item.properties?.Subtitle?.rich_text?.[0]?.plain_text ||
      "";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${title}</h3>
      <p>${subtitle}</p>
    `;

    container.appendChild(card);
  });
}

/* =========================
   5. 실행
========================= */
loadPortfolio();

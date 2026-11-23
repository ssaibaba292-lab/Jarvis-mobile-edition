
const API = "https://bold-pond-94cdsai-jarvis-api.chvssganeshsai.workers.dev";

const chat = document.getElementById("chat");
const input = document.getElementById("msg");

const assets = {
  forex: ["EURUSD", "EURJPY", "EURGBP"],
  crypto: ["BTCUSD", "ETHUSD"],
  commodities: ["XAUUSD", "XAGUSD", "WTIUSD"]
};

async function getPrice(market, symbol) {
  const response = await fetch(
    `${API}/?market=${market}&symbol=${symbol}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }
  return data;
}

function add(text, who = "ai") {
  const d = document.createElement("div");
  d.className = "msg " + who;
  d.innerText = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

async function showMarkets() {
  add("J.A.R.V.I.S: Fetching live market prices...");

  for (const [market, symbols] of Object.entries(assets)) {
    for (const symbol of symbols) {
      try {
        const data = await getPrice(market, symbol);
        add(`${symbol}: Bid ${data.b} | Ask ${data.a}`);
      } catch (error) {
        add(`${symbol}: ${error.message}`);
      }
    }
  }
}

document.getElementById("send").onclick = async () => {
  const t = input.value.trim();
  if (!t) return;

  add("YOU: " + t, "user");
  input.value = "";

  const command = t.toLowerCase();

  if (command === "prices" || command === "market") {
    await showMarkets();
  } else {
    add("J.A.R.V.I.S: Try typing MARKET to get live prices.");
  }
};


import fs from "fs";

const API_KEY = "d6ot1d9r01qk3chi2370d6ot1d9r01qk3chi237g";

async function fetchStocks() {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.log("API RESPONSE:", data);
      throw new Error("API did not return stock list");
    }

    const cleaned = data.map((stock) => ({
      symbol: stock.symbol,
      description: stock.description
    }));

    fs.writeFileSync(
      "./public/stocks.json",
      JSON.stringify(cleaned, null, 2)
    );

    console.log("✅ stocks.json created successfully!");
  } catch (error) {
    console.error("❌ Error fetching stocks:", error);
  }
}

fetchStocks();
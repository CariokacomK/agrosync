import pool from "./client";

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW() as now");
    console.log("✅ Conexão bem-sucedida:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Erro na conexão:", err);
  } finally {
    await pool.end();
  }
}

testConnection();

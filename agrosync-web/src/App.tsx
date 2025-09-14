import Sidebar from "./components/Sidebar.tsx";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Bem-vindo ao Agro Sync</h1>
      </main>
    </div>
  );
}

export default App;
import "./App.css";
import Heading from "./components/Heading";
import Input from "./components/Input";

function App() {
  return (
    <>
      <main className="app-main">
        <div className="weather-container">
          <div className="heading-card">
            <Heading />
          </div>
          <div className="input-section">
            <Input />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

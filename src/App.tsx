import React, { useState } from "react";
import Laureates from "./pages/Laureates";
import NobelPrizes from "./pages/NobelPrizes";

function App() {
  const [showLaureates, setShowLaureates] = useState(false);

  return (
    <div className="App">
      <div>
        <p>
          Приветствую, к сожалению у меня нету времени чтобы делать красивый и адаптивный дизайн,{" "}
          <br />
          поэтому прикреплю ссылки на некоторые из своих работ дабы показать что я могу в дизайн{" "}
          <br />
          <a href="https://gamechanger.kz" target="_blank" rel="noopener noreferrer">
            https://gamechanger.kz
          </a>
        </p>
        <p>На счет валидации, сделал только в инпуте "Имя", и то самую базовую</p>
      </div>
      <header>
        <button onClick={() => setShowLaureates(true)}>Поиск лауреата</button>
        <button onClick={() => setShowLaureates(false)}>Поиск награды</button>
      </header>
      {showLaureates ? <Laureates /> : <NobelPrizes />}
    </div>
  );
}

export default App;

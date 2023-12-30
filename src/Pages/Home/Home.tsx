import { navigateto } from "../../navigator";
import { HomeStyle } from "./HomeStyle";

function Home() {
  return (
    <div style={HomeStyle.content}>
      <div style={HomeStyle.titlecontainer}>
        <div style={HomeStyle.title}>Welcome</div>
        <div style={HomeStyle.subtitle}>Select a telemetry mode</div>
      </div>
      <div style={HomeStyle.container}>
        <div onClick={() => navigateto("/simple")} style={HomeStyle.box}>
          Simple
        </div>
        <div onClick={() => navigateto("/duel")} style={HomeStyle.box}>
          Duel
        </div>
      </div>
    </div>
  );
}

export default Home;

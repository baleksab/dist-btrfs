import { useEffect } from "react";
import { getAllRemoteServers } from "./apis";

const App = () => {
  useEffect(() => {
    getAllRemoteServers().then(data => console.log(data.data?.[0]?.ipAddress));
  });

  return <p>Test</p>;
};

export default App;

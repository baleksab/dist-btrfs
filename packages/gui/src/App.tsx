import { useRemoteServers } from "./hooks";

const App = () => {
  const { data, isPending } = useRemoteServers();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return <ul>
    {data?.map(server => <li key={server.uid}>{server.uid} - {server.ipAddress}</li>)}
  </ul>;
};

export default App;

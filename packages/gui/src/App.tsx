import { useEffect } from "react";

const App = () => {
  const test = () => console.log(123);

  useEffect(() => console.log(123), [test]);

  return <p>Test 23 12 </p>;
};

export default App;

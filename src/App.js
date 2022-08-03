import Card from "./Card";
import NewExpense from "./NewExpense";

import { useState, useEffect } from "react";
import { database } from "./firebase";
import { onValue, ref } from "firebase/database";

const App = () => {
  const [data, setData] = useState();
  const [keys, setkeys] = useState();

  useEffect(() => {
    onValue(ref(database, `expenses/`), (snapshot) => {
      const data = snapshot.val();
      const newKeys = Object.keys(data);
      const newData = Object.values(data);
      setData([...newData]);
      setkeys([...newKeys]);
    });
  }, []);
  return (
    <>
      <Card data={data} />
      <NewExpense data={data} keys={keys} />
    </>
  );
};

export default App;

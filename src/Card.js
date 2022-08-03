import { useState, useEffect } from "react";
import { database } from "./firebase";
import { onValue, ref, set } from "firebase/database";

const Card = ({ data }) => {
  const [balance, setBalance] = useState();
  const [currentBalance, setCurrentbalance] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async () => {
    await set(ref(database, `balance`), {
      totalBalance: balance,
    });
  };

  const calCurrentBalance = (data) => {
    let newCurrent = 0;
    for (let i = 0; i < data.length; i++) {
      newCurrent += parseInt(data[i].value);
    }

    setCurrentbalance(balance - newCurrent);
  };
  useEffect(() => {
    onValue(ref(database, `balance`), async (snapshot) => {
      const data = await snapshot.val();
      // setCurrentbalance(data.currentBalance);
      setBalance(data.totalBalance);
    });
    balance && calCurrentBalance(data);
  }, [data]);
  return (
    <div className="app__card-container">
      <div className="app__card">
        {/* <input
          type="number"
          className="app__balance-input"
          value={balance}
          onChange={(e) => {
            setBalance(e.target.value);
          }}
        /> */}
        <h2 onClick={() => setOpenModal(true)}>{balance} $</h2>
        <hr />
        <h4>Total Balance</h4>
      </div>

      <div className="app__card">
        <h2>
          {currentBalance} <span>$</span>
        </h2>
        <hr />
        <h4>Current Balance</h4>
      </div>
      <div
        className="app__modal"
        style={!openModal ? { display: "none" } : { display: "block" }}
      >
        <p
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          x Close
        </p>
        <h3 style={{ textAlign: "center", fontSize: 24 }}>Add Balance</h3>
        <form className="app__modal-form" onSubmit={handleSubmit}>
          <input
            type="number"
            value={balance}
            // name="inputBalance"
            onChange={(e) => {
              setBalance(e.target.value);
            }}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Card;

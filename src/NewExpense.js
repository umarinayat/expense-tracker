import { useState } from "react";
import { writeNewExpense, database } from "./firebase";
import { ref, remove } from "firebase/database";

const NewExpense = ({ data, keys }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    writeNewExpense(title, amount);
    setOpenModal(false);
    setTitle("");
    setAmount("");
  };
  const deleteExpense = (key) => {
    remove(ref(database, `expenses/${key}`));
  };

  return (
    <>
      <div className="app__expense-container">
        <button
          className="app__expense-button"
          onClick={() => setOpenModal(!openModal)}
        >
          +
        </button>
        <table style={{ width: "65%", marginTop: 10, border: "solid" }}>
          <tbody style={{ border: "solid" }}>
            <tr style={{ backgroundColor: "#2596be", color: "black" }}>
              <th>Title</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {data &&
              data.map((item, index) => (
                <tr style={{ textAlign: "center" }} key={keys[index]}>
                  <td>{item.newExpense}</td>
                  <td>{item.value}</td>
                  <td
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteExpense(keys[index])}
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
          <h3 style={{ textAlign: "center", fontSize: 24 }}>Add New Expense</h3>
          <form className="app__modal-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button>Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewExpense;

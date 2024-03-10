import "./lembretes.css";
import { useState, useEffect } from "react";

const Lembretes = () => {
  const [lembrete, setLembrete] = useState([]);
  const [error, setError] = useState("");
  var today = new Date();

  function deleteItem(id) {
    fetch(`https://localhost:7079/api/TodoItems/${id}`, {
      method: "DELETE",
    })
      .then(() => getItems())
      .catch((error) => console.error("Unable to delete item.", error));
  }

  const getItems = () => {
    fetch("https://localhost:7079/api/TodoItems")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setLembrete(data);
      })
      .catch((error) => console.log(error));
  };

  const postItems = (e) => {
    e.preventDefault();
    const addName = document.getElementById("name");
    const addDate = document.getElementById("date");

    const item = {
      Id: undefined,
      Name: addName.value.trim(),
      Date: addDate.value.trim(),
    };
    if (!isValidDate(date.value)) {
      setError(
        "Data inválida. Por favor, insira uma data no formato dd/mm/yyyy, e que esteja no futuro."
      );
      return;
    }
    fetch("https://localhost:7079/api/TodoItems", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((r) => r.json())
      .then(() => {
        setError("");
        addDate.value = "";
        addName.value = "";
        getItems();
      })
      .catch((error) => console.log(error));
  };

  const isValidDate = (dateString) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(dateString)) {
      return false;
    }

    const [day, month, year] = dateString.split("/");
    const dateObject = new Date(year, month - 1, day);

    const currentDate = new Date();
    if (dateObject <= currentDate) {
      return false;
    }

    return (
      dateObject.getFullYear() === parseInt(year, 10) &&
      dateObject.getMonth() === parseInt(month, 10) - 1 &&
      dateObject.getDate() === parseInt(day, 10)
    );
  };

  const agruparLembretes = lembrete.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  useEffect(getItems, []);

  return (
    <>
      <div id="main">
        <form onSubmit={postItems} method="POST">
          <h1> Novo Lembrete</h1>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nome
            </span>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="Nome do Lembrete"
              aria-label="Nome do Lembrete"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nome
            </span>
            <input
              type="text"
              className="form-control"
              name="date"
              id="date"
              placeholder="Data do lembrete (no formato dd/mm/yyyy)"
              aria-label="Data do lembrete (no formato dd/mm/yyyy)"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <input type="submit" value={"Criar"} className="botao" />
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <hr />
        <h1>Lembretes</h1>
        {Object.keys(agruparLembretes).map((date, index) => (
          <div key={index} id="lembretes">
            <strong>
              <p>{date}</p>
            </strong>
            <table>
              <tbody>
                {agruparLembretes[date].map((lembrete, index) => (
                  <tr key={index}>
                    <td>
                      {lembrete.name}
                      <svg
                        onClick={() => deleteItem(lembrete.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="red"
                        className="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lembretes;

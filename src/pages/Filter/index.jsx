import React, { useState } from "react";
const fakeData = [
  { id: 1, name: "Olma" },
  { id: 2, name: "Nok" },
  { id: 3, name: "Banan" },
  { id: 4, name: "Ananas" },
  { id: 5, name: "Olcha" },
  { id: 5, name: "Anor" },
];
const Filter = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(fakeData);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newArray = fakeData.filter((item) => {
      return item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });
    let sortedData = newArray.sort((a, b) => {
      if (
        a.name.toLowerCase().indexOf(value.toLowerCase()) >
        b.name.toLowerCase().indexOf(value.toLowerCase())
      ) {
        return 1;
      } else if (
        a.name.toLowerCase().indexOf(value.toLowerCase()) <
        b.name.toLowerCase().indexOf(value.toLowerCase())
      ) {
        return -1;
      } else {
        if (a.name > b.name) return 1;
        else return -1;
      }
    });
    setData(sortedData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Search</button>
        <button type="button" onClick={() => setData(fakeData)}>
          Clear
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nomi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;

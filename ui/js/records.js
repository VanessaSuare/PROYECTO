let user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderRecords() {
  const records = await fetch("http://localhost:5000/api/records").then(
    (resp) => resp.json()
  );
  let rows = "";
  records.forEach((Record, index) => {
    rows += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${Record.activity}</td>
        <td>${Record.user}</td>
        <td>${getStatus(Record.status)}</td>
        <td>${new Date(Record.createdAt).toLocaleString("en-US", {
          timeZone: "America/Bogota",
        })}</td>
    </tr>`;
  });

  $("#records-table tbody").html(rows);
}

function getStatus(status) {
  const statuses = {
    CREATED: "Creada",
    IN_PROGRESS: "En Proceso",
    IN_REVIEW: "En Revisión",
    FINISHED: "Terminada",
  };
  return statuses[status];
}

renderRecords();

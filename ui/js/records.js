let user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderRecords() {
  const traces = await fetch("http://192.168.100.2:5000/api/trace").then(
    (resp) => resp.json()
  );
  let rows = "";
  traces.forEach((trace, index) => {
    rows += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${
          new Date(trace.date)
            .toLocaleString("en-US", {
              timeZone: "America/Bogota",
            })
            .split(",")[0]
        }</td>
        <td>${trace.timeWork}</td>
        <td>${trace.timeFree}</td>
        <td>${trace.user}</td>
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

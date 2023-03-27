let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}

user = JSON.parse(user);

$("#profile-name").text(user.name);

if (user.role === "BOSS") {
  renderBossDashboard();
  loadUsersForm();
}

async function renderBossDashboard() {
  const resp = await fetch("http://localhost:3000/api/activities");
  const records = await resp.json();

  let rows = "";
  records.forEach((activity, index) => {
    rows += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${activity.description}</td>
        <td>${getType(activity.type)}</td>
        <td>${activity.isFreeTime ? "Si" : "No"}</td>
    </tr>`;
  });

  $("#records-table tbody").html(rows);
}

function getType(type) {
  const types = { START: "INICIO", FINISH: "FIN" };
  return types[type];
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

async function loadUsersForm() {
  const resp = await fetch("http://localhost:3000/api/users?role=WORKER");
  const users = await resp.json();
  let options = "";
  users.forEach((user) => {
    options += `
    <option value="${user.id}">${user.name}</option>
    `;
  });
  $("#user-select").html(options);
}

$("#activity-alert").hide();

$("#create-activity-form").submit(async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target).entries();
  formData = [...formData];
  const data = {
    userId: formData[0][1],
    priority: formData[1][1],
    description: formData[2][1],
  };
  const resp = await fetch(
    "http://localhost:4000/api/records?userid=" + user.id,
    {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (resp.status === 201) {
    $("#activity-alert").fadeIn().delay(2000).fadeOut();
  }

  setTimeout(() => location.reload(), 2500);
});

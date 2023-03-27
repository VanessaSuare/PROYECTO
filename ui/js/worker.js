let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderWorkerDashboard() {
  const resp = await fetch(
    "http://localhost:4000/api/records?userid=" + user.id
  );
  const records = await resp.json();

  let rows = "";
  let options = "";
  records.forEach((activity, index) => {
    rows += `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${activity.description}</td>
          <td>${getPriority(activity.priority)}</td>
          <td>${getStatus(activity.status)}</td>
      </tr>`;
    options += `<option value=${activity.id}>${activity.description}</option>`;
  });

  $("#activity-select").html(options);
  $("#records-table tbody").html(rows);
}

function getPriority(priority) {
  const priorities = { LOW: "BAJA", MEDIUM: "MEDIA", HIGH: "ALTA" };
  return priorities[priority];
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
renderWorkerDashboard();

$("#activity-alert").hide();
$("#update-activity-form").submit(async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target).entries();
  formData = [...formData];
  const data = {
    status: formData[1][1],
  };
  const resp = await fetch(
    "http://localhost:4000/api/records/" + formData[0][1],
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (resp.status === 200) {
    $("#activity-alert").fadeIn().delay(2000).fadeOut();
    setTimeout(() => location.reload(), 2500);
  }
});

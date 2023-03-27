let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderWorkerDashboard() {
  const resp = await fetch(
    "http://localhost:4000/api/records/byUserId/" +
      user.id +
      "?date=" +
      new Date().toISOString()
  );
  const records = await resp.json();

  let rows = "";
  records.forEach((record, index) => {
    rows += `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${record.activity.description}</td>
          <td>${new Date(record.createdAt).toLocaleString("en-US", {
            timeZone: "America/Bogota",
          })}</td>
      </tr>`;
  });

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
    activityId: formData[0][1],
    userId: user.id,
  };
  const resp = await fetch("http://localhost:4000/api/records/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (resp.status === 201) {
    $("#activity-alert").fadeIn().delay(2000).fadeOut();
    setTimeout(() => location.reload(), 2500);
  }
});

async function loadActivities() {
  const resp = await fetch("http://localhost:3000/api/activities/");
  const activities = await resp.json();
  let options = "";
  activities.forEach((activity) => {
    options += `<option value='${activity.id}'>${activity.description}</option>`;
  });
  $("#select-activities").html(options);
}

loadActivities();

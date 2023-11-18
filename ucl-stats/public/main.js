var trash = document.getElementsByClassName("fa fa-trash");
var edit = document.getElementsByClassName("fas fa-edit");
var save = document.getElementsByClassName("fas fa-save");

Array.from(edit).forEach(function (element) {
  element.addEventListener("click", function () {
    const listItem = this.closest(".message");

    // Replace text content with input fields
    ["name", "minutes", "goals", "assists"].forEach((field) => {
      const textContent = listItem
        .querySelector(`.${field}`)
        .textContent.trim();
      const inputField = `<input type="text" class="edit-${field}" value="${textContent}" />`;
      listItem.querySelector(`.${field}`).innerHTML = inputField;
    });

    // Change 'edit' button to 'save' button (optional)
    // this.textContent = 'Save'; // Uncomment and modify as needed
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    // Use closest and querySelector like in the edit functionality to ensure accuracy
    const listItem = this.closest(".message");
    const name = listItem.querySelector(".name").textContent.trim(); // Trim the name here
    const minutes = parseFloat(listItem.querySelector(".minutes").textContent);
    const goals = parseFloat(listItem.querySelector(".goals").textContent);
    const assists = parseFloat(listItem.querySelector(".assists").textContent);

    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, // Use the accurately fetched name
        minutes: minutes,
        goals: goals,
        assists: assists,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

Array.from(save).forEach(function (element) {
  element.addEventListener("click", function () {
    const listItem = this.closest(".message");
    const name = listItem.querySelector(".name").value;
    const minutes = parseFloat(listItem.querySelector(".edit-minutes").value);
    const goals = parseFloat(listItem.querySelector(".edit-goals").value);
    const assists = parseFloat(listItem.querySelector(".edit-assists").value);

    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        minutes: minutes,
        goals: goals,
        assists: assists,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

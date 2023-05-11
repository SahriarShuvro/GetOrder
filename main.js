window.addEventListener("DOMContentLoaded", function () {
  let BASE_LINK = "https://dummyjson.com";
  let tableBody = document.querySelector("#tableBody");
  let audio = document.querySelector("#audio");
  let toastContainer = document.querySelector(".toast-container");

  fetch(`${BASE_LINK}/products`)
    .then((res) => res.json())
    .then((data) => data.products)
    .then((result) => {
      console.log(result);
      let i = 0;
      let intervalId = setInterval(function () {
        const { id, brand, category, description, discountPercentage } =
          result[i];

        // Add toast message for the new row
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");
        toast.innerHTML = `
            <div class="toast-header">
              <strong class="me-auto">New Row Added</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              A new row is being added to the table.
            </div>
          `;
        toastContainer.appendChild(toast);

        // Show the toast message
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();

        // Add the new row to the table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<th scope="row">${id}</th> <td>${brand}</td> <td>${category.toUpperCase()}</td> <td>${description}</td> <td>${discountPercentage}$</td>`;
        newRow.classList.add("fade-in");
        tableBody.appendChild(newRow);
        audio.play();

        i++;
        if (i >= result.length) {
          clearInterval(intervalId);
        }
      }, 10000);
    });
});

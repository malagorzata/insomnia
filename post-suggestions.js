const form = document.querySelector("form");
form.addEventListener("submit", userSubmitted);

function userSubmitted(evt) {
  evt.preventDefault();
  console.log(form.elements.username.value);
  console.log(form.elements.title.value);
  console.log(form.elements.content.value);

  const payload = {
    username: form.elements.username.value,
    title: form.elements.title.value,
    content: form.elements.content.value,
  };
  document.querySelector("input[type=submit]").disabled = true;
  fetch("https://kea2021-907c.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "602e264f5ad3610fb5bb6267",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector("input[type=submit]").disabled = false;
      form.elements.username.value = "";
      form.elements.title.value = "";
      form.elements.content.value = "";
      document.querySelector(".response.hidden").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
}

// form.elements.username.focus();
// document.querySelector("input[type=submit]").setAttribute("disabled", true);
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
// });
// form.elements.username.addEventListener("keyup", (e) => {
//   if (e.target.value.length > 5) {
//     form.elements.title.focus();
//   }
// });

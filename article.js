const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("article");

fetch(
  "https://kea2021-907c.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "602e264f5ad3610fb5bb6267",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector("h1").textContent = data.title;
  document.querySelector(".contentPost").textContent = data.content;

  document.querySelector(".usernamePost span").textContent = data.username;

  const template = document.querySelector("template.commentsTemplate").content;
  data.comments.forEach((comment) => {
    console.log(comment);
    const copy = template.cloneNode(true);
    copy.querySelector(".email").textContent = comment.email;
    copy.querySelector(".username").textContent = comment.username;
    copy.querySelector(".content").textContent = comment.content;
    document.querySelector("main.commentsSection").appendChild(copy);
  });
  if (data.comments.length == 0) {
    const copy = template.cloneNode(true);
    copy.querySelector(".email").textContent =
      "No comments yet, be the first one to post";
    document.querySelector(".commentsSection").appendChild(copy);
  }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    username: form.elements.username.value,
    email: form.elements.email.value,
    content: form.elements.content.value,
    date: Date.now(),
  };

  console.log(payload);
  fetch(`https://kea2021-907c.restdb.io/rest/posts/${articleId}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "602e264f5ad3610fb5bb6267",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      const template = document.querySelector("template.commentsTemplate")
        .content;
      const copy = template.cloneNode(true);

      copy.querySelector(".email").textContent = data.email;
      copy.querySelector(".username").textContent = data.username;
      copy.querySelector(".content").textContent = data.content;
      document.querySelector("main.commentsSection").appendChild(copy);
    });
}

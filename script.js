function getData() {
  fetch("https://kea2021-907c.restdb.io/rest/posts", {
    method: "GET",
    headers: {
      "x-apikey": "602e264f5ad3610fb5bb6267",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getData();

function showPosts(posts) {
  console.log(posts);
  const template = document.querySelector("template.frontpagelist").content;

  posts.forEach((post) => {
    console.log(post);
    const copy = template.cloneNode(true);
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector("a.readmore").href = `article.html?article=${post._id}`;

    document.querySelector(".postsSection").appendChild(copy);
  });
}

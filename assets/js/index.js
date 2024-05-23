import { fetchAPI, showMessage, getUserInfo } from "./core.js";

function renderPostItem(post) {
  return `
  <div class="recipe-line">
    <a href="recipes/detail.html?postId=${post.id}">
        <div class="recipe-line-container">
        <img src="${post.media.url}" alt="${post.media.alt}" />

        <p>${post.title}</p>
        </div>
    </a>
    </div>`;
}

function renderPostCarousel(post) {
  return `
    <div class="carousel-slide">
        <div class="carousel-slide-container">
            <img src="${post.media.url}" alt="${post.media.alt}" />
            <p>${post.title}</p>
        </div>
    </div>
    `;
}

function renderPostList(posts) {
  return posts.map(renderPostItem);
}

function renderPostCarouselList(posts) {
  return posts.map(renderPostCarousel);
}

async function init() {
  const userInfo = getUserInfo();
  try {
    const data = await fetchAPI(`/blog/posts/${userInfo.name}`, "GET");
    const listPostElm = document.querySelector(".recipe-row");
    const listPostCarouselElm = document.querySelector(".carousel-slides");

    listPostElm.innerHTML = renderPostList(data.data);
    listPostCarouselElm.innerHTML = renderPostCarouselList(data.data);
  } catch (error) {
    showMessage("Failed to load the data", "error");
  }
}

init();

//elementlerı secme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

//init github object
const github = new Github();
// ınıt ui object
const ui = new UI();
function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}
eventListeners();
function getData(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    alert("Lütfen gecerlı bır ad giriniz");
    // console.log("asdads");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("Kullanıcı bulunamadı");
          console.log("Hata");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch((error) => ui.showError(error));
  }
  ui.clearinput();
  e.preventDefault();
}

function clearAllSearched() {
  //tum arananları temızle
  if (confirm("emin misiniz")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedUsersFromUI();
  }
}
function getAllSearched() {
  //arananları storagedan al ve uıye yukle
  // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
  let users = Storage.getSearchedUsersFromStorage();
  let result = "";
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}

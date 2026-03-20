const button = document.getElementById("loadBtn");
const container = document.getElementById("usersContainer");
const statusText = document.getElementById("status");
const userCountSelect = document.getElementById("userCount");

button.addEventListener("click", fetchUsers);

async function fetchUsers() {
  container.innerHTML = "";
  statusText.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    let count = userCountSelect.value;
    let displayedUsers = users;

    if (count !== "all") {
      displayedUsers = users.slice(0, Number(count));
    }

    renderUsers(displayedUsers);
    statusText.textContent = "";

  } catch (error) {
    statusText.textContent = " Error loading users.";
    console.error(error);
  }
}

function renderUsers(users) {
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <h3><span class="icon">🧑</span> ${user.name}</h3>
  <p><span class="icon">✉️</span> ${user.email}</p>
  <p><span class="icon">📞</span> ${user.phone}</p>
  <p><span class="icon">🔗</span> ${user.website}</p>
  <p><span class="icon">💼</span> ${user.company.name}</p>
`;

    container.appendChild(card);
  });
}

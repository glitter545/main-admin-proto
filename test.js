const people = [
  {
    name: "Ali Bin Ahmad",
    address: "123 Jalan ABC, Taman XYZ, 12345 Kuala Lumpur",
    phone: "012-3456789",
    email: "ali@example.com",
    picture: "./pictures/ali.png",
    database: 5,
    publisher: "MF WORLDWIDE RESOURCES"
  },
  {
    name: "Siti Binti Kamal",
    address: "456 Jalan DEF, Taman UVW, 67890 Petaling Jaya",
    phone: "011-9876543",
    email: "siti@example.com",
    picture: "./pictures/ali.png",
    database: 3,
    publisher: "MF WORLDWIDE RESOURCES"
  },
  {
    name: "Ahmad Bin Ismail",
    address: "789 Jalan GHI, Taman RST, 54321 Shah Alam",
    phone: "017-1234567",
    email: "ahmad@example.com",
    picture: "./pictures/ali.png",
    database: 2,
    publisher: "MF WORLDWIDE RESOURCES"
  },
  {
    name: "Khairul Azman",
    address: "246 Jalan STU, Taman VWX, 77777 Shah Alam",
    phone: "016-9871234",
    email: "khairul@example.com",
    picture: "./pictures/ali.png",
    database: 4,
    publisher: "MF WORLDWIDE RESOURCES"
  },
  {
    name: "Nurul Huda",
    address: "101 Lorong MNO, Taman PQR, 88888 Subang Jaya",
    phone: "019-5554443",
    email: "nurul@example.com",
    picture: "./pictures/ali.png",
    database: 6,
    publisher: "MF WORLDWIDE RESOURCES"
  },
  // ... (other people data)

  {
    name: "Aisyah Binti Abdullah",
    address: "123 Jalan Harmoni, Taman Murni, 12345 Kuala Lumpur",
    phone: "012-3456789",
    email: "aisyah@example.com",
    picture: "./pictures/ali.png",
    database: 1,
    publisher: "MURPHEES MARKETING & TRADING"
  },
  {
    name: "Zainal Bin Ahmad",
    address: "456 Jalan Bahagia, Taman Damai, 67890 Petaling Jaya",
    phone: "011-9876543",
    email: "zainal@example.com",
    picture: "./pictures/ali.png",
    database: 1,
    publisher: "MURPHEES MARKETING & TRADING"
  },
  {
    name: "Nor Azman",
    address: "789 Jalan Mesra, Taman Ceria, 54321 Shah Alam",
    phone: "017-1234567",
    email: "nor@example.com",
    picture: "/pictures/nor.png",
    database: 1,
    publisher: "MURPHEES MARKETING & TRADING"
  },
  {
    name: "Fatimah Binti Ali",
    address: "101 Lorong Bahagia, Taman Seri, 88888 Subang Jaya",
    phone: "019-5554443",
    email: "fatimah@example.com",
    picture: "/pictures/fatimah.png",
    database: 1,
    publisher: "MURPHEES MARKETING & TRADING"
  },
  {
    name: "Kamarul Zaman",
    address: "246 Jalan Gemilang, Taman Sentosa, 77777 Shah Alam",
    phone: "016-9871234",
    email: "kamarul@example.com",
    picture: "/pictures/kamarul.png",
    database: 1,
    publisher: "MURPHEES MARKETING & TRADING"
  }
];


const allNames = people.map(pro => pro.name);
const searchInput = document.getElementById('searchInput');
new Awesomplete(searchInput, { list: allNames });

searchInput.addEventListener('input', event => {
  const searchTerm = event.target.value;
  updateProListAjax(searchTerm, getCurrentPage());
});

const proList = document.getElementById('proList');
const totalDatabaseCountSpan = document.getElementById('totalDatabaseCount');
const searchPublisherInput = document.getElementById('searchPublisherInput');
const nextPageButton = document.getElementById('nextPage');
const prevPageButton = document.getElementById('prevPage');
let currentPage = 1;

searchPublisherInput.addEventListener('input', () => {
  updateProListAjax(searchInput.value, getCurrentPage());
});

function updateProListAjax(searchTerm, page) {
  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;
  const itemsToDisplay = people.slice(startIndex, endIndex);

  proList.innerHTML = '';

  itemsToDisplay.forEach(pro => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="${pro.picture}" target="_blank"><img src="${pro.picture}" alt="${pro.name}'s Picture" width="50"></a></td>
      <td>${pro.name}</td>
      <td>${pro.address}</td>
      <td>${pro.publisher}</td>
      <td>${pro.phone}</td>
      <td>${pro.email}</td>
      <td>${pro.database}</td>
    `;
  
    row.querySelectorAll('td').forEach(cell => {
      cell.style.verticalAlign = 'middle';
    });
  
    proList.appendChild(row);
  });

  totalDatabaseCountSpan.textContent = people.length;
  updatePaginationButtons(page, Math.ceil(people.length / 5));
}

nextPageButton.addEventListener('click', () => {
  const nextPage = currentPage + 1;
  const totalPages = Math.ceil(people.length / 5);
  if (nextPage <= totalPages) {
    currentPage = nextPage;
    updateProListAjax(searchInput.value, nextPage);
  }
});

prevPageButton.addEventListener('click', () => {
  const prevPage = currentPage - 1;
  if (prevPage >= 1) {
    currentPage = prevPage;
    updateProListAjax(searchInput.value, prevPage);
  }
});

function updatePaginationButtons(currentPage, totalPages) {
  nextPageButton.disabled = currentPage === totalPages;
  prevPageButton.disabled = currentPage === 1;
}

function getCurrentPage() {
  return currentPage;
}

updateProListAjax('', getCurrentPage());
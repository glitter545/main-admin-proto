// const people = [
//   {
//     name: "Ali Bin Ahmad",
//     ic: "123456-12-1234",
//     picture: "./pictures/ali.png",
//     address: "123 Jalan ABC, Taman XYZ, 12345 Kuala Lumpur",
//     phone: "012-3456789",
//     email: "ali@example.com",
//     database: 5,
//     publisher: "MF WORLDWIDE RESOURCES"
//   },
//   {
//     name: "Siti Binti Kamal",
//     ic: "987654-23-5678",
//     picture: "./pictures/ali.png",
//     address: "456 Jalan DEF, Taman UVW, 67890 Petaling Jaya",
//     phone: "011-9876543",
//     email: "siti@example.com",
//     database: 3,
//     publisher: "MF WORLDWIDE RESOURCES"
//   },
//   {
//     name: "Ahmad Bin Ismail",
//     ic: "456789-34-6789",
//     picture: "./pictures/ali.png",
//     address: "789 Jalan GHI, Taman RST, 54321 Shah Alam",
//     phone: "017-1234567",
//     email: "ahmad@example.com",
//     database: 7,
//     publisher: "MF WORLDWIDE RESOURCES"
//   },
//   {
//     name: "Khairul Azman",
//     ic: "234567-45-2345",
//     picture: "./pictures/ali.png",
//     address: "246 Jalan STU, Taman VWX, 77777 Shah Alam",
//     phone: "016-9871234",
//     email: "khairul@example.com",
//     database: 4,
//     publisher: "MF WORLDWIDE RESOURCES"
//   },
//   {
//     name: "Nurul Huda",
//     ic: "789012-56-7890",
//     picture: "./pictures/ali.png",
//     address: "101 Lorong MNO, Taman PQR, 88888 Subang Jaya",
//     phone: "019-5554443",
//     email: "nurul@example.com",
//     database: 6,
//     publisher: "MF WORLDWIDE RESOURCES"
//   },
//   // ... (other people data)

//   {
//     name: "Aisyah Binti Abdullah",
//     ic: "123456-12-1234",
//     picture: "./pictures/ali.png",
//     address: "123 Jalan Harmoni, Taman Murni, 12345 Kuala Lumpur",
//     phone: "012-3456789",
//     email: "aisyah@example.com",
//     database: 1,
//     publisher: "MURPHEES MARKETING & TRADING"
//   },
//   {
//     name: "Zainal Bin Ahmad",
//     ic: "987654-23-5678",
//     picture: "./pictures/ali.png",
//     address: "456 Jalan Bahagia, Taman Damai, 67890 Petaling Jaya",
//     phone: "011-9876543",
//     email: "zainal@example.com",
//     database: 1,
//     publisher: "MURPHEES MARKETING & TRADING"
//   },
//   {
//     name: "Nor Azman",
//     ic: "456789-34-6789",
//     picture: "/pictures/nor.png",
//     address: "789 Jalan Mesra, Taman Ceria, 54321 Shah Alam",
//     phone: "017-1234567",
//     email: "nor@example.com",
//     database: 1,
//     publisher: "MURPHEES MARKETING & TRADING"
//   },
//   {
//     name: "Fatimah Binti Ali",
//     ic: "234567-45-2345",
//     picture: "/pictures/fatimah.png",
//     address: "101 Lorong Bahagia, Taman Seri, 88888 Subang Jaya",
//     phone: "019-5554443",
//     email: "fatimah@example.com",
//     database: 1,
//     publisher: "MURPHEES MARKETING & TRADING"
//   },
//   {
//     name: "Kamarul Zaman",
//     ic: "789012-56-7890",
//     picture: "/pictures/kamarul.png",
//     address: "246 Jalan Gemilang, Taman Sentosa, 77777 Shah Alam",
//     phone: "016-9871234",
//     email: "kamarul@example.com",
//     database: 1,
//     publisher: "MURPHEES MARKETING & TRADING"
//   }
// ];


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

// Change the event listener for the publisher search input to match the PRO search input
searchPublisherInput.addEventListener('input', event => {
  const searchTermPublisher = event.target.value;
  updateProListAjax(searchInput.value, searchTermPublisher, getCurrentPage());
});

// Update the updateProListAjax function to accept both search terms


function updateProListAjax(searchTerm, searchTermPublisher, page) {
  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;

  const filteredItems = people.filter(pro => {
    return (
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      pro.publisher.toLowerCase().includes(searchTermPublisher.toLowerCase())
    );
  });

  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  proList.innerHTML = '';

  itemsToDisplay.forEach((pro, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${pro.name}</td>
      <td>${pro.ic}</td>
      <td><a href="${pro.picture}" target="_blank"><img src="${pro.picture}" alt="${pro.name}'s Picture" width="50"></a></td>
      <td>${pro.address}</td>
      <td>${pro.phone}</td>
      <td>${pro.email}</td>
      <td>${pro.database}</td>
      <td>${pro.publisher}</td>
    `;

    row.querySelectorAll('td').forEach(cell => {
      cell.style.verticalAlign = 'middle';
    });

    proList.appendChild(row);
  });

  totalDatabaseCountSpan.textContent = filteredItems.length; // Update the count based on filtered items
  updatePaginationButtons(page, Math.ceil(filteredItems.length / 5));
}

nextPageButton.addEventListener('click', () => {
  const nextPage = currentPage + 1;
  const totalPages = Math.ceil(people.length / 5);
  if (nextPage <= totalPages) {
    currentPage = nextPage;
    updateProListAjax(searchInput.value, searchPublisherInput.value, nextPage);
  }
});

prevPageButton.addEventListener('click', () => {
  const prevPage = currentPage - 1;
  if (prevPage >= 1) {
    currentPage = prevPage;
    updateProListAjax(searchInput.value, searchPublisherInput.value, prevPage);
  }
});


function updatePaginationButtons(currentPage, totalPages) {
  nextPageButton.disabled = currentPage === totalPages;
  prevPageButton.disabled = currentPage === 1;
}

function getCurrentPage() {
  return currentPage;
}

updateProListAjax('', '', getCurrentPage());

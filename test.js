const people = [
    {
      name: "Ali Bin Ahmad",
      address: "123 Jalan ABC, Taman XYZ, 12345 Kuala Lumpur",
      phone: "012-3456789",
      email: "ali@example.com",
      link:"./pros/alibinahmad.html"
    },
    {
      name: "Siti Binti Kamal",
      address: "456 Jalan DEF, Taman UVW, 67890 Petaling Jaya",
      phone: "011-9876543",
      email: "siti@example.com"
    },
    {
      name: "Ahmad Bin Ismail",
      address: "789 Jalan GHI, Taman RST, 54321 Shah Alam",
      phone: "017-1234567",
      email: "ahmad@example.com"
    },
    {
      name: "Nurul Huda",
      address: "101 Lorong MNO, Taman PQR, 88888 Subang Jaya",
      phone: "019-5554443",
      email: "nurul@example.com"
    },
    {
      name: "Khairul Azman",
      address: "246 Jalan STU, Taman VWX, 77777 Shah Alam",
      phone: "016-9871234",
      email: "khairul@example.com"
    },
    {
      name: "Aisyah Binti Abdullah",
      address: "123 Jalan Harmoni, Taman Murni, 12345 Kuala Lumpur",
      phone: "012-3456789",
      email: "aisyah@example.com"
    },
    {
      name: "Zainal Bin Ahmad",
      address: "456 Jalan Bahagia, Taman Damai, 67890 Petaling Jaya",
      phone: "011-9876543",
      email: "zainal@example.com"
    },
    {
      name: "Nor Azman",
      address: "789 Jalan Mesra, Taman Ceria, 54321 Shah Alam",
      phone: "017-1234567",
      email: "nor@example.com"
    },
    {
      name: "Fatimah Binti Ali",
      address: "101 Lorong Bahagia, Taman Seri, 88888 Subang Jaya",
      phone: "019-5554443",
      email: "fatimah@example.com"
    },
    {
      name: "Kamarul Zaman",
      address: "246 Jalan Gemilang, Taman Sentosa, 77777 Shah Alam",
      phone: "016-9871234",
      email: "kamarul@example.com"
    }
  ];
  
  // Extract names from the people array
  const allNames = people.map(pro => pro.name);
  
  // Populate the search suggestions
  const searchInput = document.getElementById('searchInput');
  new Awesomplete(searchInput, { list: allNames });
  
  // Add an event listener to update the table when the search input changes
  searchInput.addEventListener('input', event => {
    const searchTerm = event.target.value;
    updateProList(searchTerm);
  });
  
  const proList = document.getElementById('proList');
  
  function updateProList(searchTerm) {
    proList.innerHTML = ''; // Clear the current list
  
    const filteredPros = people.filter(pro => {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      return pro.name.toLowerCase().includes(lowercaseSearchTerm);
    });
  
    filteredPros.forEach(pro => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${pro.name}</td>
        <td>${pro.address}</td>
        <td>${pro.phone}</td>
        <td>${pro.email}</td>
        <td><button class="view-button">View Database</button></td>
      `;
      proList.appendChild(row);
    });
  }
  
  // ... your previous script code ...
  // ... your previous script code ...

// Add an event listener to handle the "View Database" button click
proList.addEventListener('click', event => {
    if (event.target.classList.contains('view-button')) {
      const row = event.target.closest('tr');
      const name = row.querySelector('td:first-child').textContent;

      // Find the person's data by name
      const person = people.find(person => person.name === name);

      // Navigate to the specified link
      if (person && person.link) {
        window.location.href = person.link;
      }
    }
  });

  updateProList(''); // Initial update with empty search term to show all pros
  
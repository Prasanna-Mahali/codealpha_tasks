const books = [
    { id: 1, title: "1984", author: "George Orwell", category: "Dystopian" },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "History" }
  ];
  
  let history = [];
  
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const bookList = document.getElementById('bookList');
  const historyList = document.getElementById('historyList');
  
  function displayBooks() {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    bookList.innerHTML = '';
  
    const filtered = books.filter(book =>
      (category === 'All' || book.category === category) &&
      (book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search))
    );
  
    filtered.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book';
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><em>${book.category}</em></p>
        <button onclick="borrowBook(${book.id})">Borrow</button>
      `;
      bookList.appendChild(div);
    });
  }
  
  function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    const date = new Date().toLocaleDateString();
    history.push({ ...book, date });
    updateHistory();
  }
  
  function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.title} by ${entry.author} - borrowed on ${entry.date}`;
      historyList.appendChild(li);
    });
  }
  
  searchInput.addEventListener('input', displayBooks);
  categorySelect.addEventListener('change', displayBooks);
  
  displayBooks();
  
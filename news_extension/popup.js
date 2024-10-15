function displayNews(articles) {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = ''; // Clear existing content

  if (!articles || articles.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No news articles available at the moment.';
    newsList.appendChild(li);
    return;
  }

  articles.forEach(article => {
    if (article.title && article.url) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = article.url;
      a.target = '_blank';
      a.textContent = article.title;
      li.appendChild(a);
      newsList.appendChild(li);
    }
  });
}

function displayError(message) {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = `<li style="color: red;">${message}</li>`;
}

chrome.runtime.sendMessage({ action: 'fetchNews' }, response => {
  if (response.success) {
    const data = response.data;
    if (data.status === 'ok' && Array.isArray(data.articles)) {
      displayNews(data.articles.slice(0, 5));
    } else {
      displayError('Invalid API response format');
    }
  } else {
    console.error('Error fetching news:', response.error);
    displayError('Failed to fetch news. Please try again later.');
  }
});
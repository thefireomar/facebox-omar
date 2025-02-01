const url = 'https://dummyjson.com/posts';
const randomUserUrl = 'https://randomuser.me/api/?gender=male&inc=name,picture&results=1';

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (!data || !data.posts || !Array.isArray(data.posts) || data.posts.length < 5) {
      console.error('Invalid data:', data);
      return;
    }

    const post1 = document.getElementById('post1');
    const post2 = document.getElementById('post2');
    const post3 = document.getElementById('post3');
    const post4 = document.getElementById('post4');
    const post5 = document.getElementById('post5');

    if (!post1 || !post2 || !post3 || !post4 || !post5) {
      console.error('Element not found');
      return;
    }

    const posts = data.posts;
    if (!Array.isArray(posts) || posts.length < 5) {
      console.error('Invalid data:', data);
      return;
    }

    const randomPosts = [];
    while (randomPosts.length < 5) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      const randomPost = posts[randomIndex];
      if (!randomPosts.includes(randomPost)) {
        randomPosts.push(randomPost);
      }
    }

    if (!randomPosts[0] || !randomPosts[1] || !randomPosts[2] || !randomPosts[3] || !randomPosts[4]) {
      console.error('Invalid data:', data);
      return;
    }

    // Fetch random user data for each post
    const fetchRandomUser = async (postIndex) => {
      const response = await fetch(randomUserUrl);
      const userData = await response.json();
      const user = userData.results[0];
      return user;
    };

    // Create HTML for each post
    const createPostHTML = async (postIndex) => {
      const user = await fetchRandomUser(postIndex);
      const post = randomPosts[postIndex];
      return `
        <div style="display: flex; align-items: center;">
          <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
          <div>
            <h2>${user.name.first} ${user.name.last}</h2>
          </div>
        </div>
        <div>
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        </div>
      `;
    };

    // Set HTML for each post
    createPostHTML(0).then(html => post1.innerHTML = html);
    createPostHTML(1).then(html => post2.innerHTML = html);
    createPostHTML(2).then(html => post3.innerHTML = html);
    createPostHTML(3).then(html => post4.innerHTML = html);
    createPostHTML(4).then(html => post5.innerHTML = html);
  })
  .catch(error => {
    console.error('Error:', error);
  });
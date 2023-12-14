document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();

  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();

  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems, options);
}); 

/*import { getCommentsForPost } from './js/db.js';

document.addEventListener('DOMContentLoaded', async function () {
  // Fetch comments for a specific post (replace 'postId' with the actual post ID)
  const postId = 'your_post_id_here';
  const comments = await getCommentsForPost(postId);

  // Display comments on the webpage
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = generateCommentsHTML(comments);
});

function generateCommentsHTML(comments) {
  // Create HTML string for comments
  return comments.map(comment => `
    <div class="comment">
      <p>${comment.text}</p>
      <span>Posted by: ${comment.userId}</span>
    </div>
  `).join('');
}; */

/*import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


document.addEventListener('DOMContentLoaded', function () {
  const accountButton = document.querySelector('.logged-in');
  const logoutButton = document.querySelector('.logged-in');

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is logged in
          accountButton.classList.remove('hide');
          logoutButton.classList.remove('hide');
      } else {
          // User is logged out
          accountButton.classList.add('hide');
          logoutButton.classList.add('hide');
      }
  });
});*/
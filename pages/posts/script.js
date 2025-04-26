function randomChoice() {
    choices = ['id_lte=50', 'id_gte=50'];
    index = Math.floor(Math.random() * 2);
    return choices[index];
}

window.onload = async function (e) {
    const preloader = document.getElementById('preloader');
    const posts = document.getElementById('posts');

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?${randomChoice()}`);
        const json = await response.json();
        preloader.style.display = 'none';
        posts.style.display = 'block';

        json.forEach(p => {
            const post = document.createElement('div');
            post.innerHTML = `
                    <h4>>User ID : ${p.userId}</h4>
                    <p><strong> ${p.title}</strong></p>
                    <p>${p.body}</p>
                    <p><em>post ID : ${p.id}</em></p>
                `;
            posts.appendChild(post);
        });
    }
    catch (error) {
        const err = document.getElementById('error');

        const img = document.createElement('img');
        img.src = '../../img/warning.png';
        img.alt = 'Знак ошибки';

        err.appendChild(img)
        err.textContent = error.message

        preloader.style.display = 'none';
    }
}

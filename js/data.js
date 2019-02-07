document.addEventListener('DOMContentLoaded', () => {
const contentPosts = $('#allposts');

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/photos'
];

// Fetch 
Promise.all(urls.map(url =>
    fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Ups!, hay un problema', error))
)).then(data => {

    generatePosts(data[0]);
});

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generatePosts(posts) {
    posts.map((post) => {
        let article = createNode('article'),
            h2 = createNode('h2'),
            p = createNode('p'),
            span = createNode('span');

        article.setAttribute('id', post.id);
        article.classList.add('post--item');
        span.classList.add('post_date--item');
        span.innerHTML = `Autor: ${post.userId}`;
        p.innerHTML = `${post.body}`;
        h2.innerHTML = `${post.title}`;

        fetch('https://jsonplaceholder.typicode.com/photos/' + post.id)
            .then(res => res.json())
            .then((json) => {
                let images = json;
                let div = createNode('div')
                img = createNode('img');
                img.src = images.thumbnailUrl;
                img.alt = images.title;
                img.classList.add('photo-thumb');
                append(div, img);
                append(article, div);
            })
            .catch(error => console.log('Ups!, hay un problema', error));

        append(article, h2);
        append(article, span);
        append(article, p);
        append(contentPosts, article);
    })

}

function $(element) {
    return document.querySelector(element);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, child) {
    return parent.appendChild(child);
}

 })


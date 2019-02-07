document.addEventListener('DOMContentLoaded', () => {
    const contentPosts = $('#allposts');

    const urls = [
        'https://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/photos'
    ];

    const promesas = [];

    // Creando promise
    function createPromise(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => resolve(res.json()))
                .catch(error => reject(error))
        })
    }

    urls.map(url => promesas.push(createPromise(url)));

    Promise.all(promesas).then(values => {
        generatePosts(values);
    })


    function generatePosts(posts) {
        posts[0].map((text, index) => {

            let article = createNode('article'),
                h2 = createNode('h2'),
                p = createNode('p'),
                span = createNode('span'),
                div = createNode('div'),
                img = createNode('img');

            article.setAttribute('id', text.id);
            article.classList.add('post-item');
            span.classList.add('post_date--item');
            span.innerHTML = `Autor: ${text.userId}`;
            p.classList.add('post_content--text');
            p.innerHTML = `${text.body}`;
            h2.innerHTML = `${text.title}`;

            // Nodo Imagenes
            img.src = posts[1][index].thumbnailUrl;
            img.alt = posts[1][index].title;
            img.classList.add('photo-thumb');
            append(div, img);


            // Agregando contenido a article
            append(article, h2);
            append(article, span);
            append(article, p);
            append(article, div);

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
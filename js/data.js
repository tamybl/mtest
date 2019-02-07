document.addEventListener('DOMContentLoaded', () => {
    const contentPosts = $('#allposts'); 

    const urls = [
        ''
    ]

    // Fetch 
    function fetchData(url) {
        return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Ups!, hay un problema', error))
    }



    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((json) => {
            let data = json;
            data.map((post) => {
                let article = createNode('article'),
                    h2 = createNode('h2'),
                    p = createNode('p'),
                    span = createNode('span');

                article.setAttribute('id', post.id);    
                span.innerHTML = `Autor: ${post.userId}`;
                p.innerHTML = `${post.body}`;
                h2.innerHTML = `${post.title}`;

                append(article, h2);
                append(article, span);
                append(article, p);
                append(contentPosts, article);
            })

        }).catch(error => console.log(error));

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


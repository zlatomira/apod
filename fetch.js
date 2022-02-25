'use strict'

let showErrorMessage = (message) => {
    let h = document.createElement("H1");
    let t = document.createTextNode(message);
    h.classList.add('error');
    h.appendChild(t);
    document.body.prepend(h);

}

let fetch_nasa_pod = async () => { 
    const api_key = 'dAe2DiVpGevffiP4tjHfXaaeiVoh7bWLEFGqjLcy';
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const json_response = await response.json();
    return json_response;
};

fetch_nasa_pod()
.then(image => {
    const img = document.getElementById('picture');
    const title = document.getElementById('title');
    const explanation = document.getElementById('explanation');
    const picture_wrapper = document.getElementById('picture_wrapper')
    img.src = image.url;
    picture_wrapper.classList.remove('loading');
    title.innerHTML = image.title;
    explanation.innerHTML = image.explanation;
})
.catch(e => {
    showErrorMessage(`Something went wrong: ${e.message}`)
});
let projects = document.querySelector('.projects');
let projectButton = document.querySelector('.project-button');
let designButton = document.querySelector('.design-button');
let selection = document.querySelector('#social');
let designs = document.querySelector('.designs');
let toTop = document.querySelector('.to-top');
let loader = document.querySelector('#loader');
let main = document.querySelector('main');

console.log(designs);


document.onreadystatechange = () => {
    if(document.readyState !== 'complete'){
        main.style.display = 'none';
        loader.style.visibility = 'visible';
    } else {
        setTimeout(() => loader.style.opacity = '0', 50);
        loader.addEventListener('transitionend', () => {
            loader.style.display = 'none';
            main.style.display = '';
        }, false);

    }
}

const loadImage = (id, targetId) => {
    let element = document.querySelector(`#${id}`);
    let targetElement = targetId ? document.querySelector(`#${targetId}`) : element;
    let imageToLoad;
    if (element.dataset.image) imageToLoad = element.dataset.image;
    else if (typeof element.currentSrc === 'undefined') imageToLoad = element.currentSrc;
    else imageToLoad = element.currentSrc;
    if (imageToLoad) {
        let img = new Image();
        img.src = imageToLoad;
        img.onload = () => targetElement.classList.add('is-loaded');
    }
}

const toggleWorks = (target, nonTarget) => {
    if (target.style.display === 'none') {
        toTop.style.visibility = 'visible';
        target.style.display = 'grid';
        if (target.style.opacity === '1') target.style.opacity = '0';
        setTimeout(()=> target.style.opacity = '1', 30);
    } else {
        toTop.style.visibility = 'hidden';
        target.style.opacity = '0';
        target.addEventListener('transitionend', (e) => {
            target.style.display = 'none';
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }
    nonTarget.style.display = 'none';
}

const changeColor = (target, nonTarget) => {
    target.style.color !== 'green' ? target.style.color = 'green' : target.style.color = '#003049';
    nonTarget.style.color = '#003049';
}

document.addEventListener(
    'DOMContentLoaded',
    () => loadImage('pictureImage', 'picture'));

toTop.addEventListener(
    'click',
    () => {
        selection.scrollIntoView({behavior: 'smooth'})
    });

projectButton.addEventListener(
    'click',
    () => toggleWorks(projects, designs),
    false);

designButton.addEventListener(
    'click',
    () => toggleWorks(designs, projects),
    false);

projectButton.addEventListener('click', () => changeColor(projectButton, designButton), false);
designButton.addEventListener('click', () => changeColor(designButton, projectButton), false);

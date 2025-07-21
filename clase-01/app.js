let change_image = document.getElementsByTagName('button')[3];
let title = document.getElementById('title');
let body = document.body;
console.log(title.style)

title.style.color = 'orange';
body.style.backgroundColor = 'black';

let containers = document.querySelectorAll('.code-block');


console.log(containers)

console.log(containers.classList)

containers.classList.add('code-block');

let containerText = document.getElementById('example');
console.log(containerText);


document.addEventListener('DOMContentLoaded', function () {
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');

    sun.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
    });

    moon.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
    });
});

const facts = [{
    statement: 'JavaScript was created in 10 days by Brendan Eich in 1995',
    answer: true,
    explanation: 'Brendan Eich created JavaScript in 10 days while working at Netscape Communications Corporation in 1995. The language was originally called Mocha and later renamed to LiveScript before finally being named JavaScript.'
}, {
    statement: 'JavaScript is also known as ECMAScript',
    answer: true,
    explanation: 'ECMAScript is the standardized specification of JavaScript. The terms are often used interchangeably.'
}, {
    statement: 'JavaScript can only be run in web browsers',
    answer: false,
    explanation: 'JavaScript can run on web browsers as well as on servers using environments like Node.js.'
}];

let currentFactIndex = 0;
let correctAnswers = 0;

const statement = document.getElementById('statement');
const optionButtons = document.querySelectorAll('#options button');
const explanation = document.getElementById('explanation');
const nextQuestionButton = document.getElementById('next-question');
const scoreDisplay = document.getElementById('score');

function updateFact() {
    const fact = facts[currentFactIndex];
    statement.textContent = fact.statement;
    explanation.textContent = '';
    nextQuestionButton.style.display = 'none';

    for (let button of optionButtons) {
        button.removeAttribute('disabled');
        button.classList.remove('correct', 'incorrect');
    }
}

function disable(button) {
    button.setAttribute('disabled', '');
}

for (let button of optionButtons) {
    button.addEventListener('click', (event) => {
        const fact = facts[currentFactIndex];
        explanation.textContent = fact.explanation;

        for (let clickedButton of optionButtons) {
            disable(clickedButton);
        }

        if (isCorrect(event.target.value)) {
            button.classList.add('correct');
            correctAnswers++;
            showConfetti();
        } else {
            button.classList.add('incorrect');
            showThumbsDownEffect();
        }
        scoreDisplay.textContent = `Score: ${ correctAnswers }/${ facts.length }`;

        setTimeout(() => {
            console.log('Next question');
            nextQuestionButton.style.display = 'block';
        }, 4000);

    });

    nextQuestionButton.addEventListener('click', () => {
        currentFactIndex++;
        if (currentFactIndex < facts.length) {
            updateFact();
        } else {
            statement.textContent = 'Quiz completed!';
            explanation.textContent = `Your final score is ${ correctAnswers } out of ${ facts.length }.`;
            nextQuestionButton.style.display = 'none';
        }
    });
}

function isCorrect(guess) {
    const fact = facts[currentFactIndex];
    return guess === fact.answer.toString();
}

function showConfetti() {
    confetti({
        particleCount: 100, spread: 70, origin: {y: 0.6}
    });
}

function showThumbsDownEffect() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 100, "density": {
                    "enable": true, "value_area": 800
                }
            }, "shape": {
                "type": "image", "image": {
                    "src": "https://symbl-world.akamaized.net/i/webp/39/8bc9c1c1e79fc5155e25fc1b4a5eb1.webp", // Thumbs down emoji URL
                    "width": 72, "height": 72
                }
            }, "opacity": {
                "value": 0.8, "random": false, "anim": {
                    "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false
                }
            }, "size": {
                "value": 20, "random": true, "anim": {
                    "enable": false, "speed": 40, "size_min": 0.1, "sync": false
                }
            }, "move": {
                "enable": true,
                "speed": 6,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false, "rotateX": 600, "rotateY": 1200
                }
            }, "line_linked": {
                "enable": false
            }
        }, "interactivity": {
            "detect_on": "canvas", "events": {
                "onhover": {
                    "enable": false, "mode": "repulse"
                }, "onclick": {
                    "enable": false, "mode": "push"
                }, "resize": true
            }, "modes": {
                "grab": {
                    "distance": 400, "line_linked": {
                        "opacity": 0
                    }
                }, "bubble": {
                    "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3
                }, "repulse": {
                    "distance": 200, "duration": 0.4
                }, "push": {
                    "particles_nb": 4
                }, "remove": {
                    "particles_nb": 2
                }
            }
        }, "retina_detect": true
    });

    setTimeout(() => {
        particlesJS('particles-js', {"particles": {"number": {"value": 0}}});
    }, 3000);
}

updateFact();

const API_KEY = 'DONT_TOUCH_ME';
const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const newChatButton = document.querySelector('button');

function clearInput() {
    inputElement.value = '';
}

function changeInput(value) {
    const currentInputElement = document.querySelector('input');
    currentInputElement.value = value;
}

async function getMessage() {
    console.log('Submit button clicked');    
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log('Response from OpenApi', data);
        outputElement.textContent = data.choices[0].message.content;

        if (data.choices[0].message.content) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.append(pElement);
        }

    } catch (error) {
        console.error(error)
    }
}



submitButton.addEventListener('click', getMessage);
newChatButton.addEventListener('click', clearInput);
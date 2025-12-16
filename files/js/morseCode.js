const textBox1 = document.getElementById("input1");
const textBox2 = document.getElementById("input2");

textBox1.addEventListener("keyup", () => {
    textBox2.value = textToMorse(textBox1.value);
    console.log(textBox2.value);
    console.log(textToMorse(textBox1.value));
});

textBox2.addEventListener("keyup", () => {
    textBox1.value = morseCodeToText(textBox2.value);
    console.log(textBox1.value);
    console.log(morseCodeToText(textBox2.value));
});

// 
function removeSpaces(text){
    let isRemoved = false;
    let returnedText = '';
    let returnedTextIndex = 0;
    for(let i = 0; i < text.length; i++){
        console.log("current character: ", text[i]);
        if(i % 2 == 1) isRemoved = false
        else if(text[i] == ' '){
            isRemoved = true;
            console.log("continue");
            continue;
        }else{

        returnedText[returnedTextIndex] = text[i];
        returnedTextIndex += 1;
        }
    }    

    console.log("returnedText: ", returnedText);
    
}

function charToMorse(character){
    let realCharacter = character.toUpperCase();
    const morseCode = {
        'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
        'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
        'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
        'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
        'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
        'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
        'Y': '-.--',  'Z': '--..',
        '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
        ' ': ' ',     'İ': '.-..-',    'Ö': '---.',   'Ü': '..--',
    };   
    return morseCode[realCharacter] || ' ';
}

function morseToChar(character){
    const char = {
        '.-': 'A',    '-...': 'B',  '-.-.': 'C',  '-..': 'D',
        '.': 'E',     '..-.': 'F',  '--.': 'G',   '....': 'H',
        '..': 'I',    '.---': 'J',  '-.-': 'K',   '.-..': 'L',
        '--': 'M',    '-.': 'N',    '---': 'O',   '.--.': 'P',
        '--.-': 'Q',  '.-.': 'R',   '...': 'S',   '-': 'T',
        '..-': 'U',   '...-': 'V',  '.--': 'W',   '-..-': 'X',
        '-.--': 'Y',  '--..': 'Z',
        '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
        '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
        ' ': ' ','': ' ',
        '.-..-': 'İ', '---.': 'Ö',  '..--': 'Ü'
    }
    // A , * = --., --. *** = A
    return char[character] || ' '
}

function morseCodeToText(morseCode){
    let currentMorse = '';
    let returningText = '';
    // string array marker
    let marker = 0;
    // ..- --
    while(marker < morseCode.length){
        while(marker < morseCode.length &&  morseCode[marker] != ' '){
            currentMorse += morseCode[marker];
            marker += 1;
        }
        
        returningText += morseToChar(currentMorse);
        currentMorse = '';
        if(morseCode[marker] == ' '){
            marker += 1;
            returningText += ' ';
        }
    }

    return returningText;
}

function textToMorse(text){
    console.log(`Translating "`, text,`" to Morse Code`);
    let realText = text.toUpperCase();
    let returningText = ''; 
    for(let i = 0; i < realText.length; i++, returningText += ' '){
        returningText += charToMorse(realText[i]);
    }
    console.log(`Translated to "`,returningText ,`"`);
    return returningText;

}

console.log(textToMorse("adaönünü nününü "));
console.log(morseToChar("--"))
console.log(morseCodeToText("-- -- - -- --- --- --- --"))
console.log(morseCodeToText(textToMorse("adaönünü nününü "))); 

removeSpaces('adana a a a a  a  e  a');
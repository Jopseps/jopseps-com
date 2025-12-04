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
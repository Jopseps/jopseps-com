class Calendar{
    static dayNames = {1:"Yusuf", 2:"Mert", 3:"Raad", 4:"Turan", 5:"Efsane"};
    static months = {
        1: "Yusuf Mert",
        2: "Efsane",
        3: "Iptegaum",
        4: "Barnisum",
        5: "Efsane",
        6: "Rendiyum",
        7: "Gordon",
        8: "Protine",
        9: "Granziyot",
        10: "Asera",
        11: "Bonjourno",
        12: "Ferfolekül",
        13: "Kalsiyum",
        14: "Epot",
        15: "Jarf",
        16: "Indeed"
    };
    static monthDays = {
        1: 25,
        2: 25,
        3: 25,
        4: 25,
        5: 25,
        6: 25,
        7: 25,
        8: 25,
        9: 25,
        10: 25,
        11: 25,
        12: 25,
        13: 25,
        14: 25,
        15: 25,
        16: 15
    };

    day;
    dayName;
    month;
    monthName;

    constructor(dayCountOrDay, month = null){
        if(month !== null){
            this.day = dayCountOrDay;
            this.month = month;
        } else {
            let dayCount = dayCountOrDay;
            for(let i = 1; i < 17; i++){
                if(i < 16 && dayCount > 25) dayCount -= 25;
                else if(i == 16 && dayCount > 25){
                    i = 0;
                    dayCount -= 15;
                }
                else{
                    this.day = dayCount;
                    this.dayName = Calendar.dayNames[(dayCount - 1)% 5 + 1];
                    console.log("adana: ", (dayCount - 1)% 5 + 1)
                    this.month = i;
                    this.monthName = Calendar.months[this.month];
                    break;
                }
            }
        }
    }

}

class GregorianCalendar{
    static monthDays = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };

    day;
    month;
    year;

    constructor(d, m, y){
        this.day = d;
        this.month = m;
        this.year = y;
    }

    sumAllDays(){
        let sum = 0;
        const monthDays = {
            1: 31,
            2: this.year % 4 == 0 ? 29 : 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };
        for(let i = 1; i < this.month; i++){
            sum += monthDays[i];
        }
        sum += this.day;

        return sum;
    }


};


function transformIntoSpecialCalendar(){
    const currentData = new Date();

    const day = currentData.getDate();
    const month = currentData.getMonth() + 1; // getMonth() returns 0-11 so add 1
    const year = currentData.getFullYear();

    let gregorian = new GregorianCalendar(day, month, year);
    let dayCount = gregorian.sumAllDays();
    let calendar = new Calendar(dayCount);

    console.log(day, month, year);
    console.log(calendar.day, calendar.month);
    console.log(calendar.dayName, calendar.monthName);

    return calendar;
}

function transformIntoSpecialCalendarOther(day, month, year = 2000){
    let gregorian = new GregorianCalendar(day, month, year);
    let dayCount = gregorian.sumAllDays();
    let calendar = new Calendar(dayCount);

    console.log("aa")
    console.log(day, month, year);
    console.log(calendar.day, calendar.month);
    console.log(calendar.dayName, calendar.monthName);
}

function applySpecialDays(specialDays, month, dayCell, day) {
    for (const entry of specialDays) {
        if (entry.month !== month) continue;

        const isSingle = entry.day !== undefined;
        const isRange = entry.dayStart !== undefined && entry.dayEnd !== undefined;

        if (isSingle && entry.day === day){
            dayCell.classList.add('special-day');
            dayCell.style.setProperty('--special-color', entry.color);
            dayCell.title = entry.label;
            break;
        }

        if (isRange && day >= entry.dayStart && day <= entry.dayEnd){
            dayCell.style.setProperty('--special-color', entry.color);
            dayCell.title = entry.label;

            if (day === entry.dayStart){
                dayCell.classList.add('special-range-start');
            } else if (day === entry.dayEnd){
                dayCell.classList.add('special-range-end');
            } else {
                dayCell.classList.add('special-range-mid');
            }
            break;
        }
    }
}

async function generateCalendar(){
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return; // no calendar

    let specialDays = [];
    try {
        const res = await fetch('/files/json/special_days.json');
        const data = await res.json();
        specialDays = data.specialDays || [];
    } catch(e){
        console.warn('Could not load special_days.json', e);
    }
    
    const today = transformIntoSpecialCalendar();
    const dayNames = Object.values(Calendar.dayNames).map(name => name[0]); // first letters

    for (let m = 1; m <= 16; m++){
        const monthBox = document.createElement('div');
        monthBox.className = 'month-box';

        // Month name
        const monthName = document.createElement('div');
        monthName.className = 'month-name';
        monthName.textContent = Calendar.months[m];
        monthBox.appendChild(monthName);

        // Days (Y M R T E)
        const daysHeader = document.createElement('div');
        daysHeader.className = 'days-header';
        dayNames.forEach(name => {
            const headerCell = document.createElement('div');
            headerCell.textContent = name;
            daysHeader.appendChild(headerCell);
        });
        monthBox.appendChild(daysHeader);

        // grid
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        const numDays = Calendar.monthDays[m];
        for (let d = 1; d <= numDays; d++){
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = d;

            // today
            if(today.month === m && today.day === d){
                dayCell.classList.add('today');
            }

            // special days
            applySpecialDays(specialDays, m, dayCell, d);

            daysGrid.appendChild(dayCell);
        }
        monthBox.appendChild(daysGrid);

        calendarGrid.appendChild(monthBox);
        applyColorScheme(); // dark mode function
    }
}

// init
if(typeof document !== 'undefined'){
    document.addEventListener('DOMContentLoaded', generateCalendar);
}
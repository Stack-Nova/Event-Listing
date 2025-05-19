// Color codes for event types
const eventTypeColors = {
    workshop: "#1976d2",
    seminar: "#f57c00",
    fest: "#d81b60",
    sports: "#43a047"
};

// Example events
const events = [
    {
        date: "2025-05-13",
        title: "AI Workshop",
        time: "10:00 AM",
        type: "workshop",
        club: "Tech Club",
        completed: true,
        results: "Winner: Alice",
        images: ["https://via.placeholder.com/150"],
        downloadData: "Some result data"
    },
    {
        date: "2025-05-14",
        title: "Painting Seminar",
        time: "2:00 PM",
        type: "seminar",
        club: "Art Society",
        completed: false
    },
    {
        date: "2025-05-15",
        title: "Annual Fest",
        time: "All Day",
        type: "fest",
        club: "Tech Club",
        completed: false
    },
    {
        date: "2025-05-16",
        title: "Football Match",
        time: "4:00 PM",
        type: "sports",
        club: "Sports Club",
        completed: true,
        results: "Team A won",
        images: [],
        downloadData: "Match stats"
    }
];

// Example clubs and members
const clubs = {
    "Tech Club": ["Alice", "Bob", "Charlie"],
    "Art Society": ["David", "Eve", "Frank"],
    "Sports Club": ["Grace", "Hannah", "Ian"]
};

// Calendar state
let currentDate = new Date(); // May 18, 2025
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDateStr = null;
let calendarView = 'month';
let weekStartDate = null; // Track the start of the current week

// Utility functions
function pad(n) { return n < 10 ? '0' + n : n; }
function formatDate(year, month, day) { return `${year}-${pad(month + 1)}-${pad(day)}`; }
function getEventsForDate(dateStr) { return events.filter(ev => ev.date === dateStr); }
function getEventColor(type) { return eventTypeColors[type] || "#888"; }
function getEventsForMonth(year, month) {
    return events.filter(ev => {
        const [evYear, evMonth] = ev.date.split('-').map(Number);
        return evYear === year && evMonth - 1 === month;
    });
}

// Helper function to calculate the start of the week (Sunday)
function getWeekStartDate(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Move to Sunday
    return start;
}

// Left Sidebar: Clubs & Organizers
function renderClubs() {
    const clubSelector = document.getElementById("club-selector");
    clubSelector.innerHTML = '<option value="">Select a Club</option>';
    Object.keys(clubs).forEach(club => {
        clubSelector.innerHTML += `<option value="${club}">${club}</option>`;
    });

    clubSelector.onchange = function () {
        const selectedClub = this.value;
        showMembers(selectedClub);
    };
}

function showMembers(club) {
    const membersList = document.getElementById("members-list");
    membersList.innerHTML = '';
    if (club && clubs[club]) {
        clubs[club].forEach(member => {
            const li = document.createElement("li");
            li.textContent = member;
            membersList.appendChild(li);
        });
    }
}

// Right Panel: Completed and Upcoming Events
function renderRightPanel() {
    // Completed events dropdown
    const completedDropdown = document.getElementById("completed-events-dropdown");
    completedDropdown.innerHTML = '<option value="">Select Event</option>';
    events.filter(e => e.completed).forEach((e, i) => {
        completedDropdown.innerHTML += `<option value="${i}">${e.title} (${e.date})</option>`;
    });

    completedDropdown.onchange = function () {
        const idx = this.value;
        const detailsDiv = document.getElementById("completed-event-details");
        if (idx === "") {
            detailsDiv.innerHTML = "";
            return;
        }

        const event = events.filter(e => e.completed)[idx];
        detailsDiv.innerHTML = `<div><strong>${event.title}</strong><br>
            <span>${event.results || ""}</span>
            ${event.images && event.images.length ? `<img src="${event.images[0]}" alt="Result Image">` : ""}
        </div>`;
    };

    // Download button
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.onclick = function () {
        openDialog();
    };

    // Navbar download button
    const downloadNavBtn = document.getElementById("download-nav-btn");
    downloadNavBtn.onclick = function () {
        openDialog();
    };

    // Upcoming events
    const upcomingList = document.getElementById("upcoming-events-list");
    upcomingList.innerHTML = "";
    events.filter(e => !e.completed).forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${e.title}</strong> (${e.date})<br>
            <span>${e.time} | ${e.club}</span>`;
        upcomingList.appendChild(li);
    });
}

// Download dialog
function openDialog(event = null) {
    const dialog = document.getElementById("download-dialog");
    dialog.style.display = "flex";
    dialog.querySelectorAll('.download-mode').forEach(btn => {
        btn.onclick = function () {
            if (event) {
                alert(`Downloading ${event.title} as ${this.textContent}`);
            } else {
                alert(`Downloading general report as ${this.textContent}`);
            }
            closeDialog();
        };
    });
}

window.closeDialog = function () {
    document.getElementById("download-dialog").style.display = "none";
};

// Calendar Rendering
const periodLabel = document.getElementById('period-label');
const prevPeriodBtn = document.getElementById('prev-period');
const nextPeriodBtn = document.getElementById('next-period');
const weekdaysDiv = document.getElementById('calendar-weekdays');
const daysDiv = document.getElementById('calendar-days');

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderWeekdays() {
    weekdaysDiv.innerHTML = '';
    weekdays.forEach(day => {
        const div = document.createElement('div');
        div.textContent = day;
        weekdaysDiv.appendChild(div);
    });
}

function renderCalendar() {
    daysDiv.innerHTML = '';
    if (calendarView === 'month') {
        daysDiv.classList.remove('year-view');
        daysDiv.classList.remove('week-view');
        weekdaysDiv.classList.remove('week-view');
        renderWeekdays();
        renderMonthView();
    } else if (calendarView === 'week') {
        daysDiv.classList.remove('year-view');
        daysDiv.classList.add('week-view');
        weekdaysDiv.classList.add('week-view');
        renderWeekView();
    } else if (calendarView === 'year') {
        daysDiv.classList.add('year-view');
        daysDiv.classList.remove('week-view');
        weekdaysDiv.classList.remove('week-view');
        renderYearView();
    }
}

function renderMonthView() {
    periodLabel.textContent = `${months[currentMonth]} ${currentYear}`;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const firstDayIndex = firstDay.getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const numberOfDays = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month's days
    for (let i = firstDayIndex; i > 0; i--) {
        const div = document.createElement('div');
        div.className = 'day other-month';
        div.innerHTML = `<span class="day-number">${prevLastDay - i + 1}</span>`;
        daysDiv.appendChild(div);
    }

    // Current month days
    for (let day = 1; day <= numberOfDays; day++) {
        const div = document.createElement('div');
        div.className = 'day';
        div.innerHTML = `<span class="day-number">${day}</span>`;

        const dateStr = formatDate(currentYear, currentMonth, day);
        const dayEvents = getEventsForDate(dateStr);

        // Show colored dots for events
        if (dayEvents.length) {
            const dotsDiv = document.createElement('div');
            dotsDiv.className = 'event-dots';
            dayEvents.forEach(ev => {
                const dot = document.createElement('span');
                dot.className = `event-dot ${ev.type}`;
                dot.title = ev.title + (ev.time ? ` (${ev.time})` : '');
                dotsDiv.appendChild(dot);
            });
            div.appendChild(dotsDiv);
        }

        // If more than 4 events, show "+N more"
        if (dayEvents.length > 4) {
            const moreDiv = document.createElement('div');
            moreDiv.className = 'more-events';
            moreDiv.textContent = `+${dayEvents.length - 4} more`;
            div.appendChild(moreDiv);
        }

        // Highlight today
        const today = new Date();
        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {
            div.classList.add('today');
        }

        // Highlight selected
        const selectedDate = selectedDateStr && selectedDateStr === dateStr;
        if (selectedDate) {
            div.classList.add('selected');
        }

        div.addEventListener('click', () => {
            selectedDateStr = dateStr;
            renderCalendar();
            renderEventDetails(dateStr);
        });

        daysDiv.appendChild(div);
    }

    // Next month's days
    const totalCells = firstDayIndex + numberOfDays;
    const nextDays = 7 - (totalCells % 7 === 0 ? 7 : totalCells % 7);
    for (let i = 1; i <= nextDays; i++) {
        const div = document.createElement('div');
        div.className = 'day other-month';
        div.innerHTML = `<span class="day-number">${i}</span>`;
        daysDiv.appendChild(div);
    }
}

function renderWeekView() {
    // Initialize weekStartDate if not set
    if (!weekStartDate) {
        weekStartDate = getWeekStartDate(currentDate);
    }

    const weekEnd = new Date(weekStartDate);
    weekEnd.setDate(weekStartDate.getDate() + 6);

    // Update currentMonth and currentYear based on weekStartDate
    currentMonth = weekStartDate.getMonth();
    currentYear = weekStartDate.getFullYear();

    periodLabel.textContent = `${months[weekStartDate.getMonth()]} ${weekStartDate.getDate()}, ${weekStartDate.getFullYear()} - ${months[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;

    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStartDate);
        date.setDate(weekStartDate.getDate() + i);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const dateStr = formatDate(year, month, day);

        const div = document.createElement('div');
        div.className = 'day';

        // Day header with weekday label and date
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        const dayLabel = document.createElement('span');
        dayLabel.className = 'day-label';
        dayLabel.textContent = weekdays[i];
        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayHeader.appendChild(dayLabel);
        dayHeader.appendChild(dayNumber);
        div.appendChild(dayHeader);

        // Events for the day
        const dayEvents = getEventsForDate(dateStr);
        const eventsDiv = document.createElement('div');
        eventsDiv.className = 'day-events';
        if (dayEvents.length) {
            dayEvents.forEach(ev => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.style.borderLeftColor = getEventColor(ev.type);
                eventItem.innerHTML = `
                    <span class="event-dot ${ev.type}"></span>
                    <span>${ev.title} ${ev.time ? `(${ev.time})` : ''}</span>
                `;
                eventItem.addEventListener('click', () => {
                    selectedDateStr = dateStr;
                    renderEventDetails(dateStr);
                });
                eventsDiv.appendChild(eventItem);
            });
        } else {
            eventsDiv.innerHTML = '<span>No events</span>';
        }
        div.appendChild(eventsDiv);

        // Highlight today
        const now = new Date();
        if (
            day === now.getDate() &&
            month === now.getMonth() &&
            year === now.getFullYear()
        ) {
            div.classList.add('today');
        }

        // Highlight selected
        if (selectedDateStr === dateStr) {
            div.classList.add('selected');
        }

        // Dim days not in current month
        if (month !== currentMonth || year !== currentYear) {
            div.classList.add('other-month');
        }

        div.addEventListener('click', () => {
            selectedDateStr = dateStr;
            renderCalendar();
            renderEventDetails(dateStr);
        });

        daysDiv.appendChild(div);
    }
}

function renderYearView() {
    daysDiv.innerHTML = '';
    weekdaysDiv.innerHTML = '';
    periodLabel.textContent = `${currentYear}`;

    // Display all 12 months
    for (let m = 0; m < 12; m++) {
        const monthBox = document.createElement('div');
        monthBox.className = 'year-month-box';
        const title = document.createElement('h4');
        title.textContent = months[m];
        monthBox.appendChild(title);

        // Add weekday headers for each month
        const monthWeekdays = document.createElement('div');
        monthWeekdays.className = 'month-weekdays';
        weekdays.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            monthWeekdays.appendChild(dayLabel);
        });
        monthBox.appendChild(monthWeekdays);

        const monthGrid = document.createElement('div');
        monthGrid.className = 'month-grid';

        const firstDay = new Date(currentYear, m, 1);
        const firstDayIndex = firstDay.getDay();
        const daysInMonth = new Date(currentYear, m + 1, 0).getDate();
        const prevLastDay = new Date(currentYear, m, 0).getDate();

        // Previous month's days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'year-day other-month';
            day.textContent = prevLastDay - i;
            monthGrid.appendChild(day);
        }

        // Current month's days
        for (let d = 1; d <= daysInMonth; d++) {
            const day = document.createElement('div');
            day.className = 'year-day';
            day.textContent = d;

            const dateStr = formatDate(currentYear, m, d);
            const dayEvents = getEventsForDate(dateStr);

            // Highlight today
            const today = new Date();
            if (
                d === today.getDate() &&
                m === today.getMonth() &&
                currentYear === today.getFullYear()
            ) {
                day.classList.add('today');
            }

            // Show event dots
            if (dayEvents.length > 0) {
                day.classList.add('has-events');
                const dotsDiv = document.createElement('div');
                dotsDiv.className = 'year-event-dots';
                dayEvents.slice(0, 3).forEach(ev => {
                    const dot = document.createElement('span');
                    dot.className = `event-dot ${ev.type}`;
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    dot.title = ev.title + (ev.time ? ` (${ev.time})` : '');
                    dotsDiv.appendChild(dot);
                });
                day.appendChild(dotsDiv);
            }

            day.addEventListener('click', () => {
                selectedDateStr = dateStr;
                renderEventDetails(dateStr);
            });

            monthGrid.appendChild(day);
        }

        // Next month's days
        const totalCells = firstDayIndex + daysInMonth;
        const nextDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= nextDays; i++) {
            const day = document.createElement('div');
            day.className = 'year-day other-month';
            day.textContent = i;
            monthGrid.appendChild(day);
        }

        monthBox.appendChild(monthGrid);
        daysDiv.appendChild(monthBox);
    }
}

function renderEventDetails(dateStr) {
    const eventListDiv = document.getElementById('event-list');
    const dayEvents = getEventsForDate(dateStr);
    eventListDiv.innerHTML = '';
    if (!dayEvents.length) {
        eventListDiv.innerHTML = '<p>No events for this date.</p>';
        return;
    }
    dayEvents.forEach(ev => {
        const item = document.createElement('div');
        item.className = `event-item`;
        item.style.borderLeftColor = getEventColor(ev.type);
        item.innerHTML = `
            <div class="event-title">${ev.title} <span class="event-dot ${ev.type}" style="margin-left:5px;"></span></div>
            <div class="event-time">${ev.time ? ev.time : ''}</div>
            <div class="event-desc">${ev.club ? 'By ' + ev.club + '<br>' : ''}${ev.results ? '<b>Results:</b> ' + ev.results + '<br>' : ''}${ev.desc || ''}</div>
        `;
        eventListDiv.appendChild(item);
    });
}

// Navigation
prevPeriodBtn.addEventListener('click', () => {
    if (calendarView === 'month') {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
    } else if (calendarView === 'week') {
        weekStartDate.setDate(weekStartDate.getDate() - 7);
    } else if (calendarView === 'year') {
        currentYear--;
    }
    selectedDateStr = null;
    renderCalendar();
    document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
});

nextPeriodBtn.addEventListener('click', () => {
    if (calendarView === 'month') {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    } else if (calendarView === 'week') {
        weekStartDate.setDate(weekStartDate.getDate() + 7);
    } else if (calendarView === 'year') {
        currentYear++;
    }
    selectedDateStr = null;
    renderCalendar();
    document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
});

// Navbar view switcher
document.getElementById('view-month-btn').addEventListener('click', () => {
    calendarView = 'month';
    weekStartDate = null;
    selectedDateStr = null;
    renderWeekdays();
    renderCalendar();
    document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
});

document.getElementById('view-week-btn').addEventListener('click', () => {
    calendarView = 'week';
    weekStartDate = getWeekStartDate(currentDate);
    selectedDateStr = null;
    renderWeekdays();
    renderCalendar();
    document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
});

document.getElementById('view-year-btn').addEventListener('click', () => {
    calendarView = 'year';
    weekStartDate = null;
    selectedDateStr = null;
    renderWeekdays();
    renderCalendar();
    document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
});

// Initial render
renderClubs();
renderRightPanel();
renderWeekdays();
renderCalendar();
document.getElementById('event-list').innerHTML = '<p>Select a date to see events.</p>';
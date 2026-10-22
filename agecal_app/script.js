const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculate");
const result = document.getElementById("result");

// Do not allow future dates
const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
dobInput.max = `${yyyy}-${mm}-${dd}`;

function showError(message) {
    result.textContent = message;
    result.classList.add("error");
}

function calculateAge() {
    result.classList.remove("error");

    if (dobInput.value === "") {
        showError("Please select your date of birth.");
        return;
    }

    // value looks like "2000-05-21"
    const parts = dobInput.value.split("-");
    const birthYear = Number(parts[0]);
    const birthMonth = Number(parts[1]) - 1; // months start from 0
    const birthDay = Number(parts[2]);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const birthDate = new Date(birthYear, birthMonth, birthDay);
    const todayDate = new Date(todayYear, todayMonth, todayDay);

    if (birthDate > todayDate) {
        showError("Date of birth cannot be in the future.");
        return;
    }

    let years = todayYear - birthYear;
    let months = todayMonth - birthMonth;
    let days = todayDay - birthDay;

    // If days are negative, borrow days from the previous month
    if (days < 0) {
        months--;
        const daysInPreviousMonth = new Date(todayYear, todayMonth, 0).getDate();
        days += daysInPreviousMonth;
    }

    // If months are negative, borrow 12 months from the year
    if (months < 0) {
        years--;
        months += 12;
    }

    result.textContent = `You are ${years} years, ${months} months, ${days} days old.`;

    // If today is the birthday (same day and month), show a special message
    if (birthMonth === todayMonth && birthDay === todayDay) {
        result.textContent = `Wow! It's your birthday! 🎉 You are ${years} years old today.`;
    }
}

calculateBtn.addEventListener("click", calculateAge);
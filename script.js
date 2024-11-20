function navigateToForm(formUrl) {
    const formDescriptions = {
        'taf.html': 'This form is used to request approval for work-related travel.',
        'teasf.html': 'This form is used to report expenses and request reimbursements for work-related travel.'
    };

    // Confirm before navigating
    const message = formDescriptions[formUrl] || "Are you sure you want to proceed?";
    const userConfirmed = confirm(`${message}\n\nDo you want to open this form?`);

    if (userConfirmed) {
        window.location.href = formUrl;
    }
}

// Add tooltips dynamically for better guidance
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const tooltips = {
        'Travel Authorization Form': 'Click to open the form for requesting travel approval.',
        'Expense Settlement Form': 'Click to open the form for reporting expenses and reimbursements.'
    };

    buttons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (tooltips[buttonText]) {
            button.setAttribute('title', tooltips[buttonText]);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("instructionsModal");
    const openButton = document.getElementById("openModal");
    const closeButton = document.getElementById("closeModal");

    openButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".navbar a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.style.fontWeight = "bold";
            link.style.textDecoration = "underline";
        }
    });
});

function closeModal() {
	document.getElementById("instructionsModal").style.display = "none";
}
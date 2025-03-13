const burgerIcon = document.getElementById('burgerIcon');
const navbarnavul = document.getElementById('navbar-nav-ul');
let hasPressedArrowDown = false;  // Flag to track if the ArrowDown key was pressed

// Handle click event
function handleClick() {
    const navbarNav = document.getElementById("navbarNav");
    navbarNav.classList.toggle("burgerToggle");
}

// Handle keydown event (ArrowDown key)
function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowDown":
        case "Enter":
            if (!hasPressedArrowDown) {
                // Mark that ArrowDown has been pressed
                hasPressedArrowDown = true;

                // Toggle the burger menu visibility
                const navbarNav = document.getElementById("navbarNav");
                navbarNav.classList.toggle("burgerToggle");

                // Focus on the first list item if the menu is open
                const firstListItem = navbarNav.querySelector("li:first-child a");
                if (firstListItem) {
                    firstListItem.focus();
                }
            }
            break;


        default:
            // No action for other keys
            break;
    }
}

function checkIfArrowDownPressed(event) {
    // Define the container that holds the <a> tags
    let container = document.querySelector('#navbarNav');

    // Get the current focused element
    let currentFocus = document.activeElement;

    switch (event.key) {
        case "ArrowDown":
            // Check if the current focus is on an <a> tag inside the container
            if (currentFocus && currentFocus.tagName === 'A' && container.contains(currentFocus)) {
                // Get all <a> tags within the container
                let links = container.querySelectorAll('a');
                let currentIndex = Array.from(links).indexOf(currentFocus);

                // Set focus to the next <a> tag, or loop back to the first if at the end
                let nextLink = links[(currentIndex + 1) % links.length];
                nextLink.focus();
            } else {
                // If no <a> tag is focused, set focus to the first <a> tag in the container
                let firstLink = container.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
            break;

        case "ArrowUp":
            // Check if the current focus is on an <a> tag inside the container
            if (currentFocus && currentFocus.tagName === 'A' && container.contains(currentFocus)) {
                // Get all <a> tags within the container
                let links = container.querySelectorAll('a');
                let currentIndex = Array.from(links).indexOf(currentFocus);

                // Set focus to the previous <a> tag, or loop back to the last if at the top
                let previousLink = links[(currentIndex - 1 + links.length) % links.length];
                previousLink.focus();
            } else {
                // If no <a> tag is focused, set focus to the last <a> tag in the container
                let lastLink = container.querySelector('a:last-child');
                if (lastLink) {
                    lastLink.focus();
                }
            }
            break;

        case "Escape":
            // Remove focus when Escape is pressed
            if (currentFocus) {
                currentFocus.blur();
            }
            break;

        default:
            // No action for other keys
            break;
    }
}


// Detect when the focus leaves the navbar container
function handleFocusOut(event) {
    if (!navbarnavul.contains(event.relatedTarget)) {
        hasPressedArrowDown = false;
        navbarNav.classList.toggle("burgerToggle");
        // You can perform additional actions here (e.g., close the menu, etc.)
    }
}

// Listen for the click event separately
burgerIcon.addEventListener('click', handleClick);

// Listen for the keydown event separately
burgerIcon.addEventListener('keydown', handleKeyDown);

// Listen for the keydown event for the arrow keys inside navbar
navbarnavul.addEventListener('keydown', checkIfArrowDownPressed);

// Listen for the focusout event to detect when focus leaves the navbar
navbarnavul.addEventListener('focusout', handleFocusOut);


// modal/lightbox
modalButton = document.getElementById('modalButton');
modalButton.addEventListener('click', modalShow);

function modalShow() {
    alert('modalShow');
}
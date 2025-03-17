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
const modalButton = document.getElementById('modalButton');
modalButton.addEventListener('click', modalShow);

const modalClose = document.getElementById('modalClose');
modalClose.addEventListener('click', modalCloses);
modalClose.addEventListener('keydown', modalClosesKey);

let modalCloseListener;  // Declare a variable to hold the event listener

function modalShow() {
    // Show modal overlay and modal container
    // Get references to elements
    const customOverlay = document.getElementById('customOverlay');
    const customModalContainer = document.getElementById('customModal_container');

    // Apply styles
    customOverlay.style.cssText = 'display: block; opacity: 1; z-index: 10;';
    customModalContainer.style.cssText = 'display: block; opacity: 1; z-index: 11;';


    // Focus on the modal close button
    modalClose.focus();

    // Create the keydown event listener
    modalCloseListener = function(event) {
        switch (event.key) {
            case 'Tab':
                // Prevent focus from moving
                event.preventDefault();
                break;

            default:
                // Allow other keys to behave normally
                break;
        }
    };

    // Add keydown event listener to handle Tab key press
    document.addEventListener('keydown', modalCloseListener);
}

function modalCloses() {
    // Remove modal
    document.getElementById('customOverlay').style.display = 'none';
    document.getElementById('customOverlay').style.opacity = '0';
    document.getElementById('customOverlay').style.zIndex = '0';

    document.getElementById('customModal_container').style.display = 'none';
    document.getElementById('customModal_container').style.opacity = '0';
    document.getElementById('customModal_container').style.zIndex = '0';

    // Remove the event listener when the modal closes
    document.removeEventListener('keydown', modalCloseListener);

    // Focus on the button with ID 'modalButton'
    const GobacktoButton = document.getElementById('modalButton');
    if (GobacktoButton) {
        modalButton.focus();
    }
}   

function modalClosesKey(event) {
    switch (event.key) {
        case 'Enter':
            event.preventDefault(); // Prevent default behavior
            modalCloses();  // Close modal on Enter
            break;

        case 'Escape':
            event.preventDefault(); // Prevent default behavior
            modalCloses();  // Close modal on Escape
            break;

        default:
            // Optional: You can handle other keys here
            break;
    }
}

// Function to show the selected section and hide the others
function toggleSection(activeSectionId) {

    const sections = ['homeSection', 'serviceSection', 'scheduleSection'];
    sections.forEach(section => {
        document.getElementById(section).style.display = (section === activeSectionId) ? 'block' : 'none';
    });

}

// Event listeners for each tab
document.getElementById('homeTab').addEventListener('click', () => toggleSection('homeSection'));
document.getElementById('sevicesTab').addEventListener('click', () => toggleSection('serviceSection'));
document.getElementById('scheduleTab').addEventListener('click', () => toggleSection('scheduleSection'));

document.getElementById('fa-toggle-off').addEventListener('click', () => receivedEmailToggle('turnOff'));
document.getElementById('fa-toggle-on').addEventListener('click', () => receivedEmailToggle('turnOn'));

    

function receivedEmailToggle(action) {
    let receivedEmailStatus = false;

   if (action === 'turnOff') {
        document.getElementById('fa-toggle-off').style.display = 'none';
        document.getElementById('fa-toggle-on').style.display = 'block';
        receivedEmailStatus = true;

   }

   else if (action === 'turnOn') {
        document.getElementById('fa-toggle-off').style.display = 'block';
        document.getElementById('fa-toggle-on').style.display = 'none';
        receivedEmailStatus = false;
   }

//    alert(`Emails are ${receivedEmailStatus ? 'ON' : 'OFF'}`);

}

function handleHashChange() {
    let pageTitle = "Home"; // Default title

    // Reset all 'active' classes
    const navItems = document.querySelectorAll('#navbar-nav-ul li');
    navItems.forEach(item => item.classList.remove('active'));

    switch (window.location.hash) {
        case '#home':
            toggleSection('homeSection');
            pageTitle = "Home";
            document.querySelector('#navbar-nav-ul li:nth-child(1)').classList.add('active');
            break;
        case '#services':
            toggleSection('serviceSection');
            pageTitle = "Services";
            document.querySelector('#navbar-nav-ul li:nth-child(2)').classList.add('active');
            break;
            case '#schedule':
                toggleSection('scheduleSection');
                pageTitle = "Schedule a call";
                document.querySelector('#navbar-nav-ul li:nth-child(3)').classList.add('active');
                break;
            
    }

    document.title = pageTitle;
}

// Handle hash change when navigating
window.addEventListener("hashchange", handleHashChange);

// Handle hash change on page load (in case of refresh)
window.addEventListener("load", handleHashChange);

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const textAreaDiv = document.getElementById('textArea');
  
    function toggleTextArea() {
      const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
      textAreaDiv.style.display = isChecked ? "block" : "none";
    }
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", toggleTextArea);
    });
  
    // Initial check to hide the text area on page load
    toggleTextArea();
  });

//   validation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.createElement("div"); // Create success message element
    successMessage.className = "successMessage";
    successMessage.innerHTML = "<h6>Thank you for reaching out! We’ve received your request and will get back to you soon to schedule a call with our sales team.</h6>";
    form.insertAdjacentElement("beforebegin", successMessage); // Insert it before the form
    successMessage.style.display = "none"; // Hide initially
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
  
      let isValid = true;
  
      // Get form field values
      const businessName = document.getElementById("businessName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const email = document.getElementById("email").value.trim();
      const topics = document.querySelectorAll("input[name='topic']:checked");
      const textArea = document.getElementById("scheduleTextArea").value.trim();
  
      // Validation logic
      document.getElementById("businessValidation").style.display = /^[a-zA-Z0-9\s]+$/.test(businessName) ? "none" : "block";
      document.getElementById("phoneValidation").style.display = /^\d{3}-\d{3}-\d{4}$/.test(phoneNumber) ? "none" : "block";
      document.getElementById("validation").style.display = /^[^@]+@[^@]+\.[^@]+$/.test(email) ? "none" : "block";
      document.getElementById("topicValidation").style.display = topics.length > 0 ? "none" : "block";
  
      // Show message length validation only if a topic is selected
      if (topics.length > 0) {
        document.getElementById("textAreaValidation").style.display = textArea.length >= 10 && textArea.length <= 500 ? "none" : "block";
      } else {
        document.getElementById("textAreaValidation").style.display = "none"; // Hide if no topic is selected
      }
  
      // Check if all fields are valid
      if (
        !/^[a-zA-Z0-9\s]+$/.test(businessName) ||
        !/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber) ||
        !/^[^@]+@[^@]+\.[^@]+$/.test(email) ||
        topics.length === 0 ||
        (topics.length > 0 && (textArea.length < 10 || textArea.length > 500))
      ) {
        isValid = false;
      }
  
      // Display the appropriate message
      if (isValid) {
        errorMessage.style.display = "none";
        successMessage.style.display = "block";
        form.reset(); // Reset form on success
        successMessage.setAttribute("tabindex", "-1"); // Make the success message focusable
        successMessage.focus(); // Focus on the success message
      } else {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
        errorMessage.focus(); // Focus on the error message
      }
      
      
    });
  });
  
  window.onload = function() {
    var errorMessage = document.querySelector('.errorMessage');
    var successMessage = document.querySelector('.successMessage');
    
    if (errorMessage) {
      errorMessage.style.display = 'none';
      errorMessage.setAttribute('tabindex', '0');
    }
    if (successMessage) {
      successMessage.style.display = 'none';
      successMessage.setAttribute('tabindex', '0');
    }
  };
  
  
  
  // Function to check if at least one checkbox is checked
  function checkCheckboxes() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    const textArea = document.getElementById('textArea');
    
    // Check if any checkbox is checked
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    // If any checkbox is checked, display the textarea
    textArea.style.display = anyChecked ? 'block' : 'none';
  }

  // Attach event listeners to all checkboxes
  document.querySelectorAll('.form-check-input').forEach(checkbox => {
    checkbox.addEventListener('change', checkCheckboxes); // Check on change of checkbox state
    checkbox.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        this.checked = !this.checked; // Toggle checkbox state on Enter key press
        checkCheckboxes(); // Check checkboxes after toggle
      }
    });
  });

  // Initial check in case any checkbox is pre-checked
  checkCheckboxes();
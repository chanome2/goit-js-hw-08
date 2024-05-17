// Import lodash/throttle from the lodash library (assuming it's included in your project)
import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    const storageKey = 'feedback-form-state';

    // Load form state from local storage
    const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};
    emailInput.value = savedState.email || '';
    messageInput.value = savedState.message || '';

    // Update local storage with form state using throttle from lodash
    const updateLocalStorage = _.throttle(() => {
        const currentState = {
            email: emailInput.value,
            message: messageInput.value
        };
        localStorage.setItem(storageKey, JSON.stringify(currentState));
    }, 500);

    // Save form state on input change
    form.addEventListener('input', () => {
        updateLocalStorage();
    });

    // Clear storage and form fields on form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const currentState = {
            email: emailInput.value,
            message: messageInput.value
        };

        // Display current state in console
        console.log('Form Submission Data:', currentState);

        // Clear local storage and form fields
        localStorage.removeItem(storageKey);
        emailInput.value = '';
        messageInput.value = '';
    });
});


// ==========================================
// 4. Contact Form - Open Email Client
// ==========================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formSubmit = document.getElementById('form-submit');

if (contactForm && formSubmit) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const project = document.getElementById('form-project').value;
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all mandatory fields.');
            return;
        }

        const subject = encodeURIComponent(`New Project Inquiry: ${project}`);

        const body = encodeURIComponent(
`Name: ${name}

Email: ${email}

Project Type: ${project}

Message:
${message}`
        );

        // Opens the user's default email client
        window.location.href = `mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`;

        // Optional success UI
        if (formSuccess) {
            formSuccess.classList.remove('hidden');
            contactForm.reset();

            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });
}
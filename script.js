document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const container = document.querySelector('.container');

    function setContainerBg(tabName) {
        // Remove all bg classes
        container.classList.remove('push-active', 'pull-active', 'legs-active', 'cardio-active', 'core-active');
        // Add the active class for this tab
        const bgClass = tabName + '-active';
        container.classList.add(bgClass);
        console.log('Setting container class to:', bgClass);
    }

    // Set initial background
    const initialTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    setContainerBg(initialTab);
    console.log('Initial tab:', initialTab);

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            console.log('Clicked tab:', tabName);

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // Set container background
            setContainerBg(tabName);
        });
    });
});

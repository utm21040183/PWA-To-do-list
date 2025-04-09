document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    menuBtn.addEventListener('click', () => {
        const isVisible = sidebar.getAttribute('data-visible') === 'true';
        sidebar.setAttribute('data-visible', !isVisible);
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.setAttribute('data-visible', 'false');
        overlay.classList.remove('active');
    });
});

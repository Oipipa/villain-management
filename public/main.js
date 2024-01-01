document.addEventListener('DOMContentLoaded', () => {
    const deleteLinks = document.querySelectorAll('.delete-villain');

    deleteLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to delete this villain?')) {
                e.preventDefault();
            }
        });
    });
});

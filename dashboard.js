document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const pdfUpload = document.getElementById('pdf-upload');
    const pdfList = document.getElementById('pdf-list');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            // Add your logout logic here
            console.log('Logging out...');
            const { error } = await window.supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }
            window.location.href = 'login.html';
        });
    }

    if (pdfUpload) {
        pdfUpload.addEventListener('change', (e) => {
            const files = e.target.files;
            // Add your PDF upload logic here
            console.log('Uploading PDFs:', files);
            // Display uploaded PDFs
            for (const file of files) {
                const pdfItem = document.createElement('div');
                pdfItem.classList.add('pdf-item');
                pdfItem.innerHTML = `
                    <span class="pdf-name">${file.name}</span>
                    <button class="btn btn-danger">Delete</button>
                `;
                pdfList.appendChild(pdfItem);
            }
        });
    }
});

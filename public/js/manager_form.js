/* ── Drop Zone ── */
const dropZone = document.getElementById('dropZone');

if (dropZone) {
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) showPreview(file.name);
    });
}

function handleFile(input) {
    if (input.files && input.files[0]) {
        showPreview(input.files[0].name);
    }
}

function showPreview(name) {
    const preview = document.getElementById('filePreview');
    if (preview) {
        preview.textContent = '✅ ' + name;
    }
}

/* ── Form Reset ── */
function resetForm() {
    document.getElementById('expTitle').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('expCategory').value = '';
    document.getElementById('expAmount').value = '';
    document.getElementById('expPayment').value = '';
    document.getElementById('expVendor').value = '';
    document.getElementById('expReason').value = '';
    document.getElementById('filePreview').textContent = '';
}
(function() {
    form.onsubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/contact', {
            method: 'POST',
            body: new FormData(form),
        });

        const result = await response.json();

        alert(result.message);
    }
})()

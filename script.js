async function searchVideo() {
    const videoUrl = document.getElementById('searchInput').value;
    const videoContainer = document.getElementById('videoContainer');

    if (!videoUrl) {
        alert('Please enter a video URL!');
        return;
    }

    try {
        // Replace this with your actual deployed backend URL
        const response = await fetch(`https://your-backend-url/api/scrape?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        videoContainer.innerHTML = `
            <h2>${data.title}</h2>
            <p>Pornstars: ${data.pornstars.join(', ')}</p>
            <h3>Download Links:</h3>
            <ul>
                ${data.download_urls.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join('')}
            </ul>
        `;
    } catch (error) {
        videoContainer.innerHTML = '<p>Error fetching video details. Please try again.</p>';
    }
}

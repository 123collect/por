async function searchVideos() {
    const keyword = document.getElementById('searchInput').value;
    const videoResults = document.getElementById('videoResults');

    if (!keyword) {
        alert('Please enter a search keyword!');
        return;
    }

    try {
        // API endpoint for searching videos based on the keyword
        const apiUrl = `https://phub-api.herokuapp.com/search?keyword=${encodeURIComponent(keyword)}&limit=5`;
        
        // Fetch results from PHub API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.results) {
            // Clear any previous results
            videoResults.innerHTML = ''; 

            // Loop through the results and create HTML to display them
            data.results.forEach(result => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.innerHTML = `
                    <a href="${result.url}" target="_blank">
                        <img src="${result.thumbnail}" alt="${result.title}" />
                        <h3>${result.title}</h3>
                    </a>
                `;
                videoResults.appendChild(videoCard);
            });
        } else {
            videoResults.innerHTML = '<p>No results found!</p>';
        }
    } catch (error) {
        videoResults.innerHTML = '<p>Error fetching results. Please try again later.</p>';
        console.error('Error fetching video data:', error);
    }
}

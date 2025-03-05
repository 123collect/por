async function fetchTrendingVideos() {
    const videoResults = document.getElementById('videoResults');

    // Clear previous results
    videoResults.innerHTML = '';

    try {
        // Fetch trending videos from the Eporner API (no filters)
        const apiUrl = 'https://api.adultdatalink.com/eporner/trending?parameter=video';

        // Fetch the data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            // Loop through the results and create HTML to display them
            data.forEach(result => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');

                // Video card content
                videoCard.innerHTML = `
                    <a href="${result.urls.web_url}" target="_blank">
                        <img src="${result.urls.thumbnail}" alt="${result.username}" />
                        <h3>${result.username} - ${result.likes} Likes</h3>
                    </a>
                    <p>Tags: ${result.tags.join(', ')}</p>
                    <a href="${result.urls.embed_url}" target="_blank">Watch Video</a>
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

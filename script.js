async function searchVideos() {
    const keyword = document.getElementById('searchInput').value;
    const videoResults = document.getElementById('videoResults');

    // Clear the previous search results
    videoResults.innerHTML = '';

    try {
        // URL for fetching trending videos from Redgifs
        const apiUrl = `https://api.adultdatalink.com/redgifs/trending?parameter=gif`;

        // If there's a keyword, add it as a filter (you can adjust this based on the actual API behavior)
        const searchUrl = keyword ? `${apiUrl}&tags=${encodeURIComponent(keyword)}` : apiUrl;

        // Fetch data from the API
        const response = await fetch(searchUrl);
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

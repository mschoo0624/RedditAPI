import React, { useEffect, useState } from 'react';
import Post from './Post';

function Lane({subreddit, sortType, onRemove}) {
    const [posts, setPosts] = useState([]); // To store lists of posts.
    const [loading, loadingPosts] = useState(true); // Checking if the posts are done loading. 
    const [error, errorPosts] = useState(''); // Showing the error message. 
    
    // performs side effect in a function component. 
    useEffect(() => {
        const fetchPosts = async () => {
            loadingPosts(true);
            errorPosts('');
            try {
                // Sending the http GET request to the Reddit API to fectch the posts. 
                const response = await fetch(`https://www.reddit.com/r/${subreddit}/${sortType}.json`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                // Waiting until it parses the JSON response from the API into a js object. 
                const data = await response.json();
                // Extracts the actual post data from the API response.
                const postsData = data.data.children.map(p => p.data);  
                setPosts(postsData); // update the post.
            } catch (err) {
                errorPosts('Failed to fetch posts');
            }
            loadingPosts(false); // setting it to be done loading. 
        };
        fetchPosts();
    }, [subreddit, sortType]);

  return (
    <div className="lane">
      <div className="lane-header">
        <h2>r/{subreddit}</h2>
        <button onClick={() => onRemove(subreddit)}>✖</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Lane;

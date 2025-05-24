import React, { useState } from 'react';

function AddLane({ onAdd }) {
    const [input, setInput] = useState(''); // To manage the state of user input
    const [error, setError] = useState(''); // To manage the state of user error messages.

    // function to handle the adding the posts.
    const handleAppPost = async () => { 
        const subreddit = input.trim().toLowerCase();
        if (!subreddit) return; // checks if the subreddit is falsy. 
        
        try {
            // Sending the http GET request to the Reddit API to fectch the posts. 
            const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
            // Checking for the if the response is falsy. 
            if (!response) throw new Error('Subreddit not found');
            
            // getting the data from the request. 
            const data = await response.json();
            // Checking if the data is falsy and if data.data.children is in an array. 
            if (!data || !Array.isArray(data.data.children)) throw new Error('Invalid subreddit data'); 
            onAdd(subreddit);
            setInput('');
            setError('');
        } catch (err){
            setError('Invalid subreddit');
        }
    };

    return (
        <div className="add-lane">
        <input
            type="text"
            placeholder="Enter subreddit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleAppPost();
                }
            }}
        />
        <button onClick={handleAdd}>Add Lane</button>
        {error && <p className="error-msg">{error}</p>}
        </div>
    );
}

export default AddLane

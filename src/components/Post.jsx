import React from 'react'

function Post({post}) {
    // object destructuring for post. 
    const { title, author, ups, num_comments, permalink, thumbnail } = post; 
    // checking if the thumbnail is valid. 
    const validThumbnail = thumbnail && thumbnail.startsWith('http');

    return (
        <div className="post">
        {validThumbnail && (
            <img src={thumbnail} alt="thumbnail" className="thumbnail" />
        )}
        <div className="post-content">
            <a href={`https://reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
            <h3>{title}</h3>
            </a>
            <p>by <strong>{author}</strong></p>
            <p>⬆ {ups} | 💬 {num_comments}</p>
        </div>
        </div>
    );
}

export default Post;

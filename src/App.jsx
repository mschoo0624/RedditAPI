import React, { useState, useEffect } from 'react';
import AddLane from './components/AddLane';
import Lane from './components/Lane';
import './style.css';

function App() {
    const [lanes, setLanes] = useState(() => {
        const stored = localStorage.getItem('lanes');
        return stored ? JSON.parse(stored) : [];
    });
    // To manage the state of the sorting type for the lanes.
    const [sortType, setSortType] = useState('hot'); 
    // Changing it to the darkmode
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    
    // ensures that the lanes state is persisted
    useEffect(() => {
        localStorage.setItem('lanes', JSON.stringify(lanes));
    }, [lanes]);

    // Ensure to change theme to dark mode. 
    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // Adding the lane 
    const addLane = (subreddit) => {
        if (!lanes.includes(subreddit)) {
        const updated = [...lanes, subreddit].sort((a, b) =>
            a.localeCompare(b)
        );
        setLanes(updated);
        }
    };
    
    const removeLane = (subreddit) => {
        setLanes(lanes.filter((lane) => lane !== subreddit));
    };

    return (
        <div className="app-container">
        <header>
            <h1>Multi-Lane Reddit Client</h1>
            <div className="controls">
            <label>
                Sort:
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="hot">Hot</option>
                <option value="new">New</option>
                <option value="top">Top</option>
                </select>
            </label>
            <label className="toggle-switch">
                Dark Mode
                <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                />
            </label>
            </div>
            <AddLane onAdd={addLane} />
        </header>

        <div className="lanes">
            {lanes.map((subreddit) => (
            <Lane
                key={subreddit}
                subreddit={subreddit}
                sortType={sortType}
                onRemove={removeLane}
            />
            ))}
        </div>
        </div>
    );
}   

export default App;

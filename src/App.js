// src/App.js
import React, { useEffect, useState } from 'react';
import KanbanColumn from './components/KanbanColumn';
import { ticketsData } from './ticketsData'; // Import the local data
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    // Instead of fetching from API, set tickets directly from the imported data
    setTickets(ticketsData.tickets);
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const groupTickets = (tickets, groupBy) => {
    if (!Array.isArray(tickets)) return {};
    return tickets.reduce((groups, ticket) => {
      const key = ticket[groupBy] || 'Ungrouped';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const sortedGroupedTickets = (groupedTickets) => {
    for (let group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return groupedTickets;
  };

  const groupedTickets = sortedGroupedTickets(groupTickets(tickets, groupBy));

  return (
    <div className="App">
      <div className="toolbar">
        <label>
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <KanbanColumn key={group} group={group} tickets={groupedTickets[group]} />
        ))}
      </div>
    </div>
  );
};

export default App;

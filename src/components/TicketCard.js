import React from 'react';

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4:
            return 'Urgent';
        case 3:
            return 'High';
        case 2:
            return 'Medium';
        case 1:
            return 'Low';
        default:
            return 'No priority';
    }
};

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h4>{ticket.title}</h4>
            <p>Priority: {getPriorityLabel(ticket.priority)}</p>
            <p>Status: {ticket.status}</p>
            <p>User: {ticket.user}</p>
        </div>
    );
};

export default TicketCard;

import React from 'react';
import TicketCard from './TicketCard';

const KanbanColumn = ({ group, tickets }) => {
  return (
    <div className="kanban-column">
      <h3>{group}</h3>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default KanbanColumn;

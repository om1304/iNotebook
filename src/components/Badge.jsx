import React from "react";

const Badge = ({ tag }) => {
  return (
    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary"
    style={{zIndex: 1}}>
    {tag}
    <span className="visually-hidden">unread messages</span>
  </span>
  );
};

export default Badge;

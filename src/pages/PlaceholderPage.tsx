import React from "react";

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold text-dark mb-4">{title} / 0</h2>
      <div className="card border-0 shadow-sm p-5 text-center bg-white text-muted">
        There will be side content here {title}
      </div>
    </div>
  );
};

export default Placeholder;
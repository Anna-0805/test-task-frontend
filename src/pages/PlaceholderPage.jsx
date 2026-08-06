const PlaceholderPage = ({ title }) => (
  <div className="container-fluid p-4">
    <h2 className="fw-bold text-dark mb-4">{title} / 0</h2>
    <div className="card border-0 shadow-sm p-5 text-center bg-white text-muted">
      Тут буде контент сторінки {title}
    </div>
  </div>
);

export default PlaceholderPage;
const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="page-title">{title}</h1>
      {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
    </div>
  );
};

export default SectionHeader;
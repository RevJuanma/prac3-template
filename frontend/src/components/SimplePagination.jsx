const SimplePagination = ({ page, totalPages, onPrev, onNext }) => (
  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
    <button onClick={onPrev} disabled={page === 0}>« Anterior</button>
    <span>Página {page + 1} de {totalPages}</span>
    <button onClick={onNext} disabled={page + 1 >= totalPages}>Siguiente »</button>
  </div>
);
export default SimplePagination;
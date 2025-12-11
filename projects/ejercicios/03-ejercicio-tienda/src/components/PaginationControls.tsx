import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: Volver al inicio de la página
  };

  const buttonClass = (isActive: boolean) => 
    `px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
    }`;
  
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass(false) + ' disabled:opacity-50 disabled:cursor-not-allowed'}
      >
        Anterior
      </button>

      {/* Números de Página */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={buttonClass(page === currentPage)}
        >
          {page}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={buttonClass(false) + ' disabled:opacity-50 disabled:cursor-not-allowed'}
      >
        Siguiente
      </button>
    </div>
  );
};
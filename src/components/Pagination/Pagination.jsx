import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Anterior
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? styles.active : ''}
                >
                    {number}
                </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
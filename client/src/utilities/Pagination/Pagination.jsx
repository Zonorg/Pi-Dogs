import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ dogsPerPage, dogs, pagination, currentPage }) => {
  const pages = [];

  // Crear un arreglo con el número de página para cada perro.
  for (let i = 0; i < Math.ceil(dogs / dogsPerPage); i++) {
    pages.push(i + 1);
  }

  // Establecer el rango de páginas a mostrar alrededor de la página actual.
  const pageRange = 2;
  const minPage = Math.max(1, currentPage - pageRange);
  const maxPage = Math.min(pages.length, currentPage + pageRange);

  return (
    <nav className={styles.linksPagination}>
      <ul>
        {currentPage > 1 && (
          // Botón para ir a la primera página.
          <>
            <li>
              <button onClick={() => pagination(1)}>{"<<"}</button>
            </li>
            {/* // Botón para retroceder una página. */}
            <li>
              <button onClick={() => pagination(currentPage - 1)}>{"<"}</button>
            </li>
          </>
        )}
        {pages &&
          pages
            .filter((num) => num >= minPage && num <= maxPage)
            .map((num) => (
              <li key={num}>
                <button
                  onClick={() => pagination(num)}
                  className={currentPage === num ? styles.active : null}
                >
                  {num}
                </button>
              </li>
            ))}
        {currentPage < pages.length && (
          // Botón para avanzar una página.
          <>
            <li>
              <button onClick={() => pagination(currentPage + 1)}>{">"}</button>
            </li>
            {/* // Botón para ir button la última página. */}
            <li>
              <button onClick={() => pagination(pages.length)}>{">>"}</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

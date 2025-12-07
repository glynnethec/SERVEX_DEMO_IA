"use client"; // Necesario para usar hooks y APIs del navegador

import React, { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search'; 
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// RUTA FINAL Y CORRECTA: Apunta al pdf.worker.mjs copiado en public/
const workerUrl = `/pdf.worker.mjs`; 

const PDFViewerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 1. Instanciamos el plugin de búsqueda
  const searchPluginInstance = searchPlugin({
    // Al encontrar una coincidencia, salta automáticamente a esa página
    autoJumpToFirstMatch: true, 
  });

  // 2. Obtenemos la función 'search' para activarla desde el input
  const { search } = searchPluginInstance;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // 3. Ejecuta la búsqueda cada vez que el usuario escribe
  useEffect(() => {
    if (search && searchQuery.length > 0) {
      search({
        keyword: searchQuery,
      });
    }
  }, [searchQuery, search]); // Dependencia 'search' para React

  return (
    <Worker workerUrl={workerUrl}>
      <div style={{ height: '750px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Input de búsqueda personalizado (Controla el estado searchQuery) */}
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar producto (mesa, gabinete, código...)"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ padding: '8px', flexGrow: 1, marginRight: '10px' }}
          />
        </div>

        {/* Visor de PDF (Utiliza el plugin de búsqueda) */}
        <div style={{ flex: 1 }}>
          <Viewer 
            // Carga el archivo desde public/DS.pdf
            fileUrl="/DS.pdf"
            plugins={[searchPluginInstance]} 
          />
        </div>
      </div>
    </Worker>
  );
};

export default PDFViewerSearch;
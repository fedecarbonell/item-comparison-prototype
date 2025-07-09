// File: frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Para estilos CSS

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Reemplaza con la URL real de tu API .NET
        const response = await fetch('http://localhost:5015/products'); // ¡¡¡ACTUALIZA ESTA URL!!!
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError("No se pudieron cargar los productos. Asegúrate de que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    return stars;
  };

  // Lógica para la tabla de especificaciones globales (NO CAMBIA)
  const getGlobalSpecificationsData = () => {
    if (products.length === 0) return { uniqueSpecs: [], specRows: [] };

    const allSpecsKeys = new Set();
    products.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => allSpecsKeys.add(key));
      }
    });

    const uniqueSpecs = Array.from(allSpecsKeys);
    // Puedes ordenar aquí si quieres que las especificaciones aparezcan en un orden específico en la tabla
    // uniqueSpecs.sort(); // Descomenta si quieres orden alfabético

    const specRows = uniqueSpecs.map(specKey => {
      const row = {
        specName: specKey, // Nombre de la especificación (ej. 'type', 'connectivity')
        values: products.map(product => {
          return product.specifications && product.specifications[specKey] !== undefined
            ? product.specifications[specKey]
            : '-'; // Valor por defecto si la especificación no existe para ese producto
        })
      };
      return row;
    });

    return { uniqueSpecs, specRows };
  };

  const { uniqueSpecs, specRows } = getGlobalSpecificationsData();

  if (loading) {
    return <div className="loading">Cargando productos para comparar...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app-container">
      {/* Encabezado de comparación - SIMPLIFICADO */}
      <div className="comparison-header">
        <p className="comparison-title">Comparación de Productos</p>
        <p className="comparison-subtitle">Compara características y especificaciones para encontrar el producto ideal para ti.</p>
        <div className="view-options">
          {/* Eliminamos el button-group de aquí */}
          <span>Comparando {products.length} productos</span>
        </div>
      </div>

      {/* Grid de Tarjetas (siempre visible) */}
      <div className="product-comparison-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              {product.discount && <span className="product-discount">{product.discount}</span>}
            </div>
            
            <h2 className="product-name">{product.name}</h2>
            <p className="product-free-shipping">{product.freeShipping ? 'Envío gratis' : ''}</p>

            <div className="product-rating-reviews">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="reviews-count">({product.reviews})</span>
            </div>

            <div className="product-price-section">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="product-installments">6x ${((product.price / 6)).toFixed(2)} sin interés</p>
            <p className="product-seller">Vendido por: <span className="seller-name">{product.seller}</span></p>
            
            <button className="buy-button">Comprar</button>
            <div className="favorite-icon">❤️</div>
          </div>
        ))}
      </div>

      {/* Tabla Global de Especificaciones (siempre visible debajo de las tarjetas) */}
      {products.length > 0 && (
        <div className="specifications-section full-table-view"> {/* Reutilizamos la clase full-table-view */}
          <h2>Especificaciones Detalladas</h2>
          <div className="table-responsive">
            <table className="spec-comparison-table">
              <thead>
                <tr>
                  <th>Especificación</th>
                  {products.map(product => (
                    <th key={product.id}>
                      {/* MINIATURA DE LA IMAGEN EN EL ENCABEZADO DE LA TABLA */}
                      <img src={product.imageUrl} alt={product.name} className="product-thumbnail" />
                      <div className="product-name-table">{product.name}</div> {/* Contenedor para el nombre */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, index) => (
                  <tr key={index}>
                    <td className="spec-name-cell">{row.specName}</td>
                    {row.values.map((value, productIndex) => (
                      <td key={productIndex} className="spec-value-cell">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      

    </div>
  );
}

export default App;
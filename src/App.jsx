import React, { useState, useEffect } from 'react';

// URL de tu API - ajústala según tu configuración
const API_URL = 'https://api2-production-26fb.up.railway.app';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: ''
  });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  // Cargar usuarios al iniciar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
      if (data.ok) {
        setUsuarios(data.usuarios);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.ok) {
        setMensaje({ texto: '✓ Usuario registrado exitosamente', tipo: 'exito' });
        setFormData({ nombre: '', telefono: '', correo: '' });
        cargarUsuarios();
      } else {
        setMensaje({ texto: '✗ Error al registrar usuario', tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ texto: '✗ Error de conexión', tipo: 'error' });
    } finally {
      setCargando(false);
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          animation: 'fadeInDown 0.8s ease-out'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: 'white',
            margin: '0 0 10px 0',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            letterSpacing: '-1px'
          }}>
            Gestión de Usuarios
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            margin: 0
          }}>
            Sistema de registro y consulta
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Formulario de Registro */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeInLeft 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>+</span>
              Nuevo Usuario
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#555',
                  marginBottom: '8px'
                }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#555',
                  marginBottom: '8px'
                }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#555',
                  marginBottom: '8px'
                }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <button
                type="submit"
                disabled={cargando}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'white',
                  background: cargando 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: cargando ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!cargando) {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                {cargando ? 'Registrando...' : 'Registrar Usuario'}
              </button>

              {mensaje.texto && (
                <div style={{
                  marginTop: '20px',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  animation: 'fadeIn 0.3s ease-out',
                  background: mensaje.tipo === 'exito' 
                    ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                    : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                  color: 'white'
                }}>
                  {mensaje.texto}
                </div>
              )}
            </form>
          </div>

          {/* Lista de Usuarios */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeInRight 0.8s ease-out',
            maxHeight: '700px',
            overflow: 'auto'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>👥</span>
              Usuarios Registrados
              <span style={{
                marginLeft: 'auto',
                fontSize: '1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px'
              }}>
                {usuarios.length}
              </span>
            </h2>

            {usuarios.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#999'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px'
                }}>📋</div>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}>
                  No hay usuarios registrados aún
                </p>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {usuarios.map((usuario, index) => (
                  <div
                    key={usuario.id}
                    style={{
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      padding: '20px',
                      borderRadius: '15px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`,
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {usuario.nombre?.charAt(0)?.toUpperCase() ?? '?'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          color: '#333'
                        }}>
                          {usuario.nombre ?? '(sin nombre)'}
                        </h3>
                        <p style={{
                          margin: '5px 0 0 0',
                          fontSize: '0.85rem',
                          color: '#666'
                        }}>
                          ID: {usuario.id}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '2px solid rgba(255,255,255,0.5)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.95rem',
                        color: '#555'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>📞</span>
                        <strong>Tel:</strong> {usuario.telefono ?? '(sin teléfono)'}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.95rem',
                        color: '#555'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>✉️</span>
                        <strong>Email:</strong> {usuario.correo ?? '(sin correo)'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
        }
      `}</style>
    </div>
  );
}
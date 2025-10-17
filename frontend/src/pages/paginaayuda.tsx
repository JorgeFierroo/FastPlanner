import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Mail, Phone, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FAQItem {
  id: number;
  pregunta: string;
  respuesta: string;
}

const PaginaAyuda: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Preguntas frecuentes
  const faqData: FAQItem[] = [
    {
      id: 1,
      pregunta: "¿Cómo creo una nueva tarea en FastPlanner?",
      respuesta: "Para crear una nueva tarea, haz clic en el botón 'Agregar tarea' que encontrarás en las vistas de Kanban o Tabla. Completa los campos de título, descripción, asigna responsables y selecciona el estado inicial."
    },
    {
      id: 2,
      pregunta: "¿Puedo asignar una tarea a varias personas?",
      respuesta: "¡Sí! En el campo 'Asignados' puedes escribir las iniciales de varias personas separadas por comas. Por ejemplo: 'MG, JP, AN'. Cada persona asignada aparecerá con su propio círculo identificativo."
    },
    {
      id: 3,
      pregunta: "¿Qué significan los diferentes estados de las tareas?",
      respuesta: "Los estados son: 🔘 Por iniciar (gris) - tarea no comenzada, 🟡 En progreso (amarillo) - tarea en desarrollo, ✅ Completado (verde) - tarea finalizada. Puedes cambiar el estado al crear o editar una tarea."
    },
    {
      id: 4,
      pregunta: "¿Cómo cambio entre las diferentes vistas (Kanban, Tabla, Calendario)?",
      respuesta: "Utiliza el menú de navegación lateral o los botones de vista en la parte superior de la aplicación. Cada vista te permite ver y gestionar tus tareas de manera diferente según tus preferencias."
    },
    {
      id: 5,
      pregunta: "¿Puedo filtrar las tareas por estado o responsable?",
      respuesta: "Sí, en la vista de Tabla puedes filtrar y ordenar las tareas por diferentes criterios. También puedes usar la función de búsqueda para encontrar tareas específicas rápidamente."
    },
    {
      id: 6,
      pregunta: "¿FastPlanner guarda mis datos automáticamente?",
      respuesta: "Actualmente FastPlanner funciona con datos locales en tu navegador. Te recomendamos no cerrar la pestaña sin guardar cambios importantes. Próximamente implementaremos guardado automático en la nube."
    },
    {
      id: 7,
      pregunta: "¿Hay límite en el número de tareas que puedo crear?",
      respuesta: "No hay límite establecido para el número de tareas. Sin embargo, para un mejor rendimiento, recomendamos organizar las tareas completadas en proyectos archivados."
    },
    {
      id: 8,
      pregunta: "¿Puedo usar FastPlanner en mi móvil?",
      respuesta: "¡Por supuesto! FastPlanner tiene un diseño responsivo que se adapta perfectamente a dispositivos móviles y tablets. Puedes acceder desde cualquier navegador web."
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.nombre || !contactForm.email || !contactForm.mensaje) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Aquí puedes implementar el envío real del formulario
    alert('¡Gracias por contactarnos! Responderemos a tu mensaje lo antes posible.');
    
    // Limpiar formulario
    setContactForm({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás en el historial
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centro de Ayuda</h1>
          <p className="text-gray-600">Encuentra respuestas a tus preguntas o contáctanos directamente</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preguntas Frecuentes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                Preguntas Frecuentes
              </h2>
              
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.pregunta}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">{faq.respuesta}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Contáctanos
              </h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  label="Nombre *"
                  placeholder="Tu nombre completo"
                  value={contactForm.nombre}
                  onChange={(e) => setContactForm({...contactForm, nombre: e.target.value})}
                />
                
                <Input
                  label="Email *"
                  type="email"
                  placeholder="tu@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                />
                
                <Input
                  label="Asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  value={contactForm.asunto}
                  onChange={(e) => setContactForm({...contactForm, asunto: e.target.value})}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu consulta o problema..."
                    value={contactForm.mensaje}
                    onChange={(e) => setContactForm({...contactForm, mensaje: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Información de contacto adicional */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Otras formas de contacto</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>soporte@fastplanner.com</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong>Horario de atención:</strong><br />
                  Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                  Tiempo de respuesta: 24-48 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaAyuda;

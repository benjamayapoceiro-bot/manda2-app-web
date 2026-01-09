import React from 'react';
import { useParams, Link } from 'react-router-dom';

const documents: Record<string, { title: string; content: string }> = {
  'terms': {
    title: 'Términos y Condiciones de Uso',
    content: `
      1. Objeto: Manda2 es una plataforma que intermedia pedidos entre usuarios, comercios y repartidores.
      2. Aceptación: El uso de la app implica aceptación de estos términos.
      3. Pagos y reembolsos: Política de reembolso y tiempos (ver Anexo).
      4. Limitación de responsabilidad: Manda2 S.R.L. no es productora de bienes; su responsabilidad está limitada salvo dolo o culpa grave.
      5. Reclamos: Usuario debe informar incidencia en las primeras 48 horas para gestionar devolución o reclamo.
      6. Protección de datos: Sus datos están protegidos conforme a nuestra política de privacidad.
      7. Ley aplicable: Leyes argentinas; jurisdicción Ciudad Autónoma de Buenos Aires.
    `
  },
  'rider-contract': {
    title: 'Contrato de Prestación de Servicios',
    content: `
      Entre: Manda2 S.R.L. (en adelante "LA PLATAFORMA"), CUIT 30-12345678-9, y el/la Repartidor/a.

      1. Objeto: EL/LA REPARTIDOR/A prestará, en forma autónoma e independiente, servicios de transporte y entrega de pedidos originados mediante la aplicación y/o plataforma tecnológica de LA PLATAFORMA.

      2. Naturaleza de la relación: Ambas partes declaran que la relación es civil/comercial y que NO existe relación de dependencia laboral. EL/LA REPARTIDOR/A actúa por su cuenta y riesgo, organiza su tiempo, acepta o rechaza pedidos libremente, elige zonas y rutas y provee sus propios elementos (vehículo, combustible, teléfono, mochila, etc.).

      3. Ausencia de exclusividad y control: EL/LA REPARTIDOR/A puede prestar servicios a terceros, otras plataformas o comercios sin limitación. LA PLATAFORMA no impondrá horarios, ni obligación de conexión mínima.

      4. Remuneración: La remuneración se liquidará por entrega según Anexo I. Las propinas son de libre disposición del repartidor. Los pagos se efectuarán mediante transferencia bancaria.

      5. Requisitos y documentación: EL/LA REPARTIDOR/A debe presentar y mantener vigente: DNI, constancia de CUIT/Monotributo, CBU a su nombre, documentación del vehículo y póliza de seguro.

      6. Riesgo, seguros y responsabilidad: EL/LA REPARTIDOR/A responde por daños a terceros y por su propia integridad. LA PLATAFORMA no asume el pago de indemnizaciones, cargas sociales ni contribuciones.

      7. Suspensiones y bloqueos: LA PLATAFORMA podrá suspender temporalmente el acceso por incumplimientos comprobados y graves.

      8. Duración y término: Contrato por tiempo indeterminado. Cualquiera de las partes lo podrá rescindir en forma inmediata y sin expresión de causa.

      9. Confidencialidad y datos personales: Tratamiento de datos conforme a la política de privacidad de LA PLATAFORMA.

      10. Legislación y jurisdicción: Rige la legislación argentina. Para controversias, jurisdicción de CABA.
    `
  },
  'rider-rates': {
    title: 'Anexo I - Tarifas y Liquidación',
    content: `
      1. Ingreso por pedido:
      - Tarifa de envío total pagada por el usuario: variable según distancia y demanda.
      - Distribución:
        - Repartidor: 57% de la tarifa de envío
        - Plataforma: 43% de la tarifa de envío
      - Ejemplo actual: de $3500 de envío, el repartidor recibe $2000 y la plataforma $1500.

      2. Propinas:
      - 100% a favor del repartidor.

      3. Liquidación:
      - Los pagos se transfieren a la cuenta bancaria del repartidor todos los martes de cada semana, con corte el lunes a las 23:59 hs.

      4. Ajustes:
      - Cualquier modificación porcentual será notificada en la app con 5 días de antelación y aceptada electrónicamente por el repartidor.
    `
  },
  'merchant-agreement': {
    title: 'Acuerdo Comercial con Comercios',
    content: `
      Entre Manda2 S.R.L. (LA PLATAFORMA) y EL COMERCIO.

      1. Objeto: EL COMERCIO habilita a LA PLATAFORMA a exhibir, promocionar y recibir pedidos de sus productos mediante la app/portal, y LA PLATAFORMA prestará servicios de intermediación y logística según el plan elegido.

      2. Comisiones y liquidaciones: Comisión estándar sobre el valor neto de cada venta (excluye IVA). Bonificaciones promocionales y descuentos sujetos a campañas. Pagos: liquidación semanal.

      3. Responsabilidades del comercio: EL COMERCIO garantiza la calidad, habilitación y manipulación segura de los alimentos/productos. EL COMERCIO indemnizará a LA PLATAFORMA por reclamos por productos.

      4. Licencia de uso de marca: EL COMERCIO otorga licencia no exclusiva para usar su nombre y logo en la app y material promocional.

      5. Datos y confidencialidad: Intercambio de datos comerciales conforme a la política de privacidad. Prohibida la extracción masiva de datos.

      6. Duración y terminación: Contrato por 12 meses con prórroga automática. Rescisión con preaviso de 30 días.

      7. Limitación de responsabilidad: LA PLATAFORMA actúa como intermediaria y no será responsable por la preparación del producto.
    `
  }
};

const LegalScreen: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const doc = documents[docId || 'terms'];

  if (!doc) {
    return <div className="p-8 text-white bg-[#221510] h-screen">Documento no encontrado</div>;
  }

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#120a07] min-h-screen text-slate-900 dark:text-white font-display">
      <div className="sticky top-0 z-50 bg-white dark:bg-[#1e130f] border-b border-gray-200 dark:border-white/10 p-4 flex items-center">
        <Link to={-1 as any} className="mr-4">
          <span className="material-symbols-outlined text-[#f46325]">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold truncate">{doc.title}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
          {doc.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {paragraph.trim()}
            </p>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 mb-2">Última actualización: {new Date().toLocaleDateString()}</p>
          <div className="flex justify-center gap-2">
             <span className="material-symbols-outlined text-gray-400 text-sm">lock</span>
             <span className="text-xs text-gray-400 font-medium">Documento Legal Oficial - Manda2 S.R.L.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalScreen;
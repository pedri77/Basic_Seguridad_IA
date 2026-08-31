const byId = (id) => document.getElementById(id);

const assets = [
  {
    id: "system",
    label: "Sistema IA",
    type: "Activo",
    description: "Conjunto de aplicación, modelo, datos, permisos, herramientas, evaluación y operación.",
    details: [
      "Define el caso de uso antes de elegir controles.",
      "Separa responsabilidades entre aplicación, modelo y datos.",
      "Documenta límites, usuarios, proveedores y acciones permitidas."
    ],
    color: "var(--palette-ink)"
  },
  {
    id: "prompt",
    label: "Prompt",
    type: "Activo",
    description: "Instrucciones del sistema, mensajes de usuario, plantillas y contexto enviado al modelo.",
    details: [
      "No guardes secretos ni credenciales dentro del prompt.",
      "Diferencia instrucciones de sistema, datos recuperados y entrada del usuario.",
      "Registra versiones de prompts críticos."
    ],
    color: "var(--palette-red)"
  },
  {
    id: "data",
    label: "Datos",
    type: "Activo",
    description: "Datos de entrenamiento, evaluación, documentos RAG, memoria, logs y ejemplos.",
    details: [
      "Clasifica sensibilidad y origen.",
      "Minimiza datos personales en prompts y registros.",
      "Controla acceso, retención y borrado."
    ],
    color: "var(--palette-muted)"
  },
  {
    id: "model",
    label: "Modelo",
    type: "Activo",
    description: "Modelo base, modelo ajustado, endpoint de inferencia y parámetros de generación.",
    details: [
      "Mantén inventario de proveedor, versión y capacidades.",
      "Evalúa comportamiento antes de cambios de modelo.",
      "Protege endpoints contra abuso, extracción y uso no autorizado."
    ],
    color: "var(--palette-red-deep)"
  },
  {
    id: "rag",
    label: "RAG",
    type: "Activo",
    description: "Búsqueda, embeddings, base vectorial y ensamblado de contexto para respuestas aumentadas.",
    details: [
      "Valida fuentes antes de indexarlas.",
      "Aísla documentos por usuario, tenant o proyecto.",
      "Muestra procedencia cuando una respuesta dependa de fuentes externas."
    ],
    color: "var(--palette-muted)"
  },
  {
    id: "tools",
    label: "Herramientas",
    type: "Activo",
    description: "Funciones, plugins, conectores, MCP, APIs y acciones que el sistema puede invocar.",
    details: [
      "Aplica mínimo privilegio por herramienta.",
      "Requiere aprobación humana para acciones sensibles.",
      "Valida argumentos antes de ejecutar."
    ],
    color: "var(--palette-red)"
  },
  {
    id: "identity",
    label: "Identidad",
    type: "Activo",
    description: "Usuarios, roles, sesiones, claves de API y permisos asociados al sistema IA.",
    details: [
      "No confundas permisos del usuario con permisos del agente.",
      "Propaga identidad de forma verificable en RAG y herramientas.",
      "Rota secretos y registra uso anómalo."
    ],
    color: "var(--palette-ink)"
  },
  {
    id: "monitoring",
    label: "Monitorización",
    type: "Activo",
    description: "Logs, métricas, trazas, alertas, revisión de abuso y evaluación continua.",
    details: [
      "Registra lo mínimo necesario para investigar incidentes.",
      "Redacta o anonimiza contenido sensible.",
      "Crea alertas para abuso, fuga de datos y costes anómalos."
    ],
    color: "var(--palette-red-deep)"
  }
];

const threats = [
  {
    id: "prompt-injection",
    title: "Prompt injection",
    category: "Entrada",
    severity: "Alta",
    assets: ["prompt", "rag", "tools"],
    description: "Una entrada intenta alterar instrucciones, saltar límites o convertir contexto no fiable en órdenes.",
    impact: "Puede provocar fuga de datos, acciones no autorizadas o respuestas inseguras.",
    controls: ["Separar instrucciones y datos", "Validar contexto externo", "Limitar herramientas", "Aprobación humana"]
  },
  {
    id: "data-disclosure",
    title: "Divulgación sensible",
    category: "Datos",
    severity: "Alta",
    assets: ["data", "prompt", "monitoring"],
    description: "El sistema expone datos personales, secretos, prompts internos o información de otros usuarios.",
    impact: "Afecta privacidad, cumplimiento, reputación y confidencialidad operativa.",
    controls: ["Clasificar datos", "Redactar logs", "Controlar RAG por identidad", "Filtrar salidas"]
  },
  {
    id: "supply-chain",
    title: "Cadena de suministro",
    category: "Modelo",
    severity: "Media",
    assets: ["model", "data", "tools"],
    description: "Modelos, datasets, librerías, prompts o conectores introducen código o comportamiento no fiable.",
    impact: "Puede introducir vulnerabilidades, sesgos, puertas traseras o cambios no revisados.",
    controls: ["Inventario de componentes", "Firmas y procedencia", "Revisión de proveedores", "Pruebas de regresión"]
  },
  {
    id: "rag-poisoning",
    title: "Poisoning en RAG",
    category: "RAG",
    severity: "Alta",
    assets: ["rag", "data", "prompt"],
    description: "Documentos manipulados entran en la base de conocimiento y contaminan respuestas o decisiones.",
    impact: "El modelo puede citar contenido falso, seguir instrucciones ocultas o exfiltrar información.",
    controls: ["Curación de fuentes", "Escaneo de contenido", "Aislamiento por permisos", "Citas verificables"]
  },
  {
    id: "excessive-agency",
    title: "Agencia excesiva",
    category: "Agentes",
    severity: "Alta",
    assets: ["tools", "identity", "system"],
    description: "El sistema ejecuta acciones sin límites claros, sin confirmación o con permisos demasiado amplios.",
    impact: "Puede modificar datos, enviar mensajes, gastar recursos o operar fuera del propósito previsto.",
    controls: ["Mínimo privilegio", "Confirmación para cambios", "Sandbox de herramientas", "Políticas por acción"]
  },
  {
    id: "insecure-output",
    title: "Salida insegura",
    category: "Aplicación",
    severity: "Media",
    assets: ["model", "system"],
    description: "La aplicación confía en la salida del modelo y la renderiza, ejecuta o persiste sin validación.",
    impact: "Puede derivar en XSS, comandos peligrosos, inyección SQL o decisiones incorrectas.",
    controls: ["Validar salidas", "Codificar HTML", "No ejecutar texto generado", "Pruebas de seguridad"]
  },
  {
    id: "model-abuse",
    title: "Abuso del modelo",
    category: "Operación",
    severity: "Media",
    assets: ["model", "identity", "monitoring"],
    description: "Uso automatizado, extracción, scraping de respuestas o consumo excesivo del endpoint.",
    impact: "Aumenta costes, degrada servicio y puede revelar comportamiento propietario.",
    controls: ["Rate limiting", "Cuotas por usuario", "Detección de abuso", "Trazabilidad de API"]
  },
  {
    id: "overreliance",
    title: "Sobreconfianza",
    category: "Gobernanza",
    severity: "Media",
    assets: ["system", "monitoring"],
    description: "Personas o procesos aceptan salidas del modelo sin revisión cuando el impacto lo exige.",
    impact: "Errores, alucinaciones o sesgos llegan a decisiones reales sin control suficiente.",
    controls: ["Revisión humana", "Umbrales de confianza", "Mensajes de incertidumbre", "Evaluación continua"]
  }
];

const lifecycle = [
  {
    stage: "Gobernanza",
    title: "Propósito y límites",
    body: "Define uso permitido, responsables, criterios de aceptación y riesgos que no se asumirán.",
    controls: ["Política de uso", "Inventario IA", "Modelo de responsabilidad"]
  },
  {
    stage: "Datos",
    title: "Clasificación y procedencia",
    body: "Controla qué datos entran, quién puede verlos y cuánto tiempo se conservan.",
    controls: ["Minimización", "Etiquetado de sensibilidad", "Revisión de fuentes"]
  },
  {
    stage: "Diseño",
    title: "Arquitectura de confianza",
    body: "Separa contexto, instrucciones, identidad y herramientas para que una entrada no mande sobre todo.",
    controls: ["Threat modeling", "Límites de prompt", "Permisos por acción"]
  },
  {
    stage: "Construcción",
    title: "Integración segura",
    body: "Valida entradas y salidas, protege secretos y prueba dependencias, modelos y conectores.",
    controls: ["SSDF", "Pruebas AISVS", "Revisión de dependencias"]
  },
  {
    stage: "Despliegue",
    title: "Exposición controlada",
    body: "Publica con cuotas, autenticación, entornos separados y rutas claras de rollback.",
    controls: ["Rate limiting", "Aislamiento", "Gestión de claves"]
  },
  {
    stage: "Operación",
    title: "Medición continua",
    body: "Observa abuso, desviación, errores y costes. Ajusta controles cuando cambie el uso real.",
    controls: ["Logs mínimos", "Alertas", "Evaluaciones periódicas"]
  }
];

const checklist = [
  "Existe inventario de modelos, proveedores, datasets, prompts y herramientas.",
  "Los datos sensibles no se envían al modelo salvo necesidad justificada.",
  "Los secretos viven fuera de prompts, RAG, logs y ejemplos de prueba.",
  "El RAG filtra documentos por identidad, tenant o proyecto.",
  "Las herramientas del agente aplican mínimo privilegio.",
  "Las acciones sensibles requieren confirmación humana.",
  "La salida del modelo se valida antes de renderizar, ejecutar o almacenar.",
  "Hay pruebas contra prompt injection, fuga de datos y errores de autorización.",
  "Los logs minimizan contenido sensible y permiten investigar abuso.",
  "Los cambios de modelo, prompt o dataset tienen evaluación y rollback.",
  "Se ha clasificado el sistema según el AI Act y se han identificado roles y obligaciones.",
  "Si hay datos personales, existen base jurídica, minimización, información y posible EIPD.",
  "Si aplica ENS, NIS2 o ciberresiliencia, los controles se trazan a requisitos concretos.",
  "Las personas reciben aviso claro cuando interactúan con IA o contenido generado."
];

const references = [
  {
    title: "NIST AI Risk Management Framework",
    category: "Gobernanza",
    organization: "NIST",
    summary: "Marco voluntario para gestionar riesgos de sistemas IA mediante funciones de gobernar, mapear, medir y gestionar.",
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  },
  {
    title: "NIST AI RMF 1.0",
    category: "Gobernanza",
    organization: "NIST",
    summary: "Publicación base del AI RMF 1.0, publicada el 26 de enero de 2023.",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10"
  },
  {
    title: "NIST AI 600-1",
    category: "GenAI",
    organization: "NIST",
    summary: "Perfil de IA generativa para aplicar AI RMF a riesgos específicos de sistemas generativos.",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
  },
  {
    title: "OWASP GenAI LLM Top 10 2026",
    category: "LLM",
    organization: "OWASP",
    summary: "Guía comunitaria actual de riesgos críticos en aplicaciones basadas en grandes modelos de lenguaje.",
    url: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/"
  },
  {
    title: "OWASP AISVS 1.0",
    category: "Verificación",
    organization: "OWASP",
    summary: "Catálogo de requisitos verificables para diseñar, construir, probar y auditar sistemas IA.",
    url: "https://owasp.org/www-project-artificial-intelligence-security-verification-standard-aisvs-docs/"
  },
  {
    title: "MITRE ATLAS",
    category: "Amenazas",
    organization: "MITRE",
    summary: "Base de conocimiento viva sobre tácticas, técnicas, mitigaciones y casos reales contra sistemas IA.",
    url: "https://atlas.mitre.org/"
  },
  {
    title: "Guidelines for Secure AI System Development",
    category: "Desarrollo",
    organization: "CISA, NCSC, NSA y socios",
    summary: "Guía internacional para diseñar, desarrollar, desplegar y operar sistemas IA con seguridad desde el diseño.",
    url: "https://www.cisa.gov/news-events/alerts/2023/11/26/cisa-and-uk-ncsc-unveil-joint-guidelines-secure-ai-system-development"
  },
  {
    title: "ISO/IEC 42001:2023",
    category: "Gobernanza",
    organization: "ISO",
    summary: "Norma internacional para sistemas de gestión de inteligencia artificial en organizaciones.",
    url: "https://www.iso.org/es/norma/42001"
  },
  {
    title: "NIST SP 800-218 SSDF",
    category: "Desarrollo",
    organization: "NIST",
    summary: "Marco de desarrollo de software seguro aplicable a componentes, integraciones y ciclo de vida.",
    url: "https://csrc.nist.gov/pubs/sp/800/218/final"
  },
  {
    title: "OWASP Top 10:2025",
    category: "Aplicación",
    organization: "OWASP",
    summary: "Documento de concienciación sobre riesgos críticos de seguridad en aplicaciones web.",
    url: "https://owasp.org/Top10/"
  },
  {
    title: "Reglamento (UE) 2024/1689 de Inteligencia Artificial",
    category: "Normativa UE",
    organization: "UE",
    summary: "Marco europeo de IA con reglas por nivel de riesgo, prácticas prohibidas, transparencia y obligaciones para modelos de propósito general.",
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079&lang=es"
  },
  {
    title: "AI Act: calendario de aplicación",
    category: "Normativa UE",
    organization: "Comisión Europea",
    summary: "Resumen oficial de la entrada en vigor, aplicación por fases y obligaciones de transparencia del Reglamento Europeo de IA.",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
  },
  {
    title: "Reglamento General de Protección de Datos",
    category: "Normativa UE",
    organization: "UE",
    summary: "Marco europeo para tratamientos de datos personales, relevante para prompts, RAG, logs, entrenamiento, evaluación y perfiles de usuario.",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
  },
  {
    title: "LOPDGDD Ley Orgánica 3/2018",
    category: "Normativa España",
    organization: "BOE",
    summary: "Norma española que adapta el RGPD y garantiza derechos digitales en tratamientos de datos personales.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673"
  },
  {
    title: "Guías AEPD sobre IA y protección de datos",
    category: "Guías oficiales",
    organization: "AEPD",
    summary: "Guías y criterios sobre auditoría, minimización, exactitud, transparencia y responsabilidad en tratamientos con IA.",
    url: "https://www.aepd.es/guias-y-herramientas/guias"
  },
  {
    title: "ENS Real Decreto 311/2022",
    category: "Normativa España",
    organization: "BOE",
    summary: "Esquema Nacional de Seguridad para sistemas del sector público y servicios relacionados con administración digital.",
    url: "https://boe.es/buscar/act.php?id=BOE-A-2022-7191&lang=es&p=20241106&tn=6"
  },
  {
    title: "AESIA Real Decreto 729/2023",
    category: "Normativa España",
    organization: "BOE",
    summary: "Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial y sus funciones de supervisión, asesoramiento y coordinación.",
    url: "https://www.boe.es/eli/es/rd/2023/08/22/729"
  },
  {
    title: "Directiva SRI 2 NIS2",
    category: "Normativa UE",
    organization: "UE",
    summary: "Directiva europea de ciberseguridad para entidades esenciales e importantes, con obligaciones de gestión de riesgos e incidentes.",
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2022-81963"
  },
  {
    title: "Reglamento de Ciberresiliencia",
    category: "Normativa UE",
    organization: "UE",
    summary: "Requisitos horizontales de ciberseguridad para productos con elementos digitales, incluido software puesto en el mercado.",
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81720"
  },
  {
    title: "CCN-STIC 884D servicios de IA",
    category: "Guías oficiales",
    organization: "CCN-CERT",
    summary: "Guía técnica de configuración segura para servicios de IA dentro de la serie CCN-STIC 800 vinculada al ENS.",
    url: "https://www.ccn-cert.cni.es/es/pdf/guias/series-ccn-stic/800-guia-esquema-nacional-de-seguridad?format=html&limit=25&limitstart=125"
  },
  {
    title: "UNE-ISO/IEC 42001:2025",
    category: "Estándares",
    organization: "UNE",
    summary: "Adopción española de la norma ISO/IEC 42001 para sistemas de gestión de inteligencia artificial.",
    url: "https://revista.une.org/81/tecnologia-de-la-informacion.-inteligencia-artificial.-siste.html"
  }
];

const complianceFrameworks = [
  {
    id: "ai-act",
    title: "Reglamento Europeo de IA",
    scope: "UE",
    status: "En vigor desde el 1 de agosto de 2024. Aplicación general desde el 2 de agosto de 2026.",
    summary: "Ordena el uso de IA por niveles de riesgo y marca obligaciones para proveedores, distribuidores, importadores y responsables del despliegue.",
    obligations: [
      "Clasificar el sistema por riesgo y por rol antes de desplegarlo.",
      "Evitar prácticas prohibidas y revisar si el caso entra en alto riesgo.",
      "Informar cuando una persona interactúa con IA o recibe contenido generado o modificado con IA.",
      "En modelos de propósito general, preparar documentación, información para integradores, resumen de datos de entrenamiento y seguridad."
    ],
    tags: ["Riesgo", "Transparencia", "GPAI", "Derechos fundamentales"],
    relatedNodes: ["system", "model", "monitoring", "overreliance", "control-politica-de-uso", "control-inventario-ia", "control-revision-humana"],
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079&lang=es"
  },
  {
    id: "rgpd-lopdgdd",
    title: "RGPD y LOPDGDD",
    scope: "UE y España",
    status: "RGPD aplicable desde el 25 de mayo de 2018. LOPDGDD en vigor desde el 7 de diciembre de 2018.",
    summary: "Se activa cuando prompts, documentos RAG, logs, evaluaciones o entrenamiento tratan datos personales.",
    obligations: [
      "Definir base jurídica, finalidad, minimización, retención y responsables del tratamiento.",
      "Aplicar privacidad desde el diseño y por defecto en prompts, RAG, logs y salidas.",
      "Facilitar derechos de las personas y explicar decisiones automatizadas cuando corresponda.",
      "Valorar una evaluación de impacto cuando el tratamiento pueda implicar alto riesgo para derechos y libertades."
    ],
    tags: ["Datos personales", "Privacidad", "EIPD", "Derechos"],
    relatedNodes: ["data", "prompt", "monitoring", "data-disclosure", "control-clasificar-datos", "control-minimizacion", "control-redactar-logs", "control-controlar-rag-por-identidad"],
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673"
  },
  {
    id: "aepd",
    title: "Guías y criterios AEPD",
    scope: "España",
    status: "Documentación viva de la autoridad española de protección de datos.",
    summary: "Aterriza el RGPD en sistemas IA con criterios sobre auditoría, calidad de datos, exactitud, minimización y agentes.",
    obligations: [
      "Auditar tratamientos IA con objetivos de control, evidencias y responsabilidad activa.",
      "Revisar calidad, exactitud e idoneidad de los datos usados por el sistema.",
      "No introducir datos personales o información delicada en herramientas IA sin necesidad y garantías.",
      "Separar guía ciudadana, criterio jurídico y obligación legal antes de convertirlo en requisito."
    ],
    tags: ["AEPD", "Auditoría", "Calidad de datos", "Minimización"],
    relatedNodes: ["data-disclosure", "overreliance", "control-evaluacion-continua", "control-revision-humana", "control-pruebas-aisvs"],
    url: "https://www.aepd.es/guias-y-herramientas/guias"
  },
  {
    id: "ens",
    title: "Esquema Nacional de Seguridad",
    scope: "España",
    status: "Real Decreto 311/2022 en vigor desde el 5 de mayo de 2022.",
    summary: "Referencia obligada para sector público y proveedores vinculados a servicios públicos digitales.",
    obligations: [
      "Categorizar el sistema y aplicar medidas según riesgo, servicio, información y exposición.",
      "Mantener política de seguridad, responsables, análisis de riesgos y mejora continua.",
      "Proteger identidad, trazabilidad, continuidad, configuración segura y cadena de suministro.",
      "Usar guías CCN-STIC cuando se necesite aterrizar configuración y evidencias."
    ],
    tags: ["Sector público", "Medidas ENS", "CCN-STIC", "Trazabilidad"],
    relatedNodes: ["system", "identity", "tools", "monitoring", "supply-chain", "control-modelo-de-responsabilidad", "control-gestion-de-claves", "control-alertas"],
    url: "https://boe.es/buscar/act.php?id=BOE-A-2022-7191&lang=es&p=20241106&tn=6"
  },
  {
    id: "aesia",
    title: "AESIA",
    scope: "España",
    status: "Creada por el Real Decreto 729/2023, publicado el 2 de septiembre de 2023.",
    summary: "Autoridad española de supervisión de IA, con funciones de asesoramiento, concienciación, coordinación, inspección y sanción cuando proceda.",
    obligations: [
      "Identificar qué autoridad o autoridades pueden supervisar el caso de uso.",
      "Preparar evidencias de gobernanza, controles, trazabilidad y evaluación.",
      "Considerar entornos de prueba y certificaciones voluntarias si el proyecto lo requiere.",
      "Coordinar IA, protección de datos, ciberseguridad y sector regulado en una sola lectura de riesgo."
    ],
    tags: ["Supervisión", "Evidencias", "Sandbox", "Coordinación"],
    relatedNodes: ["system", "overreliance", "control-politica-de-uso", "control-inventario-ia", "control-evaluacion-continua"],
    url: "https://www.boe.es/eli/es/rd/2023/08/22/729"
  },
  {
    id: "nis2",
    title: "Directiva SRI 2 NIS2",
    scope: "UE",
    status: "Directiva (UE) 2022/2555, vigente como marco europeo de ciberseguridad.",
    summary: "Afecta a entidades esenciales o importantes, con foco en gestión de riesgos, incidentes, continuidad y proveedores.",
    obligations: [
      "Revisar si el sector entra en entidades esenciales o importantes.",
      "Documentar medidas de gestión de riesgos de ciberseguridad y continuidad.",
      "Preparar detección, gestión y notificación de incidentes cuando aplique.",
      "Controlar cadena de suministro, proveedores, identidad y accesos."
    ],
    tags: ["Ciberseguridad", "Incidentes", "Proveedores", "Continuidad"],
    relatedNodes: ["supply-chain", "identity", "monitoring", "control-revision-de-proveedores", "control-deteccion-de-abuso", "control-trazabilidad-de-api", "control-alertas"],
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2022-81963"
  },
  {
    id: "cra",
    title: "Reglamento de Ciberresiliencia",
    scope: "UE",
    status: "Reglamento (UE) 2024/2847, con aplicación escalonada desde 2026 y aplicación principal desde el 11 de diciembre de 2027.",
    summary: "Afecta a productos con elementos digitales y exige seguridad por diseño, gestión de vulnerabilidades e información para usuarios.",
    obligations: [
      "Identificar si el sistema IA se comercializa como producto con elementos digitales.",
      "Incorporar requisitos de ciberseguridad desde el diseño y durante el ciclo de vida.",
      "Mantener gestión de vulnerabilidades, actualizaciones y comunicación a usuarios.",
      "Conectar dependencias, modelos, librerías y APIs con inventario y respuesta ante cambios."
    ],
    tags: ["Producto digital", "Vulnerabilidades", "Seguridad por diseño", "Soporte"],
    relatedNodes: ["supply-chain", "model", "tools", "control-inventario-de-componentes", "control-firmas-y-procedencia", "control-revision-de-dependencias", "control-pruebas-de-regresion"],
    url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81720"
  }
];

const quiz = [
  {
    question: "¿Qué control reduce mejor el riesgo de que un agente ejecute una acción destructiva?",
    options: ["Aprobación humana para acciones sensibles", "Subir la temperatura del modelo", "Ocultar el botón de enviar", "Cambiar el color del aviso"],
    answer: "Aprobación humana para acciones sensibles",
    reason: "La supervisión explícita limita decisiones automatizadas con impacto real."
  },
  {
    question: "¿Dónde NO deberían vivir claves de API o secretos?",
    options: ["En prompts o documentos RAG", "En un gestor de secretos", "En variables de entorno protegidas", "En una bóveda corporativa"],
    answer: "En prompts o documentos RAG",
    reason: "El prompt y el contexto pueden aparecer en logs, respuestas o trazas."
  },
  {
    question: "¿Qué riesgo aparece cuando documentos manipulados entran en una base RAG?",
    options: ["Poisoning en RAG", "Rate limiting", "Compresión JPEG", "Balanceo L4"],
    answer: "Poisoning en RAG",
    reason: "El modelo puede usar contexto falso o malicioso como si fuera confiable."
  },
  {
    question: "¿Qué práctica encaja mejor con NIST AI RMF?",
    options: ["Medir y gestionar riesgos de forma continua", "Confiar siempre en la primera respuesta", "Evitar cualquier registro", "Usar un único prompt para todo"],
    answer: "Medir y gestionar riesgos de forma continua",
    reason: "El AI RMF organiza la gestión en gobernar, mapear, medir y gestionar."
  },
  {
    question: "¿Qué marco debes revisar si un sistema IA usa datos personales en prompts, logs o RAG?",
    options: ["RGPD y LOPDGDD", "Solo el README del modelo", "La paleta de colores", "El tamaño de la ventana"],
    answer: "RGPD y LOPDGDD",
    reason: "El tratamiento de datos personales exige base jurídica, minimización, información, derechos y control del riesgo."
  },
  {
    question: "¿Qué verifica mejor una salida generada antes de usarla como código, HTML o consulta?",
    options: ["Validación y codificación de salida", "Más tokens de contexto", "Un nombre de modelo más largo", "Una respuesta más creativa"],
    answer: "Validación y codificación de salida",
    reason: "El texto generado no debe ejecutarse ni renderizarse como confiable sin controles."
  }
];

const labProfiles = {
  dataProfile: {
    public: { score: 0, label: "datos públicos", controls: ["Mantener datos de prueba separados de producción."] },
    internal: { score: 1, label: "datos internos", controls: ["Aplicar clasificación de datos y control de acceso."] },
    personal: { score: 2, label: "datos personales o sensibles", controls: ["Minimizar datos y revisar base legal, retención y redacción."] }
  },
  contextProfile: {
    none: { score: 0, label: "sin RAG", controls: ["Documentar que el modelo no consulta fuentes externas."] },
    curated: { score: 1, label: "RAG curado", controls: ["Versionar fuentes y validar procedencia antes de indexar."] },
    open: { score: 2, label: "RAG abierto", controls: ["Escanear contenido, aislar tenants y marcar contexto no confiable."] }
  },
  actionProfile: {
    answer: { score: 0, label: "solo respuesta", controls: ["Validar salidas antes de mostrarlas en interfaces sensibles."] },
    suggest: { score: 1, label: "sugerencias", controls: ["Separar sugerencia de ejecución y registrar quién aprueba."] },
    execute: { score: 3, label: "ejecución de herramientas", controls: ["Usar mínimo privilegio, sandbox y aprobación humana."] }
  },
  oversightProfile: {
    strong: { score: -1, label: "supervisión fuerte", controls: ["Mantener logs mínimos y revisión de acciones sensibles."] },
    partial: { score: 1, label: "supervisión parcial", controls: ["Completar trazabilidad de decisiones y alertas de abuso."] },
    weak: { score: 2, label: "supervisión débil", controls: ["Definir responsable, umbrales, alertas y plan de respuesta."] }
  }
};

let selectedNodeId = "system";
let selectedRiskCategory = "Todos";
let selectedReferenceCategory = "Todas";
let selectedComplianceId = "ai-act";
let quizIndex = 0;
let answered = false;
let quizScore = 0;
let graph;

function resolveCssColor(value) {
  const probe = document.createElement("span");
  probe.style.color = value;
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

function palette() {
  return {
    text: resolveCssColor("var(--text)"),
    muted: resolveCssColor("var(--muted)"),
    line: resolveCssColor("var(--line)"),
    surface: resolveCssColor("var(--surface)"),
    accent: resolveCssColor("var(--accent)"),
    accentText: resolveCssColor("var(--accent-text)"),
    asset: resolveCssColor("var(--palette-ink)"),
    threat: resolveCssColor("var(--palette-red)"),
    control: resolveCssColor("var(--palette-muted)"),
    reference: resolveCssColor("var(--palette-red-deep)"),
    compliance: resolveCssColor("var(--palette-muted)")
  };
}

function nodeColor(node) {
  if (node.kind === "asset") return resolveCssColor(node.color);
  const colors = palette();
  return colors[node.kind] || colors.accent;
}

function graphNodes() {
  const lifecycleControlNodes = lifecycle.flatMap((stage) =>
    stage.controls.map((control) => ({
      id: `control-${slug(control)}`,
      label: control,
      kind: "control",
      type: "Control",
      description: `Control asociado a ${stage.title.toLowerCase()}.`,
      details: [stage.body, `Fase: ${stage.stage}`]
    }))
  );

  const threatControlNodes = threats.flatMap((threat) =>
    threat.controls.map((control) => ({
      id: `control-${slug(control)}`,
      label: control,
      kind: "control",
      type: "Control",
      description: `Control recomendado para ${threat.title.toLowerCase()}.`,
      details: [threat.impact, `Riesgo relacionado: ${threat.title}`]
    }))
  );

  const referenceNodes = references.map((reference) => ({
    id: `ref-${slug(reference.title)}`,
    label: reference.organization,
    kind: "reference",
    type: "Referencia",
    description: reference.title,
    details: [reference.summary, reference.url],
    url: reference.url
  }));

  const complianceNodes = complianceFrameworks.map((framework) => ({
    id: `law-${framework.id}`,
    label: framework.scope,
    kind: "compliance",
    type: "Marco legal",
    description: framework.title,
    details: [framework.status, framework.summary, ...framework.obligations],
    url: framework.url
  }));

  return [
    ...assets.map((asset) => ({ ...asset, kind: "asset" })),
    ...threats.map((threat) => ({
      id: threat.id,
      label: threat.title,
      kind: "threat",
      type: "Amenaza",
      description: threat.description,
      details: [threat.impact, `Categoría: ${threat.category}`, `Severidad: ${threat.severity}`]
    })),
    ...dedupeById([...lifecycleControlNodes, ...threatControlNodes]),
    ...complianceNodes,
    ...referenceNodes
  ];
}

function graphEdges() {
  const edges = [{ source: "system", target: "prompt", label: "incluye" }];
  assets.filter((asset) => asset.id !== "system").forEach((asset) => {
    edges.push({ source: "system", target: asset.id, label: "depende de" });
  });

  threats.forEach((threat) => {
    threat.assets.forEach((assetId) => edges.push({ source: assetId, target: threat.id, label: "expuesto a" }));
    threat.controls.forEach((control) => {
      const controlId = `control-${slug(control)}`;
      edges.push({ source: threat.id, target: controlId, label: "mitiga" });
    });
  });

  complianceFrameworks.forEach((framework) => {
    framework.relatedNodes.forEach((target) => {
      edges.push({ source: `law-${framework.id}`, target, label: "aplica a" });
    });
  });

  const referenceLinks = [
    ["ref-nist-ai-risk-management-framework", "system"],
    ["ref-owasp-genai-llm-top-10-2026", "prompt-injection"],
    ["ref-owasp-aisvs-1-0", "excessive-agency"],
    ["ref-mitre-atlas", "rag-poisoning"],
    ["ref-guidelines-for-secure-ai-system-development", "supply-chain"],
    ["ref-nist-ai-600-1", "data-disclosure"],
    ["ref-reglamento-ue-2024-1689-de-inteligencia-artificial", "law-ai-act"],
    ["ref-ai-act-calendario-de-aplicacion", "law-ai-act"],
    ["ref-reglamento-general-de-proteccion-de-datos", "law-rgpd-lopdgdd"],
    ["ref-lopdgdd-ley-organica-3-2018", "law-rgpd-lopdgdd"],
    ["ref-guias-aepd-sobre-ia-y-proteccion-de-datos", "law-aepd"],
    ["ref-ens-real-decreto-311-2022", "law-ens"],
    ["ref-aesia-real-decreto-729-2023", "law-aesia"],
    ["ref-directiva-sri-2-nis2", "law-nis2"],
    ["ref-reglamento-de-ciberresiliencia", "law-cra"],
    ["ref-ccn-stic-884d-servicios-de-ia", "law-ens"],
    ["ref-une-iso-iec-42001-2025", "system"]
  ];

  referenceLinks.forEach(([source, target]) => edges.push({ source, target, label: "referencia" }));

  return dedupeById(edges.map((edge) => ({ id: `${edge.source}-${edge.target}`, ...edge })));
}

function dedupeById(items) {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderGraph() {
  const container = byId("conceptMap");
  if (!container) return;

  if (typeof window.cytoscape !== "function") {
    renderGraphFallback(container);
    renderSelectedNode();
    return;
  }

  container.classList.remove("is-fallback");

  if (graph) graph.destroy();
  graph = cytoscape({
    container,
    elements: [
      ...graphNodes().map((node) => ({
        data: { ...node, color: nodeColor(node) },
        classes: `type-${node.kind}`
      })),
      ...graphEdges().map((edge) => ({ data: edge }))
    ],
    style: graphStyle(),
    minZoom: 0.45,
    maxZoom: 2.2,
    wheelSensitivity: 0.18,
    boxSelectionEnabled: false,
    layout: {
      name: "cose",
      animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      animationDuration: 450,
      componentSpacing: 90,
      idealEdgeLength: 88,
      nodeRepulsion: 7200,
      padding: 34,
      randomize: false
    }
  });

  graph.on("tap", "node", (event) => selectNode(event.target.id()));
  graph.on("tap", (event) => {
    if (event.target === graph) selectNode("system");
  });

  updateGraphSelection();
  renderSelectedNode();
}

function graphStyle() {
  const colors = palette();

  return [
    {
      selector: "node",
      style: {
        "background-color": "data(color)",
        "border-color": "data(color)",
        "border-width": 2,
        color: colors.text,
        content: "data(label)",
        "font-family": "Segoe UI, system-ui, sans-serif",
        "font-size": 12,
        "font-weight": 800,
        height: 48,
        label: "data(label)",
        "overlay-opacity": 0,
        shape: "round-rectangle",
        "text-halign": "center",
        "text-max-width": 96,
        "text-valign": "center",
        "text-wrap": "wrap",
        width: 104
      }
    },
    {
      selector: ".type-asset",
      style: {
        "background-color": colors.surface,
        color: colors.text,
        height: 56,
        width: 118
      }
    },
    {
      selector: ".type-threat",
      style: {
        "background-color": colors.surface,
        color: colors.text,
        shape: "ellipse",
        width: 112
      }
    },
    {
      selector: ".type-control",
      style: {
        "background-color": colors.surface,
        color: colors.text,
        "font-size": 11,
        height: 44,
        width: 104
      }
    },
    {
      selector: ".type-reference",
      style: {
        "background-color": colors.surface,
        color: colors.text,
        shape: "hexagon",
        width: 96
      }
    },
    {
      selector: ".type-compliance",
      style: {
        "background-color": colors.surface,
        color: colors.text,
        "font-size": 11,
        height: 58,
        shape: "diamond",
        width: 108
      }
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        label: "",
        "line-color": colors.line,
        opacity: 0.7,
        "target-arrow-color": colors.line,
        "target-arrow-shape": "triangle",
        width: 2
      }
    },
    {
      selector: ".is-selected",
      style: {
        "border-color": colors.accent,
        "border-width": 4,
        "shadow-blur": 18,
        "shadow-color": colors.accent,
        "shadow-opacity": 0.24
      }
    },
    {
      selector: ".is-related-edge",
      style: {
        label: "data(label)",
        "font-size": 10,
        "font-weight": 800,
        "line-color": colors.accent,
        opacity: 1,
        "target-arrow-color": colors.accent,
        width: 3
      }
    },
    {
      selector: ".is-muted",
      style: {
        opacity: 0.24
      }
    }
  ];
}

function renderGraphFallback(container) {
  const nodes = graphNodes().filter((node) => ["asset", "threat", "compliance"].includes(node.kind));
  container.classList.add("is-fallback");
  container.innerHTML = nodes
    .map(
      (node) => `
        <button class="fallback-node${node.id === selectedNodeId ? " is-active" : ""}" type="button" data-node="${node.id}">
          <span>${node.type}</span>
          <strong>${node.label}</strong>
        </button>
      `
    )
    .join("");

  container.querySelectorAll("[data-node]").forEach((button) => {
    button.addEventListener("click", () => selectNode(button.dataset.node));
  });
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  renderSelectedNode();
  updateGraphSelection();
}

function getSelectedNode() {
  return graphNodes().find((node) => node.id === selectedNodeId) || graphNodes()[0];
}

function renderSelectedNode() {
  const node = getSelectedNode();
  byId("selectedType").textContent = node.type;
  byId("selectedTitle").textContent = node.label;
  byId("selectedDescription").textContent = node.description;
  byId("selectedDetails").innerHTML = node.details.map((detail) => `<li>${detail}</li>`).join("");
}

function updateGraphSelection() {
  if (!graph) return;

  const selected = graph.$id(selectedNodeId);
  graph.elements().removeClass("is-selected is-related is-related-edge is-muted");
  if (selected.empty()) return;

  selected.addClass("is-selected");
  const related = selected.closedNeighborhood();
  related.edges().addClass("is-related-edge");
  graph.elements().not(related).not(selected).addClass("is-muted");
}

function renderRiskFilters() {
  const categories = ["Todos", ...new Set(threats.map((risk) => risk.category))];
  byId("riskFilters").innerHTML = categories
    .map(
      (category) => `
        <button class="risk-filter${category === selectedRiskCategory ? " is-active" : ""}" type="button" data-risk-filter="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  byId("riskFilters").querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRiskCategory = button.dataset.riskFilter;
      renderRiskFilters();
      renderRisks();
    });
  });
}

function renderRisks() {
  const risks = selectedRiskCategory === "Todos" ? threats : threats.filter((risk) => risk.category === selectedRiskCategory);
  byId("riskGrid").innerHTML = risks
    .map(
      (risk) => `
        <article class="risk-card">
          <header>
            <span>${risk.category}</span>
            <span>${risk.severity}</span>
          </header>
          <h3>${risk.title}</h3>
          <p>${risk.description}</p>
          <strong>${risk.impact}</strong>
          <div class="risk-meta" aria-label="Controles principales">
            ${risk.controls.slice(0, 3).map((control) => `<span>${control}</span>`).join("")}
          </div>
          <button class="button button-secondary" type="button" data-focus-node="${risk.id}">Ver en mapa</button>
        </article>
      `
    )
    .join("");

  byId("riskGrid").querySelectorAll("[data-focus-node]").forEach((button) => {
    button.addEventListener("click", () => {
      selectNode(button.dataset.focusNode);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      byId("mapa").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });
}

function renderLab() {
  const selections = ["dataProfile", "contextProfile", "actionProfile", "oversightProfile"].map((id) => {
    const value = byId(id).value;
    return labProfiles[id][value];
  });

  const score = Math.max(0, selections.reduce((total, item) => total + item.score, 0));
  const level =
    score <= 2
      ? { title: "Riesgo bajo", width: "25%" }
      : score <= 4
        ? { title: "Riesgo medio", width: "50%" }
        : score <= 6
          ? { title: "Riesgo alto", width: "75%" }
          : { title: "Riesgo crítico", width: "100%" };

  const labels = selections.map((item) => item.label);
  const controls = dedupeById(
    selections.flatMap((item) => item.controls.map((control) => ({ id: slug(control), text: control })))
  );

  byId("labLevel").textContent = level.title;
  byId("labSummary").textContent = `Caso con ${labels.join(", ")}.`;
  byId("labMeterFill").style.width = level.width;
  byId("labControls").innerHTML = controls.map((control) => `<li>${control.text}</li>`).join("");
}

function renderLifecycle() {
  byId("lifecycle").innerHTML = lifecycle
    .map(
      (item) => `
        <article class="lifecycle-card">
          <span>${item.stage}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
          <ul class="detail-list">
            ${item.controls.map((control) => `<li>${control}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderCompliance() {
  const active = complianceFrameworks.find((framework) => framework.id === selectedComplianceId) || complianceFrameworks[0];

  byId("complianceBoard").innerHTML = complianceFrameworks
    .map(
      (framework) => `
        <button class="compliance-card${framework.id === active.id ? " is-active" : ""}" type="button" data-compliance="${framework.id}">
          <header>
            <span>${framework.scope}</span>
            <span>${framework.tags[0]}</span>
          </header>
          <strong>${framework.title}</strong>
          <small>${framework.status}</small>
        </button>
      `
    )
    .join("");

  byId("complianceScope").textContent = active.scope;
  byId("complianceTitle").textContent = active.title;
  byId("complianceSummary").textContent = active.summary;
  byId("complianceObligations").innerHTML = active.obligations.map((obligation) => `<li>${obligation}</li>`).join("");
  byId("complianceTags").innerHTML = active.tags.map((tag) => `<span>${tag}</span>`).join("");
  byId("complianceSource").href = active.url;

  byId("complianceBoard").querySelectorAll("[data-compliance]").forEach((button) => {
    button.addEventListener("click", () => selectCompliance(button.dataset.compliance));
  });
}

function selectCompliance(frameworkId) {
  selectedComplianceId = frameworkId;
  renderCompliance();
  selectNode(`law-${frameworkId}`);
}

function renderChecklist() {
  const saved = JSON.parse(localStorage.getItem("basic-seguridad-ia-checklist") || "[]");
  byId("checklistItems").innerHTML = checklist
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" data-check="${index}" ${saved.includes(index) ? "checked" : ""}>
          <span><strong>${item}</strong></span>
        </label>
      `
    )
    .join("");

  byId("checklistItems").querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", updateChecklistProgress);
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checked = [...byId("checklistItems").querySelectorAll("input:checked")].map((input) => Number(input.dataset.check));
  localStorage.setItem("basic-seguridad-ia-checklist", JSON.stringify(checked));
  byId("checkProgress").textContent = `${checked.length} de ${checklist.length}`;
  byId("checkMessage").textContent =
    checked.length === checklist.length
      ? "Base revisada. Toca convertirla en pruebas y responsables."
      : checked.length >= 6
        ? "Buen avance. Faltan huecos que suelen aparecer en operación."
        : "Empieza por inventario, datos y permisos.";
}

function renderQuiz() {
  const current = quiz[quizIndex];
  answered = false;
  byId("quizCard").innerHTML = `
    <div class="quiz-meta">
      <span>Pregunta ${quizIndex + 1} de ${quiz.length}</span>
      <span>${quizScore} aciertos</span>
    </div>
    <h3>${current.question}</h3>
    <div class="quiz-options">
      ${current.options.map((option) => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`).join("")}
    </div>
    <p class="quiz-feedback" id="quizFeedback">Elige una respuesta.</p>
    <button class="button button-primary" type="button" id="nextQuestion" disabled>Siguiente</button>
  `;

  byId("quizCard").querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => answerQuiz(button.dataset.answer));
  });

  byId("nextQuestion").addEventListener("click", () => {
    quizIndex = (quizIndex + 1) % quiz.length;
    if (quizIndex === 0) quizScore = 0;
    renderQuiz();
  });
}

function answerQuiz(answer) {
  if (answered) return;
  answered = true;
  const current = quiz[quizIndex];
  const correct = answer === current.answer;
  if (correct) quizScore += 1;

  byId("quizCard").querySelectorAll("[data-answer]").forEach((button) => {
    const value = button.dataset.answer;
    button.disabled = true;
    button.classList.toggle("is-correct", value === current.answer);
    button.classList.toggle("is-wrong", value === answer && !correct);
  });

  byId("quizFeedback").textContent = `${correct ? "Correcto." : "No exactamente."} ${current.reason}`;
  byId("nextQuestion").disabled = false;
}

function renderReferenceFilters() {
  const categories = ["Todas", ...new Set(references.map((reference) => reference.category))];
  byId("referenceFilters").innerHTML = categories
    .map(
      (category) => `
        <button class="reference-filter${category === selectedReferenceCategory ? " is-active" : ""}" type="button" data-reference-filter="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  byId("referenceFilters").querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedReferenceCategory = button.dataset.referenceFilter;
      renderReferenceFilters();
      renderReferences();
    });
  });
}

function renderReferences() {
  const query = byId("referenceSearch").value.trim().toLowerCase();
  const filtered = references.filter((reference) => {
    const matchesCategory = selectedReferenceCategory === "Todas" || reference.category === selectedReferenceCategory;
    const haystack = `${reference.title} ${reference.category} ${reference.organization} ${reference.summary}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });

  byId("referenceGrid").innerHTML =
    filtered.length > 0
      ? filtered
          .map(
            (reference) => `
              <article class="reference-card">
                <header>
                  <span>${reference.category}</span>
                  <span>${reference.organization}</span>
                </header>
                <h3>${reference.title}</h3>
                <p>${reference.summary}</p>
                <div class="reference-links">
                  <a href="${reference.url}" target="_blank" rel="noreferrer">Abrir fuente</a>
                </div>
              </article>
            `
          )
          .join("")
      : '<p class="empty-state">No hay referencias para ese filtro.</p>';
}

function setupTheme() {
  const toggle = byId("themeToggle");
  const saved = localStorage.getItem("basic-seguridad-ia-theme");
  if (saved) document.documentElement.dataset.theme = saved;

  const syncToggle = () => {
    const explicit = document.documentElement.dataset.theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = explicit ? explicit === "dark" : prefersDark;
    toggle.setAttribute("aria-pressed", String(dark));
  };

  toggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = current ? (current === "dark" ? "light" : "dark") : prefersDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("basic-seguridad-ia-theme", next);
    syncToggle();
    renderGraph();
  });

  syncToggle();
}

function setupReveal() {
  const sections = document.querySelectorAll(".section-reveal");
  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupEvents() {
  ["dataProfile", "contextProfile", "actionProfile", "oversightProfile"].forEach((id) => {
    byId(id).addEventListener("change", renderLab);
  });

  byId("referenceSearch").addEventListener("input", renderReferences);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      if (!graph) return;
      graph.resize();
      graph.fit(graph.elements(), 34);
    });
    observer.observe(byId("conceptMap"));
  }
}

function init() {
  renderGraph();
  renderRiskFilters();
  renderRisks();
  renderLab();
  renderLifecycle();
  renderCompliance();
  renderChecklist();
  renderQuiz();
  renderReferenceFilters();
  renderReferences();
  setupTheme();
  setupReveal();
  setupEvents();
}

document.addEventListener("DOMContentLoaded", init);

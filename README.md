# Basic Seguridad IA

Proyecto educativo interactivo para aprender seguridad básica en sistemas de inteligencia artificial. Está pensado para estudiantes de ciberseguridad, desarrollo, datos y administración que quieren entender riesgos reales sin montar infraestructura de pago.

## Publicación

- Repositorio sugerido: https://github.com/pedri77/Basic_Seguridad_IA
- GitHub Pages sugerido: https://pedri77.github.io/Basic_Seguridad_IA/
- Tipo: app estática HTML, CSS y JavaScript plano
- Rama de publicación: `main`
- Carpeta de publicación: raíz del repositorio

## Estructura

```text
Basic_Seguridad_IA/
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    └── ai-security-system-map.png
```

## Contenido educativo

- Hero visual sobre componentes de un sistema IA.
- Mapa interactivo con Cytoscape.js sobre activos, amenazas, controles y referencias.
- Filtros de riesgos por entrada, datos, RAG, agentes, aplicación, operación y gobernanza.
- Laboratorio de exposición para valorar un caso según datos, contexto, acciones y supervisión.
- Controles por ciclo de vida: gobernanza, datos, diseño, construcción, despliegue y operación.
- Checklist mínima persistente en el navegador.
- Quiz autocorregido con explicación inmediata.
- Glosario esencial y referencias oficiales.

## Uso local

Abre `index.html` directamente en el navegador. No necesita `npm install`, backend, base de datos ni paso de build.

Opcionalmente:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## Dependencia de navegador

El mapa interactivo carga Cytoscape.js desde jsDelivr con versión fijada:

```html
https://cdn.jsdelivr.net/npm/cytoscape@3.34.1/dist/cytoscape.min.js
```

Si más adelante quieres funcionamiento totalmente offline, descarga ese archivo en `vendor/` y cambia la etiqueta `<script>`.

## Publicación en GitHub Pages

Desde esta carpeta:

```bash
git init -b main
git add .
git commit -m "Crear Basic Seguridad IA"
git remote add origin https://github.com/pedri77/Basic_Seguridad_IA.git
git push -u origin main
```

En GitHub:

1. Abre `pedri77/Basic_Seguridad_IA`.
2. Entra en `Settings`.
3. Abre `Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona `main` y carpeta `/root`.
6. Guarda los cambios.

## Referencias principales

- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI 600-1, Generative AI Profile: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- OWASP GenAI LLM Top 10 2026: https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/
- OWASP AISVS 1.0: https://owasp.org/www-project-artificial-intelligence-security-verification-standard-aisvs-docs/
- MITRE ATLAS: https://atlas.mitre.org/
- Guidelines for Secure AI System Development: https://www.cisa.gov/news-events/alerts/2023/11/26/cisa-and-uk-ncsc-unveil-joint-guidelines-secure-ai-system-development
- ISO/IEC 42001:2023: https://www.iso.org/es/norma/42001
- NIST SP 800-218 SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- OWASP Top 10:2025: https://owasp.org/Top10/

## Ficha de ejecución

- Fecha de creación local: 2026-08-31
- Tema: seguridad básica en inteligencia artificial
- Público objetivo: estudiantes y perfiles técnicos junior
- Paleta visual: `#2b2d42`, `#8d99ae`, `#edf2f4`, `#ef233c`, `#d90429`
- Validación local: `node --check script.js` y HTTP `200 OK` para HTML, CSS, JS e imagen

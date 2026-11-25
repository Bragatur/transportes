/**
 * Feature: Multilingual Translations & Legal Content Dictionary
 *
 * Stores all user-facing strings for the "Mobilidade em Braga" portal across
 * four languages: Portuguese (pt), English (en), Spanish (es), and French (fr).
 * Covers the document title, meta description, hero header, segmented tabs,
 * instant search placeholders and empty states, accordion headings, contextual
 * travel tips, service card labels and subtitles, footer labels, accessibility
 * aria-labels, and the complete GDPR / Privacy Policy modal.
 *
 * Use cases:
 * - Switching the entire UI seamlessly between PT, EN, ES, and FR.
 * - Giving international tourists clear subtitles explaining local services.
 * - Translating search prompts, empty states, and legal notices consistently.
 */

export const TRANSLATIONS = {
  pt: {
    pageTitle: 'Mobilidade em Braga — Visit Braga',
    metaDescription: 'Planeie a sua viagem para Braga e desloque-se facilmente na cidade: comboios, autocarros, portagens, aeroporto, TUB, táxis, estacionamento e Bom Jesus.',
    title: 'Mobilidade em Braga',
    description: 'Planeie a sua viagem e desloque-se na cidade:',
    btnArrive: 'Viajar para Braga',
    btnArriveSub: 'Comboios, autocarros, carro e aeroporto',
    btnAround: 'Na Cidade',
    btnAroundSub: 'TUB, táxis, estacionamento e Bom Jesus',
    tabArrive: 'Viajar para Braga',
    tabAround: 'Na Cidade',
    labelBack: 'Início',
    brandHomeAria: 'Voltar ao ecrã inicial — Visit Braga',
    searchPlaceholder: 'Procurar: portagens, aeroporto, Bom Jesus, táxi...',
    searchAriaLabel: 'Procurar serviços de mobilidade',
    searchClearAria: 'Limpar pesquisa',
    searchEmptyText: 'Nenhum serviço encontrado nesta secção.',
    searchSwitchBtn: 'Ver resultados na outra secção',
    langAriaLabel: 'Alterar idioma',
    externalLinkTitle: 'Abre num novo separador',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Comboios",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autocarros",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Automóvel",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avião",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Rent-a-Car",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Viagens Partilhadas",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transportes Públicos",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Táxis e TVDE",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Estacionamento",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Postos de Carregamento",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Postos de Combustível",

    // Contextual tips
    tipCar: 'As autoestradas de acesso a Braga (A3/A11) incluem portagens manuais e eletrónicas. Registe a matrícula se conduzir um veículo estrangeiro.',
    tipPlane: 'O Aeroporto do Porto (OPO) fica a cerca de 45 min de Braga, com ligação direta de autocarro (GetBus) ou comboio (CP).',
    tipSanctuaries: 'A Linha 2 dos TUB liga o centro ao Elevador do Bom Jesus; a Linha 88 continua até ao Santuário do Sameiro.',

    // Card titles
    cp: 'CP - Comboios',
    cctb: 'Centro Coordenador',
    re: 'Rede Expressos',
    flix: 'FlixBus',
    get: 'GetBus (Aeroporto)',
    cavado: 'Cávado Mobilidade',
    ave: 'AVE Mobilidade',
    tolls: 'PT Tolls',
    viaverde: 'Via Verde Go Toll',
    tollsFines: 'Portagens em Falta',
    directionsBraga: 'Direções para Braga',
    ana: 'Aeroporto do Porto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Carros)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Autocarros Urbanos)',
    bomJesusElevator: 'Elevador do Bom Jesus',
    bomJesusTransit: 'Autocarro para o Bom Jesus',
    sameiroTransit: 'Autocarro para o Sameiro',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Estacionamento (Automóvel)',
    parkingBike: 'Estacionamento (Bicicletas)',
    mobie: 'Rede Mobi.e',
    electromaps: 'Electromaps',
    tesla: 'Tesla',
    plugshare: 'PlugShare',
    chargemap: 'Charge Map',
    opencharge: 'Open Charge',
    dgeg: 'DGEG (Combustível)',
    maisgasolina: 'Mais Gasolina',
    googleGas: 'Google Maps (Braga)',

    // Card subtitles
    subCp: 'Comboios urbanos (Porto) e Alfa Pendular',
    subCctb: 'Terminal rodoviário central de Braga',
    subRe: 'Ligações nacionais de longo curso',
    subFlix: 'Rotas nacionais e internacionais',
    subGet: 'Ligação direta Aeroporto do Porto ↔ Braga',
    subCavado: 'Autocarros intermunicipais da região do Cávado',
    subAve: 'Autocarros intermunicipais da região do Ave',
    subTolls: 'Guia e adesão a portagens eletrónicas',
    subViaverde: 'Pagamento de portagens para visitantes',
    subTollsFines: 'Consulta e regularização de portagens',
    subDirectionsBraga: 'Traçar rota de carro no Google Maps',
    subAna: 'Informações de voos e acessos (OPO)',
    subSkyscanner: 'Comparador de voos para o Porto',
    subGoogleFlights: 'Pesquisa de tarifas e horários de voos',
    subRentalcars: 'Comparador de aluguer de automóveis',
    subKayak: 'Pesquisa de rent-a-car em Portugal',
    subBlablacar: 'Boleias partilhadas entre cidades',
    subTub: 'Rede municipal de autocarros de Braga',
    subBomJesusElevator: 'Funicular histórico movido a água',
    subBomJesusTransit: 'TUB Linha 2 · Rotas em tempo real',
    subSameiroTransit: 'TUB Linha 88 · Rotas em tempo real',
    subBragataxis: 'Central de táxis 24h em Braga',
    subTaxisbraga: 'Serviço local de táxis e transfers',
    subEconomicotaxis: 'Táxis em Braga e transfer aeroporto',
    subUber: 'Transporte privado via aplicação',
    subBolt: 'Transporte privado via aplicação',
    subParkingCar: 'Parques de estacionamento em Braga',
    subParkingBike: 'Mapa de estacionamento ciclável',
    subMobie: 'Rede pública nacional de carregamento',
    subElectromaps: 'Mapa de carregadores e estado em direto',
    subTesla: 'Superchargers e carregadores Tesla',
    subPlugshare: 'Comunidade e mapa global de carregadores',
    subChargemap: 'Planeador de rotas para veículos elétricos',
    subOpencharge: 'Diretório aberto de pontos de carga',
    subDgeg: 'Comparador oficial de preços de combustível',
    subMaisgasolina: 'Postos e preços atualizados em Portugal',
    subGoogleGas: 'Postos de combustível mais próximos em Braga',

    // Footer & Privacy Modal
    footerCopyright: '© 2026 Posto de Turismo - DAET | CM Braga',
    footerContacts: 'CONTACTOS',
    footerAddress: 'Posto de Turismo de Braga | Avenida da Liberdade, nº 1 - 4710-305 Braga',
    footerPrivacy: 'Política de Privacidade',
    modalTitle: 'Avisos Legais e Política de Privacidade',
    modalClose: 'Compreendi e Fechar',
    privacyBodyHtml: `
      <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> 1. Titularidade e Identificação da Entidade</h3>
      <p>Este portal digital de divulgação turística e mobilidade é disponibilizado e gerido pelo Município de Braga, pessoa coletiva de direito público com NIF 506 901 495 e sede na Praça do Município, 4700-435 Braga, através da Divisão de Turismo (DAET) com Posto de Turismo sito na Avenida da Liberdade, nº 1, 4710-305 Braga.</p>

      <h3><i class="fa-solid fa-copyright" aria-hidden="true"></i> 2. Propriedade Intelectual e Direitos de Autor</h3>
      <p>Todos os conteúdos disponibilizados nesta plataforma — incluindo textos, imagens, mapas, marcas (“Visit Braga”), logótipos e elementos gráficos — encontram-se protegidos pela legislação de Direitos de Autor e Direitos Conexos e de Propriedade Industrial.</p>
      <p>A visualização e utilização dos materiais são autorizadas exclusivamente para fins pessoais, educativos ou turísticos não comerciais. É proibida qualquer reprodução, alteração, redistribuição ou exploração comercial sem autorização prévia escrita do Município de Braga.</p>

      <h3><i class="fa-solid fa-user-shield" aria-hidden="true"></i> 3. Tratamento de Dados Pessoais (RGPD)</h3>
      <p>O Município de Braga assegura o rigoroso cumprimento do Regulamento Geral sobre a Proteção de Dados (Regulamento UE 2016/679) e da Lei n.º 58/2019, de 8 de agosto:</p>
      <ul>
        <li><strong>Finalidade e Minimização:</strong> O presente website tem cariz estritamente informativo e de promoção turística, não requerendo registo de utilizador nem recolhendo dados pessoais de identificação direta.</li>
        <li><strong>Dados de Acesso Técnico:</strong> Os dados técnicos de navegação (endereço IP e registos de servidor) são tratados sob o fundamento do interesse legítimo na garantia da segurança e integridade do serviço.</li>
        <li><strong>Segurança:</strong> Não partilhamos, vendemos ou cedemos dados a terceiros para efeitos de publicidade ou marketing.</li>
      </ul>

      <h3><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> 4. Lei dos Cookies e Armazenamento Local</h3>
      <p>Nos termos da Lei n.º 41/2004, com as alterações introduzidas pela Lei n.º 46/2012 (transposição da Diretiva de Privacidade Eletrónica da UE):</p>
      <ul>
        <li><strong>Armazenamento Estritamente Necessário:</strong> Utilizamos apenas armazenamento local essencial no seu dispositivo (LocalStorage) para reter a preferência do idioma selecionado.</li>
        <li><strong>Sem Rastreio ou Cookies de Terceiros:</strong> Não utilizamos cookies analíticos invasivos, píxeis de conversão de redes sociais nem cookies de publicidade comportamental.</li>
        <li><strong>Gestão de Preferências:</strong> Pode a qualquer momento bloquear ou eliminar dados armazenados através das definições do seu navegador.</li>
      </ul>

      <h3><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> 5. Direitos dos Titulares dos Dados</h3>
      <p>O titular dos dados tem o direito de solicitar o acesso, retificação, oposição, limitação e apagamento de dados, nos termos legais aplicáveis, podendo também reclamar junto da CNPD – Comissão Nacional de Proteção de Dados (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).</p>

      <h3><i class="fa-solid fa-address-card" aria-hidden="true"></i> 6. Contactos Oficiais e Encarregado de Proteção de Dados</h3>
      <p>Para dúvidas, esclarecimentos ou exercício dos seus direitos de privacidade:</p>
      <ul>
        <li><strong>Encarregado de Proteção de Dados (DPO):</strong> <a href="mailto:dpo@cm-braga.pt">dpo@cm-braga.pt</a></li>
        <li><strong>Posto de Turismo de Braga:</strong> Av. da Liberdade, nº 1, 4710-305 Braga | Tel: +351 253 262 550 | <a href="mailto:turismo@cm-braga.pt">turismo@cm-braga.pt</a></li>
        <li><strong>Câmara Municipal de Braga (Sede):</strong> Praça do Município, 4700-435 Braga | Tel: +351 253 616 060 | <a href="mailto:municipe@cm-braga.pt">municipe@cm-braga.pt</a></li>
      </ul>
      <p>Consulte a versão integral dos avisos legais do Município em: <a href="https://cm-braga.pt/pt/0107/avisos-legais" target="_blank" rel="noopener noreferrer">cm-braga.pt/pt/0107/avisos-legais</a></p>
    `
  },

  en: {
    pageTitle: 'Mobility in Braga — Visit Braga',
    metaDescription: 'Plan your trip to Braga and get around the city effortlessly: trains, buses, highway tolls, Porto Airport links, urban buses (TUB), taxis, parking, and Bom Jesus.',
    title: 'Mobility in Braga',
    description: 'Plan your trip and get around the city:',
    btnArrive: 'Travel to Braga',
    btnArriveSub: 'Trains, buses, driving & airport links',
    btnAround: 'Getting Around',
    btnAroundSub: 'Urban buses, taxis, parking & Bom Jesus',
    tabArrive: 'Travel to Braga',
    tabAround: 'Getting Around',
    labelBack: 'Home',
    brandHomeAria: 'Return to home screen — Visit Braga',
    searchPlaceholder: 'Search: tolls, airport, Bom Jesus, taxi...',
    searchAriaLabel: 'Search mobility services',
    searchClearAria: 'Clear search',
    searchEmptyText: 'No services found in this section.',
    searchSwitchBtn: 'See results in the other section',
    langAriaLabel: 'Change language',
    externalLinkTitle: 'Opens in a new tab',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trains",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Buses",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Car",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Airplane",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Rent-a-Car",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Carpooling",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Public Transport",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis & Ride-Hailing",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Parking",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> EV Charging Stations",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Fuel Stations",

    // Contextual tips
    tipCar: 'Highways leading to Braga (A3/A11) use both manual and electronic tolls. Register your license plate if driving a foreign-registered vehicle.',
    tipPlane: 'Porto Airport (OPO) is about 45 min from Braga, with direct bus shuttles (GetBus) and rail connections (CP).',
    tipSanctuaries: 'TUB Bus Line 2 connects the city center to the Bom Jesus Funicular; Line 88 continues up to the Sameiro Sanctuary.',

    // Card titles
    cp: 'CP - Trains',
    cctb: 'Bus Terminal',
    re: 'Rede Expressos',
    flix: 'FlixBus',
    get: 'GetBus (Airport)',
    cavado: 'Cávado Mobilidade',
    ave: 'AVE Mobilidade',
    tolls: 'PT Tolls',
    viaverde: 'Via Verde Go Toll',
    tollsFines: 'Unpaid Tolls',
    directionsBraga: 'Directions to Braga',
    ana: 'Porto Airport',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Cars)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Urban Buses)',
    bomJesusElevator: 'Bom Jesus Funicular',
    bomJesusTransit: 'Bus to Bom Jesus',
    sameiroTransit: 'Bus to Sameiro',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Car Parking',
    parkingBike: 'Bicycle Parking',
    mobie: 'Rede Mobi.e',
    electromaps: 'Electromaps',
    tesla: 'Tesla',
    plugshare: 'PlugShare',
    chargemap: 'Charge Map',
    opencharge: 'Open Charge',
    dgeg: 'DGEG (Fuel)',
    maisgasolina: 'Mais Gasolina',
    googleGas: 'Google Maps (Braga)',

    // Card subtitles
    subCp: 'Porto urban trains & Alfa Pendular',
    subCctb: 'Braga central bus station & schedules',
    subRe: 'National long-distance coach network',
    subFlix: 'National and European coach routes',
    subGet: 'Direct shuttle Porto Airport ↔ Braga',
    subCavado: 'Regional buses across the Cávado area',
    subAve: 'Regional buses across the Ave area',
    subTolls: 'Guide & electronic toll registration',
    subViaverde: 'Visitor toll payment solution',
    subTollsFines: 'Check and pay pending electronic tolls',
    subDirectionsBraga: 'Plan your driving route on Google Maps',
    subAna: 'Flight information & airport access (OPO)',
    subSkyscanner: 'Compare flights to Porto Airport',
    subGoogleFlights: 'Search airfares and flight schedules',
    subRentalcars: 'Compare car rental providers',
    subKayak: 'Search car rentals across Portugal',
    subBlablacar: 'Intercity carpooling rides',
    subTub: 'Braga municipal urban bus network',
    subBomJesusElevator: 'Historic water-powered funicular',
    subBomJesusTransit: 'TUB Line 2 · Live transit directions',
    subSameiroTransit: 'TUB Line 88 · Live transit directions',
    subBragataxis: '24/7 local taxi dispatch in Braga',
    subTaxisbraga: 'Local taxis and private transfers',
    subEconomicotaxis: 'Braga taxis and airport transfers',
    subUber: 'On-demand rides via mobile app',
    subBolt: 'On-demand rides via mobile app',
    subParkingCar: 'Public car parks across Braga',
    subParkingBike: 'City bicycle parking locations map',
    subMobie: 'Portugal national EV charging network',
    subElectromaps: 'Live charger map and availability',
    subTesla: 'Tesla Superchargers & destination chargers',
    subPlugshare: 'Global EV charging community map',
    subChargemap: 'EV route planner and charging stations',
    subOpencharge: 'Open directory of EV charging points',
    subDgeg: 'Official Portuguese fuel price comparator',
    subMaisgasolina: 'Updated fuel stations and prices',
    subGoogleGas: 'Nearest gas stations around Braga',

    // Footer & Privacy Modal
    footerCopyright: '© 2026 Tourist Office - DAET | CM Braga',
    footerContacts: 'CONTACTS',
    footerAddress: 'Braga Tourist Office | Avenida da Liberdade, nº 1 - 4710-305 Braga',
    footerPrivacy: 'Privacy Policy',
    modalTitle: 'Legal Notice & Privacy Policy',
    modalClose: 'Got it & Close',
    privacyBodyHtml: `
      <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> 1. Ownership & Entity Identification</h3>
      <p>This digital tourism and mobility portal is provided and managed by the Municipality of Braga (Tax ID 506 901 495), headquartered at Praça do Município, 4700-435 Braga, through its Tourism Division (DAET) and Tourist Office at Avenida da Liberdade, nº 1, 4710-305 Braga.</p>

      <h3><i class="fa-solid fa-copyright" aria-hidden="true"></i> 2. Intellectual Property & Copyright</h3>
      <p>All content available on this platform — including texts, photography, maps, trademarks (“Visit Braga”), logos, and graphic assets — is protected under Copyright and Industrial Property legislation.</p>
      <p>Viewing and using these materials is authorized strictly for personal, educational, or non-commercial tourist purposes. Reproduction, modification, redistribution, or commercial exploitation without prior written consent from the Municipality of Braga is prohibited.</p>

      <h3><i class="fa-solid fa-user-shield" aria-hidden="true"></i> 3. Personal Data Processing (GDPR)</h3>
      <p>The Municipality of Braga ensures strict compliance with the General Data Protection Regulation (EU Regulation 2016/679) and Portuguese Law No. 58/2019:</p>
      <ul>
        <li><strong>Purpose & Minimization:</strong> This website is purely informational and promotional; it requires no user registration and collects no directly identifiable personal data.</li>
        <li><strong>Technical Access Logs:</strong> Technical browsing data (IP address and server logs) is processed under legitimate interest solely to ensure service security and integrity.</li>
        <li><strong>Security:</strong> We do not share, sell, or transfer data to third parties for advertising or marketing purposes.</li>
      </ul>

      <h3><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> 4. Cookies & Local Storage</h3>
      <p>In accordance with Portuguese Law No. 41/2004, as amended by Law No. 46/2012 (transposing the EU ePrivacy Directive):</p>
      <ul>
        <li><strong>Strictly Necessary Storage:</strong> We only use essential browser storage (LocalStorage) on your device to remember your chosen display language.</li>
        <li><strong>No Third-Party Tracking:</strong> We do not deploy invasive analytics cookies, social media tracking pixels, or behavioral advertising cookies.</li>
        <li><strong>Managing Preferences:</strong> You may clear or block stored browser data at any time in your browser settings.</li>
      </ul>

      <h3><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> 5. Data Subject Rights</h3>
      <p>You have the right to request access, rectification, objection, restriction, and erasure of personal data under applicable law, as well as the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD — <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).</p>

      <h3><i class="fa-solid fa-address-card" aria-hidden="true"></i> 6. Official Contacts & Data Protection Officer</h3>
      <p>For questions, clarifications, or to exercise your privacy rights:</p>
      <ul>
        <li><strong>Data Protection Officer (DPO):</strong> <a href="mailto:dpo@cm-braga.pt">dpo@cm-braga.pt</a></li>
        <li><strong>Braga Tourist Office:</strong> Av. da Liberdade, nº 1, 4710-305 Braga | Tel: +351 253 262 550 | <a href="mailto:turismo@cm-braga.pt">turismo@cm-braga.pt</a></li>
        <li><strong>Municipality of Braga (Headquarters):</strong> Praça do Município, 4700-435 Braga | Tel: +351 253 616 060 | <a href="mailto:municipe@cm-braga.pt">municipe@cm-braga.pt</a></li>
      </ul>
      <p>Read the full municipal legal notice at: <a href="https://cm-braga.pt/pt/0107/avisos-legais" target="_blank" rel="noopener noreferrer">cm-braga.pt/pt/0107/avisos-legais</a></p>
    `
  },

  es: {
    pageTitle: 'Movilidad en Braga — Visit Braga',
    metaDescription: 'Planifique su viaje a Braga y muévase por la ciudad: trenes, autobuses, peajes, aeropuerto de Oporto, autobuses urbanos (TUB), taxis, aparcamiento y Bom Jesus.',
    title: 'Movilidad en Braga',
    description: 'Planifique su viaje y muévase por la ciudad:',
    btnArrive: 'Viajar a Braga',
    btnArriveSub: 'Trenes, autobuses, coche y aeropuerto',
    btnAround: 'En la Ciudad',
    btnAroundSub: 'TUB, taxis, aparcamiento y Bom Jesus',
    tabArrive: 'Viajar a Braga',
    tabAround: 'En la Ciudad',
    labelBack: 'Inicio',
    brandHomeAria: 'Volver a la pantalla de inicio — Visit Braga',
    searchPlaceholder: 'Buscar: peajes, aeropuerto, Bom Jesus, taxi...',
    searchAriaLabel: 'Buscar servicios de movilidad',
    searchClearAria: 'Limpiar búsqueda',
    searchEmptyText: 'No se encontraron servicios en esta sección.',
    searchSwitchBtn: 'Ver resultados en la otra sección',
    langAriaLabel: 'Cambiar idioma',
    externalLinkTitle: 'Se abre en una nueva pestaña',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trenes",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autobuses",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Coche",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avión",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Alquiler de Coches",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Viajes Compartidos",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transporte Público",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus y Sameiro",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis y VTC",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Aparcamiento",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Estaciones de Carga",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Estaciones de Servicio",

    // Contextual tips
    tipCar: 'Las autopistas de acceso a Braga (A3/A11) cuentan con peajes manuales y electrónicos. Registre su matrícula si conduce un vehículo extranjero.',
    tipPlane: 'El Aeropuerto de Oporto (OPO) está a unos 45 min de Braga, con conexión directa en autobús (GetBus) o tren (CP).',
    tipSanctuaries: 'La Línea 2 de TUB conecta el centro con el Funicular de Bom Jesus; la Línea 88 sube hasta el Santuario de Sameiro.',

    // Card titles
    cp: 'CP - Trenes',
    cctb: 'Estación Central',
    re: 'Rede Expressos',
    flix: 'FlixBus',
    get: 'GetBus (Aeropuerto)',
    cavado: 'Cávado Mobilidade',
    ave: 'AVE Mobilidade',
    tolls: 'PT Tolls',
    viaverde: 'Via Verde Go Toll',
    tollsFines: 'Peajes Pendientes',
    directionsBraga: 'Direcciones a Braga',
    ana: 'Aeropuerto de Oporto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Coches)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Autobuses Urbanos)',
    bomJesusElevator: 'Elevador de Bom Jesus',
    bomJesusTransit: 'Autobús a Bom Jesus',
    sameiroTransit: 'Autobús al Sameiro',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Aparcamiento (Coches)',
    parkingBike: 'Aparcamiento (Bicicletas)',
    mobie: 'Rede Mobi.e',
    electromaps: 'Electromaps',
    tesla: 'Tesla',
    plugshare: 'PlugShare',
    chargemap: 'Charge Map',
    opencharge: 'Open Charge',
    dgeg: 'DGEG (Combustible)',
    maisgasolina: 'Mais Gasolina',
    googleGas: 'Google Maps (Braga)',

    // Card subtitles
    subCp: 'Trenes urbanos (Oporto) y Alfa Pendular',
    subCctb: 'Terminal central de autobuses de Braga',
    subRe: 'Red nacional de autobuses de larga distancia',
    subFlix: 'Rutas nacionales e internacionales',
    subGet: 'Conexión directa Aeropuerto de Oporto ↔ Braga',
    subCavado: 'Autobuses interurbanos de la región del Cávado',
    subAve: 'Autobuses interurbanos de la región del Ave',
    subTolls: 'Guía y registro de peajes electrónicos',
    subViaverde: 'Pago de peajes para visitantes extranjeros',
    subTollsFines: 'Consulta y pago de peajes pendientes',
    subDirectionsBraga: 'Trazar ruta en coche con Google Maps',
    subAna: 'Información de vuelos y accesos (OPO)',
    subSkyscanner: 'Comparador de vuelos hacia Oporto',
    subGoogleFlights: 'Búsqueda de tarifas y horarios de vuelos',
    subRentalcars: 'Comparador de alquiler de vehículos',
    subKayak: 'Búsqueda de coches de alquiler en Portugal',
    subBlablacar: 'Viajes compartidos entre ciudades',
    subTub: 'Red municipal de autobuses de Braga',
    subBomJesusElevator: 'Funicular histórico impulsado por agua',
    subBomJesusTransit: 'TUB Línea 2 · Rutas en tiempo real',
    subSameiroTransit: 'TUB Línea 88 · Rutas en tiempo real',
    subBragataxis: 'Central de taxis 24h en Braga',
    subTaxisbraga: 'Servicio local de taxis y traslados',
    subEconomicotaxis: 'Taxis en Braga y traslado al aeropuerto',
    subUber: 'Transporte privado mediante aplicación',
    subBolt: 'Transporte privado mediante aplicación',
    subParkingCar: 'Aparcamientos públicos en Braga',
    subParkingBike: 'Mapa de aparcamiento para bicicletas',
    subMobie: 'Red pública nacional de carga eléctrica',
    subElectromaps: 'Mapa de cargadores y estado en directo',
    subTesla: 'Supercargadores y cargadores Tesla',
    subPlugshare: 'Comunidad y mapa global de cargadores',
    subChargemap: 'Planificador de rutas para coches eléctricos',
    subOpencharge: 'Directorio abierto de puntos de carga',
    subDgeg: 'Comparador oficial de precios de combustible',
    subMaisgasolina: 'Gasolineras y precios actualizados en Portugal',
    subGoogleGas: 'Estaciones de servicio cercanas en Braga',

    // Footer & Privacy Modal
    footerCopyright: '© 2026 Oficina de Turismo - DAET | CM Braga',
    footerContacts: 'CONTACTOS',
    footerAddress: 'Oficina de Turismo de Braga | Avenida da Liberdade, nº 1 - 4710-305 Braga',
    footerPrivacy: 'Política de Privacidad',
    modalTitle: 'Avisos Legales y Política de Privacidad',
    modalClose: 'Entendido y Cerrar',
    privacyBodyHtml: `
      <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> 1. Titularidad e Identificación de la Entidad</h3>
      <p>Este portal digital de divulgación turística y movilidad es gestionado por el Municipio de Braga (NIF 506 901 495), con sede en Praça do Município, 4700-435 Braga, a través de la División de Turismo (DAET) y su Oficina de Turismo en Avenida da Liberdade, nº 1, 4710-305 Braga.</p>

      <h3><i class="fa-solid fa-copyright" aria-hidden="true"></i> 2. Propiedad Intelectual y Derechos de Autor</h3>
      <p>Todos los contenidos disponibles en esta plataforma — incluidos textos, imágenes, mapas, marcas (“Visit Braga”), logotipos y elementos gráficos — están protegidos por la legislación de Propiedad Intelectual e Industrial.</p>
      <p>Su visualización y uso están autorizados únicamente con fines personales, educativos o turísticos no comerciales. Queda prohibida la reproducción, modificación o explotación comercial sin autorización previa por escrito del Municipio de Braga.</p>

      <h3><i class="fa-solid fa-user-shield" aria-hidden="true"></i> 3. Tratamiento de Datos Personales (RGPD)</h3>
      <p>El Municipio de Braga garantiza el cumplimiento estricto del Reglamento General de Protección de Datos (Reglamento UE 2016/679) y de la Ley portuguesa n.º 58/2019:</p>
      <ul>
        <li><strong>Finalidad y Minimización:</strong> Este sitio web tiene carácter estrictamente informativo y turístico; no requiere registro de usuarios ni recoge datos personales de identificación directa.</li>
        <li><strong>Datos Técnicos de Acceso:</strong> Los registros técnicos de navegación (dirección IP y logs de servidor) se tratan por interés legítimo para garantizar la seguridad e integridad del servicio.</li>
        <li><strong>Seguridad:</strong> No compartimos, vendemos ni cedemos datos a terceros con fines publicitarios o de marketing.</li>
      </ul>

      <h3><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> 4. Cookies y Almacenamiento Local</h3>
      <p>De conformidad con la Ley n.º 41/2004, modificada por la Ley n.º 46/2012 (transposición de la Directiva de Privacidad Electrónica de la UE):</p>
      <ul>
        <li><strong>Almacenamiento Estrictamente Necesario:</strong> Utilizamos únicamente almacenamiento local esencial (LocalStorage) en su dispositivo para recordar el idioma seleccionado.</li>
        <li><strong>Sin Rastreo ni Cookies de Terceros:</strong> No empleamos cookies analíticas invasivas, píxeles de redes sociales ni cookies de publicidad comportamental.</li>
        <li><strong>Gestión de Preferencias:</strong> Puede bloquear o eliminar los datos almacenados en cualquier momento desde la configuración de su navegador.</li>
      </ul>

      <h3><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> 5. Derechos de los Titulares de los Datos</h3>
      <p>Tiene derecho a solicitar el acceso, rectificación, oposición, limitación y supresión de sus datos conforme a la normativa aplicable, así como a presentar una reclamación ante la autoridad nacional de control: CNPD (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).</p>

      <h3><i class="fa-solid fa-address-card" aria-hidden="true"></i> 6. Contactos Oficiales y Delegado de Protección de Datos</h3>
      <p>Para consultas o ejercicio de sus derechos de privacidad:</p>
      <ul>
        <li><strong>Delegado de Protección de Datos (DPO):</strong> <a href="mailto:dpo@cm-braga.pt">dpo@cm-braga.pt</a></li>
        <li><strong>Oficina de Turismo de Braga:</strong> Av. da Liberdade, nº 1, 4710-305 Braga | Tel: +351 253 262 550 | <a href="mailto:turismo@cm-braga.pt">turismo@cm-braga.pt</a></li>
        <li><strong>Ayuntamiento de Braga (Sede):</strong> Praça do Município, 4700-435 Braga | Tel: +351 253 616 060 | <a href="mailto:municipe@cm-braga.pt">municipe@cm-braga.pt</a></li>
      </ul>
      <p>Consulte la versión íntegra de los avisos legales del Municipio en: <a href="https://cm-braga.pt/pt/0107/avisos-legais" target="_blank" rel="noopener noreferrer">cm-braga.pt/pt/0107/avisos-legais</a></p>
    `
  },

  fr: {
    pageTitle: 'Mobilité à Braga — Visit Braga',
    metaDescription: 'Planifiez votre voyage vers Braga et déplacez-vous facilement en ville : trains, autocars, péages, aéroport de Porto, bus urbains (TUB), taxis, parking et Bom Jesus.',
    title: 'Mobilité à Braga',
    description: 'Planifiez votre voyage et déplacez-vous en ville :',
    btnArrive: 'Voyager vers Braga',
    btnArriveSub: 'Trains, autocars, voiture et aéroport',
    btnAround: 'Se Déplacer',
    btnAroundSub: 'Bus TUB, taxis, parking et Bom Jesus',
    tabArrive: 'Voyager vers Braga',
    tabAround: 'Se Déplacer',
    labelBack: 'Accueil',
    brandHomeAria: "Retourner à l'écran d'accueil — Visit Braga",
    searchPlaceholder: 'Rechercher : péages, aéroport, Bom Jesus, taxi...',
    searchAriaLabel: 'Rechercher des services de mobilité',
    searchClearAria: 'Effacer la recherche',
    searchEmptyText: 'Aucun service trouvé dans cette section.',
    searchSwitchBtn: "Voir les résultats dans l'autre section",
    langAriaLabel: 'Changer de langue',
    externalLinkTitle: 'Ouvre dans un nouvel onglet',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trains",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autocars",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Voiture",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avion",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Location de Voitures",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Covoiturage",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transports Publics",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis & VTC",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Parking",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Bornes de Recharge",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Stations-Service",

    // Contextual tips
    tipCar: "Les autoroutes d'accès à Braga (A3/A11) utilisent des péages manuels et électroniques. Enregistrez votre plaque si vous conduisez un véhicule étranger.",
    tipPlane: "L'Aéroport de Porto (OPO) se trouve à environ 45 min de Braga, avec navette directe (GetBus) ou liaison ferroviaire (CP).",
    tipSanctuaries: 'La Ligne 2 des TUB relie le centre au Funiculaire du Bom Jesus ; la Ligne 88 monte jusqu’au Sanctuaire du Sameiro.',

    // Card titles
    cp: 'CP - Trains',
    cctb: 'Gare Routière',
    re: 'Rede Expressos',
    flix: 'FlixBus',
    get: 'GetBus (Aéroport)',
    cavado: 'Cávado Mobilidade',
    ave: 'AVE Mobilidade',
    tolls: 'PT Tolls',
    viaverde: 'Via Verde Go Toll',
    tollsFines: 'Péages Impayés',
    directionsBraga: 'Directions pour Braga',
    ana: 'Aéroport de Porto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Voitures)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Bus Urbains)',
    bomJesusElevator: 'Funiculaire du Bom Jesus',
    bomJesusTransit: 'Bus vers Bom Jesus',
    sameiroTransit: 'Bus vers le Sameiro',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Parking (Voitures)',
    parkingBike: 'Parking (Vélos)',
    mobie: 'Rede Mobi.e',
    electromaps: 'Electromaps',
    tesla: 'Tesla',
    plugshare: 'PlugShare',
    chargemap: 'Charge Map',
    opencharge: 'Open Charge',
    dgeg: 'DGEG (Carburant)',
    maisgasolina: 'Mais Gasolina',
    googleGas: 'Google Maps (Braga)',

    // Card subtitles
    subCp: 'Trains urbains (Porto) et Alfa Pendular',
    subCctb: 'Gare routière centrale de Braga',
    subRe: "Réseau national d'autocars longue distance",
    subFlix: 'Lignes nationales et européennes',
    subGet: 'Navette directe Aéroport de Porto ↔ Braga',
    subCavado: 'Bus régionaux de la zone du Cávado',
    subAve: "Bus régionaux de la zone de l'Ave",
    subTolls: 'Guide et adhésion aux péages électroniques',
    subViaverde: 'Paiement des péages pour visiteurs',
    subTollsFines: 'Consulter et régler les péages impayés',
    subDirectionsBraga: 'Itinéraire voiture sur Google Maps',
    subAna: 'Infos vols et accès aéroport (OPO)',
    subSkyscanner: 'Comparateur de vols vers Porto',
    subGoogleFlights: 'Recherche de tarifs et horaires de vols',
    subRentalcars: 'Comparateur de location de voitures',
    subKayak: 'Recherche de voitures de location au Portugal',
    subBlablacar: 'Covoiturage entre villes',
    subTub: 'Réseau municipal de bus urbains de Braga',
    subBomJesusElevator: 'Funiculaire historique à contrepoids d’eau',
    subBomJesusTransit: 'TUB Ligne 2 · Itinéraires en direct',
    subSameiroTransit: 'TUB Ligne 88 · Itinéraires en direct',
    subBragataxis: 'Centrale de taxis 24h/24 à Braga',
    subTaxisbraga: 'Taxis locaux et transferts privés',
    subEconomicotaxis: 'Taxis à Braga et transfert aéroport',
    subUber: 'VTC à la demande via application',
    subBolt: 'VTC à la demande via application',
    subParkingCar: 'Parkings publics automobiles à Braga',
    subParkingBike: 'Carte des stationnements vélos',
    subMobie: 'Réseau public national de recharge électrique',
    subElectromaps: 'Carte des bornes et disponibilité en direct',
    subTesla: 'Superchargeurs et bornes Tesla',
    subPlugshare: 'Carte communautaire des bornes de recharge',
    subChargemap: "Planificateur d'itinéraires électriques",
    subOpencharge: 'Répertoire ouvert des points de charge',
    subDgeg: 'Comparateur officiel des prix du carburant',
    subMaisgasolina: 'Stations et prix actualisés au Portugal',
    subGoogleGas: 'Stations-service les plus proches à Braga',

    // Footer & Privacy Modal
    footerCopyright: '© 2026 Office de Tourisme - DAET | CM Braga',
    footerContacts: 'CONTACTS',
    footerAddress: 'Office de Tourisme de Braga | Avenida da Liberdade, nº 1 - 4710-305 Braga',
    footerPrivacy: 'Politique de confidentialité',
    modalTitle: 'Mentions Légales et Politique de Confidentialité',
    modalClose: 'Compris et Fermer',
    privacyBodyHtml: `
      <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> 1. Propriété et Identification de l'Entité</h3>
      <p>Ce portail numérique d'information touristique et de mobilité est géré par la Municipalité de Braga (NIF 506 901 495), sise Praça do Município, 4700-435 Braga, via sa Division du Tourisme (DAET) et l'Office de Tourisme situé Avenida da Liberdade, nº 1, 4710-305 Braga.</p>

      <h3><i class="fa-solid fa-copyright" aria-hidden="true"></i> 2. Propriété Intellectuelle et Droits d'Auteur</h3>
      <p>L'ensemble des contenus présents sur cette plateforme — textes, photographies, cartes, marques (« Visit Braga »), logos et éléments graphiques — est protégé par la législation sur les droits d'auteur et la propriété industrielle.</p>
      <p>La consultation et l'utilisation sont autorisées uniquement à des fins personnelles, éducatives ou touristiques non commerciales. Toute reproduction, modification ou exploitation commerciale sans accord écrit préalable de la Municipalité de Braga est interdite.</p>

      <h3><i class="fa-solid fa-user-shield" aria-hidden="true"></i> 3. Traitement des Données Personnelles (RGPD)</h3>
      <p>La Municipalité de Braga veille au strict respect du Règlement Général sur la Protection des Données (Règlement UE 2016/679) et de la loi portugaise n° 58/2019 :</p>
      <ul>
        <li><strong>Finalité et Minimisation :</strong> Ce site est strictement informatif et touristique ; il ne nécessite aucune inscription et ne collecte aucune donnée personnelle directement identifiable.</li>
        <li><strong>Données Techniques d'Accès :</strong> Les journaux techniques (adresse IP et journaux serveur) sont traités sur la base de l'intérêt légitime afin d'assurer la sécurité et l'intégrité du service.</li>
        <li><strong>Sécurité :</strong> Nous ne partageons, ne vendons ni ne cédons aucune donnée à des tiers à des fins publicitaires ou commerciales.</li>
      </ul>

      <h3><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> 4. Cookies et Stockage Local</h3>
      <p>Conformément à la loi n° 41/2004, modifiée par la loi n° 46/2012 (transposition de la directive européenne ePrivacy) :</p>
      <ul>
        <li><strong>Stockage Strictement Nécessaire :</strong> Nous utilisons uniquement le stockage local essentiel (LocalStorage) sur votre appareil afin de mémoriser votre choix de langue.</li>
        <li><strong>Aucun Suivi Tiers :</strong> Nous n'utilisons aucun cookie analytique intrusif, pixel de réseau social ni cookie publicitaire comportemental.</li>
        <li><strong>Gestion des Préférences :</strong> Vous pouvez à tout moment bloquer ou supprimer ces données dans les paramètres de votre navigateur.</li>
      </ul>

      <h3><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> 5. Droits des Personnes Concernées</h3>
      <p>Vous disposez d'un droit d'accès, de rectification, d'opposition, de limitation et d'effacement de vos données conformément à la loi, ainsi que du droit d'introduire une réclamation auprès de la CNPD (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).</p>

      <h3><i class="fa-solid fa-address-card" aria-hidden="true"></i> 6. Contacts Officiels et Délégué à la Protection des Données</h3>
      <p>Pour toute question ou pour exercer vos droits en matière de confidentialité :</p>
      <ul>
        <li><strong>Délégué à la Protection des Données (DPO) :</strong> <a href="mailto:dpo@cm-braga.pt">dpo@cm-braga.pt</a></li>
        <li><strong>Office de Tourisme de Braga :</strong> Av. da Liberdade, nº 1, 4710-305 Braga | Tél. : +351 253 262 550 | <a href="mailto:turismo@cm-braga.pt">turismo@cm-braga.pt</a></li>
        <li><strong>Mairie de Braga (Siège) :</strong> Praça do Município, 4700-435 Braga | Tél. : +351 253 616 060 | <a href="mailto:municipe@cm-braga.pt">municipe@cm-braga.pt</a></li>
      </ul>
      <p>Consultez la version intégrale des mentions légales de la Municipalité sur : <a href="https://cm-braga.pt/pt/0107/avisos-legais" target="_blank" rel="noopener noreferrer">cm-braga.pt/pt/0107/avisos-legais</a></p>
    `
  }
};

/**
 * Mapping between DOM element IDs and their textContent translation keys.
 */
export const TEXT_BINDINGS = {
  'title': 'title',
  'description': 'description',
  'btn-arrive': 'btnArrive',
  'btn-arrive-sub': 'btnArriveSub',
  'btn-around': 'btnAround',
  'btn-around-sub': 'btnAroundSub',
  'tab-arrive-label': 'tabArrive',
  'tab-around-label': 'tabAround',
  'label-back': 'labelBack',
  'search-empty-text': 'searchEmptyText',
  'search-switch-label': 'searchSwitchBtn',
  'tip-car': 'tipCar',
  'tip-plane': 'tipPlane',
  'tip-sanctuaries': 'tipSanctuaries',
  'label-cp': 'cp',
  'sub-cp': 'subCp',
  'label-cctb': 'cctb',
  'sub-cctb': 'subCctb',
  'label-re': 're',
  'sub-re': 'subRe',
  'label-flix': 'flix',
  'sub-flix': 'subFlix',
  'label-get': 'get',
  'sub-get': 'subGet',
  'label-cavado': 'cavado',
  'sub-cavado': 'subCavado',
  'label-ave': 'ave',
  'sub-ave': 'subAve',
  'label-tolls': 'tolls',
  'sub-tolls': 'subTolls',
  'label-viaverde': 'viaverde',
  'sub-viaverde': 'subViaverde',
  'label-tolls-fines': 'tollsFines',
  'sub-tolls-fines': 'subTollsFines',
  'label-directions-braga': 'directionsBraga',
  'sub-directions-braga': 'subDirectionsBraga',
  'label-ana': 'ana',
  'sub-ana': 'subAna',
  'label-skyscanner': 'skyscanner',
  'sub-skyscanner': 'subSkyscanner',
  'label-google-flights': 'googleFlights',
  'sub-google-flights': 'subGoogleFlights',
  'label-rentalcars': 'rentalcars',
  'sub-rentalcars': 'subRentalcars',
  'label-kayak': 'kayak',
  'sub-kayak': 'subKayak',
  'label-blablacar': 'blablacar',
  'sub-blablacar': 'subBlablacar',
  'label-tub': 'tub',
  'sub-tub': 'subTub',
  'label-bom-jesus-elevator': 'bomJesusElevator',
  'sub-bom-jesus-elevator': 'subBomJesusElevator',
  'label-bom-jesus-transit': 'bomJesusTransit',
  'sub-bom-jesus-transit': 'subBomJesusTransit',
  'label-sameiro-transit': 'sameiroTransit',
  'sub-sameiro-transit': 'subSameiroTransit',
  'label-bragataxis': 'bragataxis',
  'sub-bragataxis': 'subBragataxis',
  'label-taxisbraga': 'taxisbraga',
  'sub-taxisbraga': 'subTaxisbraga',
  'label-economicotaxis': 'economicotaxis',
  'sub-economicotaxis': 'subEconomicotaxis',
  'label-uber': 'uber',
  'sub-uber': 'subUber',
  'label-bolt': 'bolt',
  'sub-bolt': 'subBolt',
  'label-parking-car': 'parkingCar',
  'sub-parking-car': 'subParkingCar',
  'label-parking-bike': 'parkingBike',
  'sub-parking-bike': 'subParkingBike',
  'label-mobie': 'mobie',
  'sub-mobie': 'subMobie',
  'label-electromaps': 'electromaps',
  'sub-electromaps': 'subElectromaps',
  'label-tesla': 'tesla',
  'sub-tesla': 'subTesla',
  'label-plugshare': 'plugshare',
  'sub-plugshare': 'subPlugshare',
  'label-chargemap': 'chargemap',
  'sub-chargemap': 'subChargemap',
  'label-opencharge': 'opencharge',
  'sub-opencharge': 'subOpencharge',
  'label-dgeg': 'dgeg',
  'sub-dgeg': 'subDgeg',
  'label-maisgasolina': 'maisgasolina',
  'sub-maisgasolina': 'subMaisgasolina',
  'label-google-gas': 'googleGas',
  'sub-google-gas': 'subGoogleGas',
  'footer-copyright': 'footerCopyright',
  'footer-contacts': 'footerContacts',
  'footer-address': 'footerAddress',
  'footer-privacy': 'footerPrivacy',
  'modal-title': 'modalTitle',
  'close-privacy-modal': 'modalClose'
};

/**
 * Mapping between DOM element IDs and their innerHTML translation keys (trusted static dictionary).
 */
export const HTML_BINDINGS = {
  'train-heading': 'trainHeading',
  'bus-heading': 'busHeading',
  'tolls-heading': 'tollsHeading',
  'plane-heading': 'planeHeading',
  'rentacar-heading': 'rentacarHeading',
  'carpool-heading': 'carpoolHeading',
  'urban-heading': 'urbanHeading',
  'sanctuaries-heading': 'sanctuariesHeading',
  'taxis-heading': 'taxisHeading',
  'parking-heading': 'parkingHeading',
  'ev-heading': 'evHeading',
  'fuel-heading': 'fuelHeading',
  'privacy-modal-body': 'privacyBodyHtml'
};

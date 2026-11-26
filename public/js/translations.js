/**
 * Feature: Multilingual Translations, Quick Mobility Guide & Legal Content Dictionary
 *
 * Stores all user-facing strings for the "Mobilidade em Braga" portal across
 * four languages: Portuguese (pt), English (en), Spanish (es), and French (fr).
 * Covers the document title, meta description, hero header, segmented tabs,
 * instant search prompts, PWA install & offline labels, Quick Mobility Guide
 * modal content, GPS key-spot shortcuts, soft mobility, campervan areas, live
 * traffic, multimodal planners, service card labels & subtitles, footer labels,
 * and the complete GDPR / Privacy Policy modal.
 *
 * Use cases:
 * - Switching the entire UI seamlessly between PT, EN, ES, and FR.
 * - Giving international tourists clear subtitles explaining local services.
 * - Offering an offline-readable Quick Mobility Guide in the visitor's language.
 */

export const TRANSLATIONS = {
  pt: {
    pageTitle: 'Mobilidade em Braga — Visit Braga',
    metaDescription: 'Planeie a sua viagem para Braga e desloque-se facilmente na cidade: comboios, autocarros, portagens, aeroporto, TUB, táxis, estacionamento, autocaravanas e Bom Jesus.',
    title: 'Mobilidade em Braga',
    description: 'Planeie a sua viagem e desloque-se na cidade:',
    quickGuideBtn: 'Guia Rápido',
    pwaInstallBtn: 'Instalar App',
    offlineBannerText: 'Modo offline — Guia rápido, linhas e contactos disponíveis.',
    btnArrive: 'Viajar para Braga',
    btnArriveSub: 'Comboios, autocarros, carro, trânsito e aeroporto',
    btnAround: 'Na Cidade',
    btnAroundSub: 'TUB, GPS pontos-chave, Bom Jesus, a pé e estacionamento',
    tabArrive: 'Viajar para Braga',
    tabAround: 'Na Cidade',
    labelBack: 'Início',
    brandHomeAria: 'Voltar ao ecrã inicial — Visit Braga',
    searchPlaceholder: 'Procurar: portagens, aeroporto, Bom Jesus, autocaravanas...',
    searchAriaLabel: 'Procurar serviços de mobilidade',
    searchClearAria: 'Limpar pesquisa',
    searchEmptyText: 'Nenhum serviço encontrado nesta secção.',
    searchSwitchBtn: 'Ver resultados na outra secção',
    langAriaLabel: 'Alterar idioma',
    externalLinkTitle: 'Abre num novo separador',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Comboios & Planeador",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autocarros",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Automóvel & Trânsito",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avião",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Rent-a-Car",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Viagens Partilhadas",
    tubLiveHeading: "<i class='fas fa-clock' aria-hidden='true'></i> Horários TUB em Tempo Real",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transportes Públicos",
    keySpotsHeading: "<i class='fas fa-location-crosshairs' aria-hidden='true'></i> Pontos-Chave (GPS)",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    softMobilityHeading: "<i class='fas fa-person-walking' aria-hidden='true'></i> A Pé & Bicicleta",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Táxis e TVDE",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Estacionamento & Autocaravanas",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Postos de Carregamento",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Postos de Combustível",

    // Contextual tips
    tipCar: 'As autoestradas de acesso a Braga (A3/A11) incluem portagens manuais e eletrónicas. Registe a matrícula se conduzir um veículo estrangeiro.',
    tipPlane: 'O Aeroporto do Porto (OPO) fica a cerca de 45 min de Braga, com ligação direta de autocarro (GetBus) ou comboio (CP).',
    tipSanctuaries: 'A Linha 2 dos TUB liga o centro ao Elevador do Bom Jesus; a Linha 88 continua até ao Santuário do Sameiro.',
    tipWalking: 'O Centro Histórico de Braga é amplamente pedonal: a Estação CP fica a ~10 min e a Central de Autocarros a ~8 min a pé do centro.',

    // Card titles
    cp: 'CP - Comboios',
    rome2rio: 'Rome2Rio (Planeador)',
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
    wazeTraffic: 'Waze (Trânsito em Braga)',
    ana: 'Aeroporto do Porto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Carros)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Autocarros Urbanos)',
    tubMap: 'TUB — Mapa Interativo',
    moovit: 'Moovit (Braga)',
    spotTouristOffice: 'Posto de Turismo',
    spotTrainStation: 'Estação de Comboios (CP)',
    spotBusTerminal: 'Central de Camionagem',
    spotHistoricCenter: 'Centro Histórico / Sé',
    bomJesusElevator: 'Elevador do Bom Jesus',
    bomJesusTransit: 'Autocarro para o Bom Jesus',
    sameiroTransit: 'Autocarro para o Sameiro',
    walkingMap: 'Centro Histórico a Pé',
    cyclingNetwork: 'Rede Ciclável de Braga',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Estacionamento (Automóvel)',
    parkingBike: 'Estacionamento (Bicicletas)',
    park4night: 'Autocaravanas (Park4Night)',
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
    subRome2rio: 'Combinar voo, comboio e autocarro até Braga',
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
    subWazeTraffic: 'Condições de trânsito e alertas em direto',
    subAna: 'Informações de voos e acessos (OPO)',
    subSkyscanner: 'Comparador de voos para o Porto',
    subGoogleFlights: 'Pesquisa de tarifas e horários de voos',
    subRentalcars: 'Comparador de aluguer de automóveis',
    subKayak: 'Pesquisa de rent-a-car em Portugal',
    subBlablacar: 'Boleias partilhadas entre cidades',
    subTub: 'Rede municipal de autocarros de Braga',
    subTubMap: 'Mapa de linhas, paragens e autocarros',
    subMoovit: 'Planeador multimodal de autocarros e comboios',
    subSpotTouristOffice: 'Av. da Liberdade · Direções GPS a pé',
    subSpotTrainStation: '~10 min a pé do centro · Direções GPS',
    subSpotBusTerminal: '~8 min a pé do centro · Direções GPS',
    subSpotHistoricCenter: 'Zona pedonal · Direções GPS a pé',
    subBomJesusElevator: 'Funicular histórico movido a água',
    subBomJesusTransit: 'TUB Linha 2 · Rotas em tempo real',
    subSameiroTransit: 'TUB Linha 88 · Rotas em tempo real',
    subWalkingMap: 'Navegação pedonal para a Praça da República',
    subCyclingNetwork: 'Ciclovias e pontos de apoio ciclável',
    subBoltScooters: 'Trotinetes e bicicletas partilhadas na cidade',
    subBragataxis: 'Central de táxis 24h em Braga',
    subTaxisbraga: 'Serviço local de táxis e transfers',
    subEconomicotaxis: 'Táxis em Braga e transfer aeroporto',
    subUber: 'Transporte privado via aplicação',
    subBolt: 'Transporte privado via aplicação',
    subParkingCar: 'Parques de estacionamento em Braga',
    subParkingBike: 'Mapa de estacionamento ciclável',
    subPark4night: 'Áreas de serviço e pernoita em Braga',
    subMobie: 'Rede pública nacional de carregamento',
    subElectromaps: 'Mapa de carregadores e estado em direto',
    subTesla: 'Superchargers e carregadores Tesla',
    subPlugshare: 'Comunidade e mapa global de carregadores',
    subChargemap: 'Planeador de rotas para veículos elétricos',
    subOpencharge: 'Diretório aberto de pontos de carga',
    subDgeg: 'Comparador oficial de preços de combustível',
    subMaisgasolina: 'Postos e preços atualizados em Portugal',
    subGoogleGas: 'Postos de combustível mais próximos em Braga',

    // Quick Mobility Guide Modal
    guideModalTitle: 'Guia Rápido de Mobilidade em Braga',
    guideModalClose: 'Fechar Guia',
    guideBodyHtml: `
      <h3><i class="fa-solid fa-plane-arrival" aria-hidden="true"></i> Aeroporto do Porto (OPO) ↔ Braga</h3>
      <ul>
        <li><strong>Opção mais rápida (Direto ~50 min):</strong> Autocarro <strong>GetBus</strong> direto do Aeroporto até à Central de Camionagem de Braga (CCTB).</li>
        <li><strong>Opção de comboio (~1h30):</strong> Apanhe o Metro do Porto (Linha E — Violeta) até <em>Campanhã</em> e siga no comboio <strong>CP Urbano</strong> direto para Braga.</li>
      </ul>

      <h3><i class="fa-solid fa-bus-simple" aria-hidden="true"></i> Como usar os Autocarros Urbanos (TUB)</h3>
      <ul>
        <li><strong>Bilhetes:</strong> Pode comprar bilhete simples a bordo (junto ao motorista) ou carregar um cartão pré-pago nos postos de venda TUB e agentes autorizados.</li>
        <li><strong>Santuários:</strong> A <strong>Linha 2</strong> liga o centro ao Elevador do Bom Jesus; a <strong>Linha 88</strong> sobe até ao Santuário do Sameiro.</li>
      </ul>

      <h3><i class="fa-solid fa-person-walking" aria-hidden="true"></i> Centro Histórico Pedonal</h3>
      <ul>
        <li><strong>Estação de Comboios (CP) → Centro:</strong> ~10 minutos a pé.</li>
        <li><strong>Central de Camionagem (CCTB) → Centro:</strong> ~8 minutos a pé.</li>
        <li><strong>Posto de Turismo (Av. da Liberdade) → Sé de Braga:</strong> ~5 minutos a pé.</li>
      </ul>

      <h3><i class="fa-solid fa-road" aria-hidden="true"></i> Conduzir e Portagens</h3>
      <p>As autoestradas A3 e A11 utilizam portagens manuais e eletrónicas. Se viajar com matrícula estrangeira, associe o cartão bancário à matrícula (PT Tolls / Via Verde Visitors) antes ou logo após entrar em Portugal.</p>

      <h3><i class="fa-solid fa-phone" aria-hidden="true"></i> Contactos Úteis (Disponíveis Offline)</h3>
      <ul>
        <li><strong>Posto de Turismo de Braga:</strong> <a href="tel:+351253262550">+351 253 262 550</a> (Av. da Liberdade, nº 1)</li>
        <li><strong>Emergência Europeia:</strong> <a href="tel:112">112</a></li>
      </ul>
    `,

    // iOS Install Modal
    iosModalTitle: 'Instalar no iPhone / iPad',
    iosModalClose: 'Compreendi',
    iosModalBodyHtml: `
      <p>Adicione <strong>Mobilidade em Braga</strong> ao ecrã inicial para acesso rápido e consulta offline do Guia Rápido e contactos:</p>
      <ul>
        <li><strong>1.</strong> Toque no botão <strong>Partilhar</strong> <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> na barra do Safari.</li>
        <li><strong>2.</strong> Deslize para baixo e selecione <strong>Ecrã principal</strong> (<em>Add to Home Screen</em>).</li>
        <li><strong>3.</strong> Confirme tocando em <strong>Adicionar</strong>.</li>
      </ul>
    `,

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
        <li><strong>Armazenamento Estritamente Necessário:</strong> Utilizamos apenas armazenamento local essencial no seu dispositivo (LocalStorage e cache offline da PWA) para reter o idioma selecionado e permitir o acesso offline ao guia.</li>
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
    `,

    // Real-Time TUB Urban Bus Schedules
    tubLiveCardTitle: 'Horários TUB em Tempo Real',
    tubLiveCardSub: 'Próximas partidas por paragem, GPS e linhas ativas',
    tubHomeBannerTitle: 'Horários TUB em Tempo Real',
    tubHomeBannerSub: 'Próximos autocarros por paragem, GPS ou linha ativa em Braga',
    tubModalTitle: 'Horários TUB em Tempo Real',
    tubModalClose: 'Fechar',
    tubTabStops: 'Por Paragem',
    tubTabLines: 'Linhas Ativas',
    tubStopSearchPlaceholder: 'Procurar paragem TUB (ex: Central, Bom Jesus, Estação)...',
    tubLineSearchPlaceholder: 'Filtrar linha (ex: 2, 88, 24, Bom Jesus)...',
    tubNearbyBtn: 'Perto de mim',
    tubRefreshAria: 'Atualizar horários TUB',
    tubStopGpsLabel: 'Rota GPS',
    tubSourceNote: 'API Mobilidade · TUB Braga · Atualização 30s',
    tubOpenMapBtn: 'Mapa TUB',
    tubSpotCentral: 'Av. Central I',
    tubSpotCentral3: 'Av. Central III',
    tubSpotTrain: 'Estação CP',
    tubSpotBusTerminal: 'C. Camionagem',
    tubSpotBomJesus: 'Bom Jesus',
    tubSpotSameiro: 'Sameiro',
    tubSpotUminho: 'U. Minho',
    tubSpotHospital: 'Hospital',
    tubNow: 'Agora',
    tubInMinutes: 'em {min} min',
    tubAllLines: 'Todas',
    tubStatusLive: 'Tempo real',
    tubStatusScheduled: 'Previsto',
    tubStatusCancelled: 'Suprimido',
    tubLoadingDepartures: 'A carregar próximas partidas TUB...',
    tubLoadingLines: 'A carregar linhas ativas em Braga...',
    tubLoadingTrip: 'A carregar paragens do percurso...',
    tubSearchingStops: 'A procurar paragens TUB...',
    tubNoDepartures: 'Sem partidas previstas de momento para esta paragem.',
    tubNoStopsFound: 'Nenhuma paragem TUB encontrada.',
    tubNoLinesFound: 'Nenhuma linha ativa encontrada com esse filtro.',
    tubNoItinerary: 'Percurso detalhado indisponível para esta viagem.',
    tubSearchResultsTitle: 'Paragens encontradas',
    tubNearbyResultsTitle: 'Paragens mais próximas de si',
    tubActiveLinesCount: '{count} linhas em circulação agora',
    tubActiveTripsLabel: '{n} viagens ativas',
    tubBackToLines: 'Voltar às linhas',
    tubViewStopHint: 'Ver partidas desta paragem',
    tubGeoLocating: 'A localizar paragens TUB perto de si...',
    tubGeoUnavailable: 'Geolocalização não suportada neste navegador.',
    tubGeoDenied: 'Permissão de localização recusada. Utilize a pesquisa de paragens.',
    tubGeoOutsideBraga: 'A sua localização está fora de Braga. Escolha uma paragem acima.',
    tubOfflineError: 'Sem ligação à internet. Ligue-se para consultar os horários em tempo real.',
    tubErrorFetch: 'Não foi possível obter os horários TUB neste momento. Tente novamente.',
    tubTabPlanner: 'Destino',
    tubSpotBragaParque: 'Braga Parque',
    tubPlanFromLabel: 'Origem',
    tubPlanToLabel: 'Destino',
    tubPlanFromPlaceholder: 'De onde parte? (ex: Av. Central, Estação CP)...',
    tubPlanToPlaceholder: 'Para onde vai? (ex: Bom Jesus, Braga Parque, Hospital)...',
    tubPlanGpsAria: 'Usar a minha localização atual como origem',
    tubPlanSwapAria: 'Trocar origem e destino',
    tubPlanSubmitBtn: 'Ver autocarro a apanhar',
    tubPlanQuickLabel: 'Destinos frequentes em Braga:',
    tubPlanMyLocation: 'A minha localização (GPS)',
    tubPlanStopBadge: 'Paragem TUB',
    tubPlanEmptyHint: 'Escolha um destino acima (ou toque num destino frequente) para ver qual o autocarro TUB a apanhar.',
    tubPlanSearching: 'A calcular o melhor autocarro TUB...',
    tubPlanPickBoth: 'Indique uma origem e um destino em Braga.',
    tubPlanSamePlace: 'A origem e o destino são iguais. Escolha um destino diferente.',
    tubPlanNoPlaces: 'Nenhum local ou paragem encontrado em Braga.',
    tubPlanNoRoutes: 'Sem ligações TUB disponíveis neste momento para este trajeto.',
    tubPlanWalkOnly: 'Este destino fica perto a pé: cerca de {min} min ({dist}), sem necessidade de autocarro.',
    tubPlanWalkOption: 'Também acessível a pé em cerca de {min} min ({dist}).',
    tubPlanTakeBusLabel: 'Apanhar autocarro',
    tubPlanTakeBusesLabel: 'Apanhar autocarros',
    tubPlanDirect: 'Direto',
    tubPlanOneTransfer: '1 transbordo',
    tubPlanTransfers: '{n} transbordos',
    tubPlanWalkStepDist: 'Caminhar {min} min ({dist}) até {to}',
    tubPlanWalkStep: 'Caminhar {min} min até {to}',
    tubPlanDestinationWord: 'ao destino',
    tubPlanBusLinePrefix: 'Linha',
    tubPlanStopsCount: '{n} paragens',
    tubPlanViewBoardingStop: 'Ver paragem',
    tubPlanShowStops: 'Paragens ({n})'
  },

  en: {
    pageTitle: 'Mobility in Braga — Visit Braga',
    metaDescription: 'Plan your trip to Braga and get around the city effortlessly: trains, buses, highway tolls, Porto Airport links, urban buses (TUB), taxis, parking, campervans, and Bom Jesus.',
    title: 'Mobility in Braga',
    description: 'Plan your trip and get around the city:',
    quickGuideBtn: 'Quick Guide',
    pwaInstallBtn: 'Install App',
    offlineBannerText: 'Offline mode — Quick guide, bus lines & contacts remain available.',
    btnArrive: 'Travel to Braga',
    btnArriveSub: 'Trains, buses, driving, live traffic & airport',
    btnAround: 'Getting Around',
    btnAroundSub: 'TUB buses, GPS key spots, Bom Jesus, walking & parking',
    tabArrive: 'Travel to Braga',
    tabAround: 'Getting Around',
    labelBack: 'Home',
    brandHomeAria: 'Return to home screen — Visit Braga',
    searchPlaceholder: 'Search: tolls, airport, Bom Jesus, campervan...',
    searchAriaLabel: 'Search mobility services',
    searchClearAria: 'Clear search',
    searchEmptyText: 'No services found in this section.',
    searchSwitchBtn: 'See results in the other section',
    langAriaLabel: 'Change language',
    externalLinkTitle: 'Opens in a new tab',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trains & Planner",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Buses",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Car & Live Traffic",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Airplane",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Rent-a-Car",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Carpooling",
    tubLiveHeading: "<i class='fas fa-clock' aria-hidden='true'></i> TUB Live Bus Schedules",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Public Transport",
    keySpotsHeading: "<i class='fas fa-location-crosshairs' aria-hidden='true'></i> Key Spots (GPS)",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    softMobilityHeading: "<i class='fas fa-person-walking' aria-hidden='true'></i> Walking & Cycling",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis & Ride-Hailing",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Parking & Campervans",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> EV Charging Stations",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Fuel Stations",

    // Contextual tips
    tipCar: 'Highways leading to Braga (A3/A11) use both manual and electronic tolls. Register your license plate if driving a foreign-registered vehicle.',
    tipPlane: 'Porto Airport (OPO) is about 45 min from Braga, with direct bus shuttles (GetBus) and rail connections (CP).',
    tipSanctuaries: 'TUB Bus Line 2 connects the city center to the Bom Jesus Funicular; Line 88 continues up to the Sameiro Sanctuary.',
    tipWalking: "Braga's Historic Center is largely pedestrianized: the CP Train Station is ~10 min and the Central Bus Terminal ~8 min on foot from downtown.",

    // Card titles
    cp: 'CP - Trains',
    rome2rio: 'Rome2Rio (Route Planner)',
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
    wazeTraffic: 'Waze (Braga Traffic)',
    ana: 'Porto Airport',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Cars)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Urban Buses)',
    tubMap: 'TUB — Interactive Map',
    moovit: 'Moovit (Braga)',
    spotTouristOffice: 'Tourist Office',
    spotTrainStation: 'Train Station (CP)',
    spotBusTerminal: 'Central Bus Terminal',
    spotHistoricCenter: 'Historic Center / Cathedral',
    bomJesusElevator: 'Bom Jesus Funicular',
    bomJesusTransit: 'Bus to Bom Jesus',
    sameiroTransit: 'Bus to Sameiro',
    walkingMap: 'Walk the Historic Center',
    cyclingNetwork: 'Braga Cycling Network',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Car Parking',
    parkingBike: 'Bicycle Parking',
    park4night: 'Campervans (Park4Night)',
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
    subRome2rio: 'Combine flights, trains & buses to Braga',
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
    subWazeTraffic: 'Live road conditions & traffic alerts',
    subAna: 'Flight information & airport access (OPO)',
    subSkyscanner: 'Compare flights to Porto Airport',
    subGoogleFlights: 'Search airfares and flight schedules',
    subRentalcars: 'Compare car rental providers',
    subKayak: 'Search car rentals across Portugal',
    subBlablacar: 'Intercity carpooling rides',
    subTub: 'Braga municipal urban bus network',
    subTubMap: 'Bus routes, stops & live network map',
    subMoovit: 'Multimodal urban bus & train planner',
    subSpotTouristOffice: 'Av. da Liberdade · Walking GPS route',
    subSpotTrainStation: '~10 min walk from center · GPS route',
    subSpotBusTerminal: '~8 min walk from center · GPS route',
    subSpotHistoricCenter: 'Pedestrian zone · Walking GPS route',
    subBomJesusElevator: 'Historic water-powered funicular',
    subBomJesusTransit: 'TUB Line 2 · Live transit directions',
    subSameiroTransit: 'TUB Line 88 · Live transit directions',
    subWalkingMap: 'Walking route to Praça da República',
    subCyclingNetwork: 'Bike lanes and cycling facilities map',
    subBoltScooters: 'Shared e-scooters & e-bikes in the city',
    subBragataxis: '24/7 local taxi dispatch in Braga',
    subTaxisbraga: 'Local taxis and private transfers',
    subEconomicotaxis: 'Braga taxis and airport transfers',
    subUber: 'On-demand rides via mobile app',
    subBolt: 'On-demand rides via mobile app',
    subParkingCar: 'Public car parks across Braga',
    subParkingBike: 'City bicycle parking locations map',
    subPark4night: 'Campervan service & overnight areas',
    subMobie: 'Portugal national EV charging network',
    subElectromaps: 'Live charger map and availability',
    subTesla: 'Tesla Superchargers & destination chargers',
    subPlugshare: 'Global EV charging community map',
    subChargemap: 'EV route planner and charging stations',
    subOpencharge: 'Open directory of EV charging points',
    subDgeg: 'Official Portuguese fuel price comparator',
    subMaisgasolina: 'Updated fuel stations and prices',
    subGoogleGas: 'Nearest gas stations around Braga',

    // Quick Mobility Guide Modal
    guideModalTitle: 'Braga Quick Mobility Guide',
    guideModalClose: 'Close Guide',
    guideBodyHtml: `
      <h3><i class="fa-solid fa-plane-arrival" aria-hidden="true"></i> Porto Airport (OPO) ↔ Braga</h3>
      <ul>
        <li><strong>Fastest option (Direct ~50 min):</strong> Take the <strong>GetBus</strong> direct shuttle from Porto Airport to Braga Central Bus Terminal (CCTB).</li>
        <li><strong>Rail option (~1h30):</strong> Ride Metro do Porto (Line E — Purple) to <em>Campanhã</em>, then transfer to the direct <strong>CP Urban Train</strong> to Braga.</li>
      </ul>

      <h3><i class="fa-solid fa-bus-simple" aria-hidden="true"></i> Riding Urban Buses (TUB)</h3>
      <ul>
        <li><strong>Tickets:</strong> Purchase a single ticket directly from the driver on board, or top up a reusable card at TUB ticket desks and local kiosks.</li>
        <li><strong>Sanctuaries:</strong> <strong>Line 2</strong> connects the city center to the Bom Jesus Funicular; <strong>Line 88</strong> continues up to the Sameiro Sanctuary.</li>
      </ul>

      <h3><i class="fa-solid fa-person-walking" aria-hidden="true"></i> Pedestrian Historic Center</h3>
      <ul>
        <li><strong>CP Train Station → City Center:</strong> ~10 min walk.</li>
        <li><strong>Central Bus Terminal (CCTB) → City Center:</strong> ~8 min walk.</li>
        <li><strong>Tourist Office (Av. da Liberdade) → Cathedral (Sé):</strong> ~5 min walk.</li>
      </ul>

      <h3><i class="fa-solid fa-road" aria-hidden="true"></i> Driving & Highway Tolls</h3>
      <p>The A3 and A11 highways include manual and electronic toll gantries. If driving a foreign-registered vehicle, link your payment card to your license plate (PT Tolls / Via Verde Visitors).</p>

      <h3><i class="fa-solid fa-phone" aria-hidden="true"></i> Useful Contacts (Available Offline)</h3>
      <ul>
        <li><strong>Braga Tourist Office:</strong> <a href="tel:+351253262550">+351 253 262 550</a> (Av. da Liberdade, nº 1)</li>
        <li><strong>European Emergency:</strong> <a href="tel:112">112</a></li>
      </ul>
    `,

    // iOS Install Modal
    iosModalTitle: 'Install on iPhone / iPad',
    iosModalClose: 'Got it',
    iosModalBodyHtml: `
      <p>Add <strong>Mobility in Braga</strong> to your Home Screen for one-tap access and offline availability of the Quick Guide and contacts:</p>
      <ul>
        <li><strong>1.</strong> Tap the <strong>Share</strong> button <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> in Safari’s toolbar.</li>
        <li><strong>2.</strong> Scroll down and select <strong>Add to Home Screen</strong>.</li>
        <li><strong>3.</strong> Confirm by tapping <strong>Add</strong>.</li>
      </ul>
    `,

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
        <li><strong>Strictly Necessary Storage:</strong> We only use essential browser storage (LocalStorage and offline PWA cache) on your device to remember your chosen display language and keep the mobility guide available offline.</li>
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
    `,

    // Real-Time TUB Urban Bus Schedules
    tubLiveCardTitle: 'TUB Live Bus Schedules',
    tubLiveCardSub: 'Next departures by stop, GPS nearby & active lines',
    tubHomeBannerTitle: 'TUB Live Bus Schedules',
    tubHomeBannerSub: 'Check upcoming urban buses by stop, GPS, or active line in Braga',
    tubModalTitle: 'TUB Real-Time Bus Schedules',
    tubModalClose: 'Close',
    tubTabStops: 'By Stop',
    tubTabLines: 'Active Lines',
    tubStopSearchPlaceholder: 'Search TUB stop (e.g. Central, Bom Jesus, Station)...',
    tubLineSearchPlaceholder: 'Filter line (e.g. 2, 88, 24, Bom Jesus)...',
    tubNearbyBtn: 'Near me',
    tubRefreshAria: 'Refresh TUB schedules',
    tubStopGpsLabel: 'GPS Route',
    tubSourceNote: 'Mobility API · TUB Braga · 30s auto-refresh',
    tubOpenMapBtn: 'TUB Map',
    tubSpotCentral: 'Av. Central I',
    tubSpotCentral3: 'Av. Central III',
    tubSpotTrain: 'CP Train Station',
    tubSpotBusTerminal: 'Bus Terminal',
    tubSpotBomJesus: 'Bom Jesus',
    tubSpotSameiro: 'Sameiro',
    tubSpotUminho: 'U. Minho',
    tubSpotHospital: 'Hospital',
    tubNow: 'Now',
    tubInMinutes: 'in {min} min',
    tubAllLines: 'All',
    tubStatusLive: 'Real-time',
    tubStatusScheduled: 'Scheduled',
    tubStatusCancelled: 'Cancelled',
    tubLoadingDepartures: 'Loading upcoming TUB departures...',
    tubLoadingLines: 'Loading active lines in Braga...',
    tubLoadingTrip: 'Loading full route stops...',
    tubSearchingStops: 'Searching TUB stops...',
    tubNoDepartures: 'No upcoming departures scheduled right now for this stop.',
    tubNoStopsFound: 'No TUB stops found.',
    tubNoLinesFound: 'No active lines match that filter.',
    tubNoItinerary: 'Detailed stop list unavailable for this trip.',
    tubSearchResultsTitle: 'Matching stops',
    tubNearbyResultsTitle: 'Closest TUB stops to you',
    tubActiveLinesCount: '{count} lines running right now',
    tubActiveTripsLabel: '{n} active trips',
    tubBackToLines: 'Back to lines',
    tubViewStopHint: 'View departures for this stop',
    tubGeoLocating: 'Finding TUB stops near you...',
    tubGeoUnavailable: 'Geolocation is not supported in this browser.',
    tubGeoDenied: 'Location permission denied. Use stop search instead.',
    tubGeoOutsideBraga: 'Your location is outside Braga. Choose a stop above.',
    tubOfflineError: 'You are offline. Reconnect to view live TUB bus schedules.',
    tubErrorFetch: 'Could not load TUB schedules right now. Please try refreshing.',
    tubTabPlanner: 'Destination',
    tubSpotBragaParque: 'Braga Parque',
    tubPlanFromLabel: 'From',
    tubPlanToLabel: 'To',
    tubPlanFromPlaceholder: 'Where from? (e.g. Av. Central, Train Station)...',
    tubPlanToPlaceholder: 'Where to? (e.g. Bom Jesus, Braga Parque, Hospital)...',
    tubPlanGpsAria: 'Use my current location as origin',
    tubPlanSwapAria: 'Swap origin and destination',
    tubPlanSubmitBtn: 'Find which bus to take',
    tubPlanQuickLabel: 'Popular Braga destinations:',
    tubPlanMyLocation: 'My location (GPS)',
    tubPlanStopBadge: 'TUB Stop',
    tubPlanEmptyHint: 'Pick a destination above (or tap a popular spot) to see which TUB bus to catch.',
    tubPlanSearching: 'Finding the best TUB bus...',
    tubPlanPickBoth: 'Please choose both an origin and a destination in Braga.',
    tubPlanSamePlace: 'Origin and destination are the same. Pick a different destination.',
    tubPlanNoPlaces: 'No Braga stops or places found.',
    tubPlanNoRoutes: 'No TUB bus routes available right now for this trip.',
    tubPlanWalkOnly: 'This destination is within walking distance: about {min} min ({dist}), no bus needed.',
    tubPlanWalkOption: 'Also reachable on foot in about {min} min ({dist}).',
    tubPlanTakeBusLabel: 'Take bus',
    tubPlanTakeBusesLabel: 'Take buses',
    tubPlanDirect: 'Direct',
    tubPlanOneTransfer: '1 transfer',
    tubPlanTransfers: '{n} transfers',
    tubPlanWalkStepDist: 'Walk {min} min ({dist}) to {to}',
    tubPlanWalkStep: 'Walk {min} min to {to}',
    tubPlanDestinationWord: 'destination',
    tubPlanBusLinePrefix: 'Line',
    tubPlanStopsCount: '{n} stops',
    tubPlanViewBoardingStop: 'View stop',
    tubPlanShowStops: 'Stops ({n})'
  },

  es: {
    pageTitle: 'Movilidad en Braga — Visit Braga',
    metaDescription: 'Planifique su viaje a Braga y muévase por la ciudad: trenes, autobuses, peajes, aeropuerto de Oporto, autobuses urbanos (TUB), taxis, aparcamiento, autocaravanas y Bom Jesus.',
    title: 'Movilidad en Braga',
    description: 'Planifique su viaje y muévase por la ciudad:',
    quickGuideBtn: 'Guía Rápida',
    pwaInstallBtn: 'Instalar App',
    offlineBannerText: 'Modo sin conexión — Guía rápida, líneas y contactos disponibles.',
    btnArrive: 'Viajar a Braga',
    btnArriveSub: 'Trenes, autobuses, coche, tráfico y aeropuerto',
    btnAround: 'En la Ciudad',
    btnAroundSub: 'TUB, GPS puntos clave, Bom Jesus, a pie y parking',
    tabArrive: 'Viajar a Braga',
    tabAround: 'En la Ciudad',
    labelBack: 'Inicio',
    brandHomeAria: 'Volver a la pantalla de inicio — Visit Braga',
    searchPlaceholder: 'Buscar: peajes, aeropuerto, Bom Jesus, autocaravanas...',
    searchAriaLabel: 'Buscar servicios de movilidad',
    searchClearAria: 'Limpiar búsqueda',
    searchEmptyText: 'No se encontraron servicios en esta sección.',
    searchSwitchBtn: 'Ver resultados en la otra sección',
    langAriaLabel: 'Cambiar idioma',
    externalLinkTitle: 'Se abre en una nueva pestaña',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trenes y Planificador",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autobuses",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Coche y Tráfico",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avión",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Alquiler de Coches",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Viajes Compartidos",
    tubLiveHeading: "<i class='fas fa-clock' aria-hidden='true'></i> Horarios TUB en Tiempo Real",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transporte Público",
    keySpotsHeading: "<i class='fas fa-location-crosshairs' aria-hidden='true'></i> Puntos Clave (GPS)",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus y Sameiro",
    softMobilityHeading: "<i class='fas fa-person-walking' aria-hidden='true'></i> A Pie y Bicicleta",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis y VTC",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Aparcamiento y Autocaravanas",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Estaciones de Carga",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Estaciones de Servicio",

    // Contextual tips
    tipCar: 'Las autopistas de acceso a Braga (A3/A11) cuentan con peajes manuales y electrónicos. Registre su matrícula si conduce un vehículo extranjero.',
    tipPlane: 'El Aeropuerto de Oporto (OPO) está a unos 45 min de Braga, con conexión directa en autobús (GetBus) o tren (CP).',
    tipSanctuaries: 'La Línea 2 de TUB conecta el centro con el Funicular de Bom Jesus; la Línea 88 sube hasta el Santuario de Sameiro.',
    tipWalking: 'El Centro Histórico de Braga es mayoritariamente peatonal: la Estación CP está a ~10 min y la Estación de Autobuses a ~8 min a pie del centro.',

    // Card titles
    cp: 'CP - Trenes',
    rome2rio: 'Rome2Rio (Planificador)',
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
    wazeTraffic: 'Waze (Tráfico en Braga)',
    ana: 'Aeropuerto de Oporto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Coches)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Autobuses Urbanos)',
    tubMap: 'TUB — Mapa Interactivo',
    moovit: 'Moovit (Braga)',
    spotTouristOffice: 'Oficina de Turismo',
    spotTrainStation: 'Estación de Trenes (CP)',
    spotBusTerminal: 'Estación de Autobuses',
    spotHistoricCenter: 'Centro Histórico / Catedral',
    bomJesusElevator: 'Elevador de Bom Jesus',
    bomJesusTransit: 'Autobús a Bom Jesus',
    sameiroTransit: 'Autobús al Sameiro',
    walkingMap: 'Centro Histórico a Pie',
    cyclingNetwork: 'Red Ciclista de Braga',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Aparcamiento (Coches)',
    parkingBike: 'Aparcamiento (Bicicletas)',
    park4night: 'Autocaravanas (Park4Night)',
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
    subRome2rio: 'Combinar vuelo, tren y autobús hasta Braga',
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
    subWazeTraffic: 'Estado del tráfico y alertas en directo',
    subAna: 'Información de vuelos y accesos (OPO)',
    subSkyscanner: 'Comparador de vuelos hacia Oporto',
    subGoogleFlights: 'Búsqueda de tarifas y horarios de vuelos',
    subRentalcars: 'Comparador de alquiler de vehículos',
    subKayak: 'Búsqueda de coches de alquiler en Portugal',
    subBlablacar: 'Viajes compartidos entre ciudades',
    subTub: 'Red municipal de autobuses de Braga',
    subTubMap: 'Mapa de líneas, paradas y autobuses',
    subMoovit: 'Planificador multimodal de buses y trenes',
    subSpotTouristOffice: 'Av. da Liberdade · Ruta GPS a pie',
    subSpotTrainStation: '~10 min a pie del centro · Ruta GPS',
    subSpotBusTerminal: '~8 min a pie del centro · Ruta GPS',
    subSpotHistoricCenter: 'Zona peatonal · Ruta GPS a pie',
    subBomJesusElevator: 'Funicular histórico impulsado por agua',
    subBomJesusTransit: 'TUB Línea 2 · Rutas en tiempo real',
    subSameiroTransit: 'TUB Línea 88 · Rutas en tiempo real',
    subWalkingMap: 'Navegación a pie hacia Praça da República',
    subCyclingNetwork: 'Carriles bici y red ciclista local',
    subBoltScooters: 'Patinetes y bicis compartidas en la ciudad',
    subBragataxis: 'Central de taxis 24h en Braga',
    subTaxisbraga: 'Servicio local de taxis y traslados',
    subEconomicotaxis: 'Taxis en Braga y traslado al aeropuerto',
    subUber: 'Transporte privado mediante aplicación',
    subBolt: 'Transporte privado mediante aplicación',
    subParkingCar: 'Aparcamientos públicos en Braga',
    subParkingBike: 'Mapa de aparcamiento para bicicletas',
    subPark4night: 'Áreas de servicio y pernocta en Braga',
    subMobie: 'Red pública nacional de carga eléctrica',
    subElectromaps: 'Mapa de cargadores y estado en directo',
    subTesla: 'Supercargadores y cargadores Tesla',
    subPlugshare: 'Comunidad y mapa global de cargadores',
    subChargemap: 'Planificador de rutas para coches eléctricos',
    subOpencharge: 'Directorio abierto de puntos de carga',
    subDgeg: 'Comparador oficial de precios de combustible',
    subMaisgasolina: 'Gasolineras y precios actualizados en Portugal',
    subGoogleGas: 'Estaciones de servicio cercanas en Braga',

    // Quick Mobility Guide Modal
    guideModalTitle: 'Guía Rápida de Movilidad en Braga',
    guideModalClose: 'Cerrar Guía',
    guideBodyHtml: `
      <h3><i class="fa-solid fa-plane-arrival" aria-hidden="true"></i> Aeropuerto de Oporto (OPO) ↔ Braga</h3>
      <ul>
        <li><strong>Opción más rápida (Directo ~50 min):</strong> Autobús <strong>GetBus</strong> directo del Aeropuerto a la Estación Central de Braga (CCTB).</li>
        <li><strong>Opción en tren (~1h30):</strong> Tome el Metro de Oporto (Línea E — Violeta) hasta <em>Campanhã</em> y enlace con el tren <strong>CP Urbano</strong> directo a Braga.</li>
      </ul>

      <h3><i class="fa-solid fa-bus-simple" aria-hidden="true"></i> Cómo usar los Autobuses Urbanos (TUB)</h3>
      <ul>
        <li><strong>Billetes:</strong> Puede comprar un billete sencillo a bordo (al conductor) o recargar una tarjeta en los puntos de venta TUB.</li>
        <li><strong>Santuarios:</strong> La <strong>Línea 2</strong> llega al Funicular de Bom Jesus; la <strong>Línea 88</strong> sube hasta el Santuario de Sameiro.</li>
      </ul>

      <h3><i class="fa-solid fa-person-walking" aria-hidden="true"></i> Centro Histórico Peatonal</h3>
      <ul>
        <li><strong>Estación de Trenes (CP) → Centro:</strong> ~10 minutos a pie.</li>
        <li><strong>Estación de Autobuses (CCTB) → Centro:</strong> ~8 minutos a pie.</li>
        <li><strong>Oficina de Turismo → Catedral (Sé):</strong> ~5 minutos a pie.</li>
      </ul>

      <h3><i class="fa-solid fa-road" aria-hidden="true"></i> Conducir y Peajes</h3>
      <p>Las autopistas A3 y A11 combinan peajes manuales y electrónicos. Si conduce un vehículo con matrícula extranjera, vincule su tarjeta bancaria a la matrícula (PT Tolls / Via Verde Visitors).</p>

      <h3><i class="fa-solid fa-phone" aria-hidden="true"></i> Contactos Útiles (Sin Conexión)</h3>
      <ul>
        <li><strong>Oficina de Turismo de Braga:</strong> <a href="tel:+351253262550">+351 253 262 550</a> (Av. da Liberdade, nº 1)</li>
        <li><strong>Emergencias Europa:</strong> <a href="tel:112">112</a></li>
      </ul>
    `,

    // iOS Install Modal
    iosModalTitle: 'Instalar en iPhone / iPad',
    iosModalClose: 'Entendido',
    iosModalBodyHtml: `
      <p>Añada <strong>Movilidad en Braga</strong> a su pantalla de inicio para acceder en un toque y consultar sin conexión la Guía Rápida y contactos:</p>
      <ul>
        <li><strong>1.</strong> Pulse el botón <strong>Compartir</strong> <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> en la barra de Safari.</li>
        <li><strong>2.</strong> Deslice hacia abajo y seleccione <strong>Añadir a pantalla de inicio</strong>.</li>
        <li><strong>3.</strong> Confirme pulsando en <strong>Añadir</strong>.</li>
      </ul>
    `,

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
        <li><strong>Almacenamiento Estrictamente Necesario:</strong> Utilizamos únicamente almacenamiento local esencial (LocalStorage y caché offline PWA) en su dispositivo para recordar el idioma seleccionado y ofrecer acceso sin conexión a la guía.</li>
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
    `,

    // Real-Time TUB Urban Bus Schedules
    tubLiveCardTitle: 'Horarios TUB en Tiempo Real',
    tubLiveCardSub: 'Próximas salidas por parada, GPS y líneas activas',
    tubHomeBannerTitle: 'Horarios TUB en Tiempo Real',
    tubHomeBannerSub: 'Consulte próximos autobuses por parada, GPS o línea activa en Braga',
    tubModalTitle: 'Horarios TUB en Tiempo Real',
    tubModalClose: 'Cerrar',
    tubTabStops: 'Por Parada',
    tubTabLines: 'Líneas Activas',
    tubStopSearchPlaceholder: 'Buscar parada TUB (ej: Central, Bom Jesus, Estación)...',
    tubLineSearchPlaceholder: 'Filtrar línea (ej: 2, 88, 24, Bom Jesus)...',
    tubNearbyBtn: 'Cerca de mí',
    tubRefreshAria: 'Actualizar horarios TUB',
    tubStopGpsLabel: 'Ruta GPS',
    tubSourceNote: 'API Movilidad · TUB Braga · Actualización 30s',
    tubOpenMapBtn: 'Mapa TUB',
    tubSpotCentral: 'Av. Central I',
    tubSpotCentral3: 'Av. Central III',
    tubSpotTrain: 'Estación CP',
    tubSpotBusTerminal: 'Est. Autobuses',
    tubSpotBomJesus: 'Bom Jesus',
    tubSpotSameiro: 'Sameiro',
    tubSpotUminho: 'U. Minho',
    tubSpotHospital: 'Hospital',
    tubNow: 'Ahora',
    tubInMinutes: 'en {min} min',
    tubAllLines: 'Todas',
    tubStatusLive: 'Tiempo real',
    tubStatusScheduled: 'Previsto',
    tubStatusCancelled: 'Suprimido',
    tubLoadingDepartures: 'Cargando próximas salidas TUB...',
    tubLoadingLines: 'Cargando líneas activas en Braga...',
    tubLoadingTrip: 'Cargando paradas del recorrido...',
    tubSearchingStops: 'Buscando paradas TUB...',
    tubNoDepartures: 'No hay salidas previstas en este momento para esta parada.',
    tubNoStopsFound: 'No se encontraron paradas TUB.',
    tubNoLinesFound: 'No hay líneas activas con ese filtro.',
    tubNoItinerary: 'Recorrido detallado no disponible para este viaje.',
    tubSearchResultsTitle: 'Paradas encontradas',
    tubNearbyResultsTitle: 'Paradas más cercanas a usted',
    tubActiveLinesCount: '{count} líneas en circulación ahora',
    tubActiveTripsLabel: '{n} viajes activos',
    tubBackToLines: 'Volver a las líneas',
    tubViewStopHint: 'Ver salidas de esta parada',
    tubGeoLocating: 'Localizando paradas TUB cercanas...',
    tubGeoUnavailable: 'La geolocalización no es compatible con este navegador.',
    tubGeoDenied: 'Permiso de ubicación denegado. Utilice la búsqueda de paradas.',
    tubGeoOutsideBraga: 'Su ubicación está fuera de Braga. Elija una parada arriba.',
    tubOfflineError: 'Sin conexión a internet. Conéctese para consultar horarios en tiempo real.',
    tubErrorFetch: 'No se pudieron obtener los horarios TUB en este momento. Inténtelo de nuevo.',
    tubTabPlanner: 'Destino',
    tubSpotBragaParque: 'Braga Parque',
    tubPlanFromLabel: 'Origen',
    tubPlanToLabel: 'Destino',
    tubPlanFromPlaceholder: '¿Desde dónde sale? (ej: Av. Central, Estación)...',
    tubPlanToPlaceholder: '¿A dónde va? (ej: Bom Jesus, Braga Parque, Hospital)...',
    tubPlanGpsAria: 'Usar mi ubicación actual como origen',
    tubPlanSwapAria: 'Intercambiar origen y destino',
    tubPlanSubmitBtn: 'Ver qué autobús coger',
    tubPlanQuickLabel: 'Destinos frecuentes en Braga:',
    tubPlanMyLocation: 'Mi ubicación (GPS)',
    tubPlanStopBadge: 'Parada TUB',
    tubPlanEmptyHint: 'Elija un destino arriba (o pulse un destino frecuente) para ver qué autobús TUB coger.',
    tubPlanSearching: 'Buscando el mejor autobús TUB...',
    tubPlanPickBoth: 'Indique un origen y un destino en Braga.',
    tubPlanSamePlace: 'El origen y el destino son iguales. Elija un destino diferente.',
    tubPlanNoPlaces: 'No se encontraron paradas o lugares en Braga.',
    tubPlanNoRoutes: 'No hay conexiones TUB disponibles ahora mismo para este trayecto.',
    tubPlanWalkOnly: 'Este destino está cerca a pie: unos {min} min ({dist}), sin necesidad de autobús.',
    tubPlanWalkOption: 'También accesible a pie en unos {min} min ({dist}).',
    tubPlanTakeBusLabel: 'Coger autobús',
    tubPlanTakeBusesLabel: 'Coger autobuses',
    tubPlanDirect: 'Directo',
    tubPlanOneTransfer: '1 transbordo',
    tubPlanTransfers: '{n} transbordos',
    tubPlanWalkStepDist: 'Caminar {min} min ({dist}) hasta {to}',
    tubPlanWalkStep: 'Caminar {min} min hasta {to}',
    tubPlanDestinationWord: 'el destino',
    tubPlanBusLinePrefix: 'Línea',
    tubPlanStopsCount: '{n} paradas',
    tubPlanViewBoardingStop: 'Ver parada',
    tubPlanShowStops: 'Paradas ({n})'
  },

  fr: {
    pageTitle: 'Mobilité à Braga — Visit Braga',
    metaDescription: 'Planifiez votre voyage vers Braga et déplacez-vous facilement en ville : trains, autocars, péages, aéroport de Porto, bus urbains (TUB), taxis, parking, camping-cars et Bom Jesus.',
    title: 'Mobilité à Braga',
    description: 'Planifiez votre voyage et déplacez-vous en ville :',
    quickGuideBtn: 'Guide Rapide',
    pwaInstallBtn: "Installer l'App",
    offlineBannerText: 'Mode hors ligne — Guide rapide, lignes et contacts disponibles.',
    btnArrive: 'Voyager vers Braga',
    btnArriveSub: 'Trains, autocars, voiture, trafic et aéroport',
    btnAround: 'Se Déplacer',
    btnAroundSub: 'TUB, GPS points clés, Bom Jesus, à pied et parking',
    tabArrive: 'Voyager vers Braga',
    tabAround: 'Se Déplacer',
    labelBack: 'Accueil',
    brandHomeAria: "Retourner à l'écran d'accueil — Visit Braga",
    searchPlaceholder: 'Rechercher : péages, aéroport, Bom Jesus, camping-car...',
    searchAriaLabel: 'Rechercher des services de mobilité',
    searchClearAria: 'Effacer la recherche',
    searchEmptyText: 'Aucun service trouvé dans cette section.',
    searchSwitchBtn: "Voir les résultats dans l'autre section",
    langAriaLabel: 'Changer de langue',
    externalLinkTitle: 'Ouvre dans un nouvel onglet',

    // Headings
    trainHeading: "<i class='fas fa-train' aria-hidden='true'></i> Trains & Planificateur",
    busHeading: "<i class='fas fa-bus' aria-hidden='true'></i> Autocars",
    tollsHeading: "<i class='fas fa-road' aria-hidden='true'></i> Voiture & Trafic",
    planeHeading: "<i class='fas fa-plane-departure' aria-hidden='true'></i> Avion",
    rentacarHeading: "<i class='fas fa-car' aria-hidden='true'></i> Location de Voitures",
    carpoolHeading: "<i class='fas fa-car-side' aria-hidden='true'></i> Covoiturage",
    tubLiveHeading: "<i class='fas fa-clock' aria-hidden='true'></i> Horaires TUB en Temps Réel",
    urbanHeading: "<i class='fas fa-city' aria-hidden='true'></i> Transports Publics",
    keySpotsHeading: "<i class='fas fa-location-crosshairs' aria-hidden='true'></i> Points Clés (GPS)",
    sanctuariesHeading: "<i class='fas fa-mountain' aria-hidden='true'></i> Bom Jesus & Sameiro",
    softMobilityHeading: "<i class='fas fa-person-walking' aria-hidden='true'></i> À Pied & Vélo",
    taxisHeading: "<i class='fas fa-taxi' aria-hidden='true'></i> Taxis & VTC",
    parkingHeading: "<i class='fas fa-square-parking' aria-hidden='true'></i> Parking & Camping-cars",
    evHeading: "<i class='fas fa-charging-station' aria-hidden='true'></i> Bornes de Recharge",
    fuelHeading: "<i class='fas fa-gas-pump' aria-hidden='true'></i> Stations-Service",

    // Contextual tips
    tipCar: "Les autoroutes d'accès à Braga (A3/A11) utilisent des péages manuels et électroniques. Enregistrez votre plaque si vous conduisez un véhicule étranger.",
    tipPlane: "L'Aéroport de Porto (OPO) se trouve à environ 45 min de Braga, avec navette directe (GetBus) ou liaison ferroviaire (CP).",
    tipSanctuaries: 'La Ligne 2 des TUB relie le centre au Funiculaire du Bom Jesus ; la Ligne 88 monte jusqu’au Sanctuaire du Sameiro.',
    tipWalking: 'Le centre historique de Braga est largement piétonnier : la gare CP est à ~10 min et la gare routière à ~8 min à pied du centre.',

    // Card titles
    cp: 'CP - Trains',
    rome2rio: 'Rome2Rio (Planificateur)',
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
    wazeTraffic: 'Waze (Trafic à Braga)',
    ana: 'Aéroport de Porto',
    skyscanner: 'Skyscanner',
    googleFlights: 'Google Flights',
    rentalcars: 'Rentalcars',
    kayak: 'Kayak (Voitures)',
    blablacar: 'BlaBlaCar',
    tub: 'TUB (Bus Urbains)',
    tubMap: 'TUB — Carte Interactive',
    moovit: 'Moovit (Braga)',
    spotTouristOffice: 'Office de Tourisme',
    spotTrainStation: 'Gare Ferroviaire (CP)',
    spotBusTerminal: 'Gare Routière (CCTB)',
    spotHistoricCenter: 'Centre Historique / Cathédrale',
    bomJesusElevator: 'Funiculaire du Bom Jesus',
    bomJesusTransit: 'Bus vers Bom Jesus',
    sameiroTransit: 'Bus vers le Sameiro',
    walkingMap: 'Centre Historique à Pied',
    cyclingNetwork: 'Réseau Cyclable de Braga',
    bragataxis: 'Braga Táxis',
    taxisbraga: 'Táxis Braga',
    economicotaxis: 'Económico Táxis',
    uber: 'Uber',
    bolt: 'Bolt',
    parkingCar: 'Parking (Voitures)',
    parkingBike: 'Parking (Vélos)',
    park4night: 'Camping-cars (Park4Night)',
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
    subRome2rio: 'Combiner vol, train et bus vers Braga',
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
    subWazeTraffic: 'Conditions de circulation et alertes en direct',
    subAna: 'Infos vols et accès aéroport (OPO)',
    subSkyscanner: 'Comparateur de vols vers Porto',
    subGoogleFlights: 'Recherche de tarifs et horaires de vols',
    subRentalcars: 'Comparateur de location de voitures',
    subKayak: 'Recherche de voitures de location au Portugal',
    subBlablacar: 'Covoiturage entre villes',
    subTub: 'Réseau municipal de bus urbains de Braga',
    subTubMap: 'Carte des lignes, arrêts et bus urbains',
    subMoovit: 'Planificateur multimodal bus et trains',
    subSpotTouristOffice: 'Av. da Liberdade · Itinéraire GPS à pied',
    subSpotTrainStation: '~10 min à pied du centre · Itinéraire GPS',
    subSpotBusTerminal: '~8 min à pied du centre · Itinéraire GPS',
    subSpotHistoricCenter: 'Zone piétonne · Itinéraire GPS à pied',
    subBomJesusElevator: 'Funiculaire historique à contrepoids d’eau',
    subBomJesusTransit: 'TUB Ligne 2 · Itinéraires en direct',
    subSameiroTransit: 'TUB Ligne 88 · Itinéraires en direct',
    subWalkingMap: 'Itinéraire piéton vers Praça da República',
    subCyclingNetwork: 'Pistes cyclables et équipements vélos',
    subBoltScooters: 'Trottinettes et vélos en libre-service',
    subBragataxis: 'Centrale de taxis 24h/24 à Braga',
    subTaxisbraga: 'Taxis locaux et transferts privés',
    subEconomicotaxis: 'Taxis à Braga et transfert aéroport',
    subUber: 'VTC à la demande via application',
    subBolt: 'VTC à la demande via application',
    subParkingCar: 'Parkings publics automobiles à Braga',
    subParkingBike: 'Carte des stationnements vélos',
    subPark4night: 'Aires de services et nuitées à Braga',
    subMobie: 'Réseau public national de recharge électrique',
    subElectromaps: 'Carte des bornes et disponibilité en direct',
    subTesla: 'Superchargeurs et bornes Tesla',
    subPlugshare: 'Carte communautaire des bornes de recharge',
    subChargemap: "Planificateur d'itinéraires électriques",
    subOpencharge: 'Répertoire ouvert des points de charge',
    subDgeg: 'Comparateur officiel des prix du carburant',
    subMaisgasolina: 'Stations et prix actualisés au Portugal',
    subGoogleGas: 'Stations-service les plus proches à Braga',

    // Quick Mobility Guide Modal
    guideModalTitle: 'Guide Rapide de Mobilité à Braga',
    guideModalClose: 'Fermer le Guide',
    guideBodyHtml: `
      <h3><i class="fa-solid fa-plane-arrival" aria-hidden="true"></i> Aéroport de Porto (OPO) ↔ Braga</h3>
      <ul>
        <li><strong>Option la plus rapide (Direct ~50 min) :</strong> Navette <strong>GetBus</strong> directe de l'Aéroport à la Gare Routière de Braga (CCTB).</li>
        <li><strong>Option train (~1h30) :</strong> Prenez le Métro de Porto (Ligne E — Violette) jusqu'à <em>Campanhã</em>, puis le train <strong>CP Urbain</strong> direct vers Braga.</li>
      </ul>

      <h3><i class="fa-solid fa-bus-simple" aria-hidden="true"></i> Utiliser les Bus Urbains (TUB)</h3>
      <ul>
        <li><strong>Billets :</strong> Achetez un ticket à bord auprès du chauffeur ou rechargez une carte aux guichets TUB et points de vente agréés.</li>
        <li><strong>Sanctuaires :</strong> La <strong>Ligne 2</strong> rejoint le Funiculaire du Bom Jesus ; la <strong>Ligne 88</strong> monte jusqu'au Sanctuaire du Sameiro.</li>
      </ul>

      <h3><i class="fa-solid fa-person-walking" aria-hidden="true"></i> Centre Historique Piétonnier</h3>
      <ul>
        <li><strong>Gare CP → Centre-ville :</strong> ~10 minutes à pied.</li>
        <li><strong>Gare Routière (CCTB) → Centre-ville :</strong> ~8 minutes à pied.</li>
        <li><strong>Office de Tourisme → Cathédrale (Sé) :</strong> ~5 minutes à pied.</li>
      </ul>

      <h3><i class="fa-solid fa-road" aria-hidden="true"></i> Conduite et Péages</h3>
      <p>Les autoroutes A3 et A11 combinent péages manuels et électroniques. Avec une plaque étrangère, associez votre carte bancaire à votre immatriculation (PT Tolls / Via Verde Visitors).</p>

      <h3><i class="fa-solid fa-phone" aria-hidden="true"></i> Contacts Utiles (Hors Ligne)</h3>
      <ul>
        <li><strong>Office de Tourisme de Braga :</strong> <a href="tel:+351253262550">+351 253 262 550</a> (Av. da Liberdade, nº 1)</li>
        <li><strong>Urgences Europe :</strong> <a href="tel:112">112</a></li>
      </ul>
    `,

    // iOS Install Modal
    iosModalTitle: 'Installer sur iPhone / iPad',
    iosModalClose: 'Compris',
    iosModalBodyHtml: `
      <p>Ajoutez <strong>Mobilité à Braga</strong> sur votre écran d'accueil pour un accès instantané et consulter hors ligne le Guide Rapide et les contacts :</p>
      <ul>
        <li><strong>1.</strong> Touchez le bouton <strong>Partager</strong> <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> dans Safari.</li>
        <li><strong>2.</strong> Faites défiler et choisissez <strong>Sur l'écran d'accueil</strong>.</li>
        <li><strong>3.</strong> Validez en appuyant sur <strong>Ajouter</strong>.</li>
      </ul>
    `,

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
        <li><strong>Stockage Strictement Nécessaire :</strong> Nous utilisons uniquement le stockage local essentiel (LocalStorage et cache hors ligne PWA) sur votre appareil afin de mémoriser votre langue et rendre le guide accessible hors ligne.</li>
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
    `,

    // Real-Time TUB Urban Bus Schedules
    tubLiveCardTitle: 'Horaires TUB en Temps Réel',
    tubLiveCardSub: 'Prochains départs par arrêt, GPS et lignes actives',
    tubHomeBannerTitle: 'Horaires TUB en Temps Réel',
    tubHomeBannerSub: 'Prochains bus par arrêt, GPS ou ligne active à Braga',
    tubModalTitle: 'Horaires TUB en Temps Réel',
    tubModalClose: 'Fermer',
    tubTabStops: 'Par Arrêt',
    tubTabLines: 'Lignes Actives',
    tubStopSearchPlaceholder: 'Rechercher un arrêt TUB (ex : Central, Bom Jesus, Gare)...',
    tubLineSearchPlaceholder: 'Filtrer une ligne (ex : 2, 88, 24, Bom Jesus)...',
    tubNearbyBtn: 'Autour de moi',
    tubRefreshAria: 'Actualiser les horaires TUB',
    tubStopGpsLabel: 'Itinéraire GPS',
    tubSourceNote: 'API Mobilité · TUB Braga · Actualisation 30s',
    tubOpenMapBtn: 'Carte TUB',
    tubSpotCentral: 'Av. Central I',
    tubSpotCentral3: 'Av. Central III',
    tubSpotTrain: 'Gare CP',
    tubSpotBusTerminal: 'Gare Routière',
    tubSpotBomJesus: 'Bom Jesus',
    tubSpotSameiro: 'Sameiro',
    tubSpotUminho: 'U. Minho',
    tubSpotHospital: 'Hôpital',
    tubNow: 'Maintenant',
    tubInMinutes: 'dans {min} min',
    tubAllLines: 'Toutes',
    tubStatusLive: 'Temps réel',
    tubStatusScheduled: 'Prévu',
    tubStatusCancelled: 'Supprimé',
    tubLoadingDepartures: 'Chargement des prochains départs TUB...',
    tubLoadingLines: 'Chargement des lignes actives à Braga...',
    tubLoadingTrip: 'Chargement des arrêts du trajet...',
    tubSearchingStops: 'Recherche d’arrêts TUB...',
    tubNoDepartures: 'Aucun départ prévu prochainement pour cet arrêt.',
    tubNoStopsFound: 'Aucun arrêt TUB trouvé.',
    tubNoLinesFound: 'Aucune ligne active ne correspond à ce filtre.',
    tubNoItinerary: 'Liste détaillée des arrêts indisponible pour ce trajet.',
    tubSearchResultsTitle: 'Arrêts trouvés',
    tubNearbyResultsTitle: 'Arrêts TUB les plus proches',
    tubActiveLinesCount: '{count} lignes en circulation actuellement',
    tubActiveTripsLabel: '{n} trajets actifs',
    tubBackToLines: 'Retour aux lignes',
    tubViewStopHint: 'Voir les départs de cet arrêt',
    tubGeoLocating: 'Recherche des arrêts TUB à proximité...',
    tubGeoUnavailable: 'La géolocalisation n’est pas prise en charge par ce navigateur.',
    tubGeoDenied: 'Autorisation de localisation refusée. Utilisez la recherche d’arrêts.',
    tubGeoOutsideBraga: 'Votre position est en dehors de Braga. Choisissez un arrêt ci-dessus.',
    tubOfflineError: 'Hors ligne. Reconnectez-vous pour consulter les horaires en temps réel.',
    tubErrorFetch: 'Impossible de charger les horaires TUB pour le moment. Réessayez.',
    tubTabPlanner: 'Destination',
    tubSpotBragaParque: 'Braga Parque',
    tubPlanFromLabel: 'Départ',
    tubPlanToLabel: 'Destination',
    tubPlanFromPlaceholder: 'D’où partez-vous ? (ex : Av. Central, Gare)...',
    tubPlanToPlaceholder: 'Où allez-vous ? (ex : Bom Jesus, Braga Parque, Hôpital)...',
    tubPlanGpsAria: 'Utiliser ma position actuelle comme départ',
    tubPlanSwapAria: 'Inverser départ et destination',
    tubPlanSubmitBtn: 'Voir quel bus prendre',
    tubPlanQuickLabel: 'Destinations fréquentes à Braga :',
    tubPlanMyLocation: 'Ma position (GPS)',
    tubPlanStopBadge: 'Arrêt TUB',
    tubPlanEmptyHint: 'Choisissez une destination ci-dessus (ou un lieu fréquent) pour voir quel bus TUB prendre.',
    tubPlanSearching: 'Recherche du meilleur bus TUB...',
    tubPlanPickBoth: 'Veuillez indiquer un point de départ et une destination à Braga.',
    tubPlanSamePlace: 'Le départ et la destination sont identiques. Choisissez une autre destination.',
    tubPlanNoPlaces: 'Aucun arrêt ou lieu trouvé à Braga.',
    tubPlanNoRoutes: 'Aucune liaison TUB disponible actuellement pour ce trajet.',
    tubPlanWalkOnly: 'Cette destination est proche à pied : environ {min} min ({dist}), sans besoin de bus.',
    tubPlanWalkOption: 'Également accessible à pied en environ {min} min ({dist}).',
    tubPlanTakeBusLabel: 'Prendre le bus',
    tubPlanTakeBusesLabel: 'Prendre les bus',
    tubPlanDirect: 'Direct',
    tubPlanOneTransfer: '1 correspondance',
    tubPlanTransfers: '{n} correspondances',
    tubPlanWalkStepDist: 'Marcher {min} min ({dist}) jusqu’à {to}',
    tubPlanWalkStep: 'Marcher {min} min jusqu’à {to}',
    tubPlanDestinationWord: 'la destination',
    tubPlanBusLinePrefix: 'Ligne',
    tubPlanStopsCount: '{n} arrêts',
    tubPlanViewBoardingStop: 'Voir l’arrêt',
    tubPlanShowStops: 'Arrêts ({n})'
  }
};

/**
 * Mapping between DOM element IDs and their textContent translation keys.
 */
export const TEXT_BINDINGS = {
  'title': 'title',
  'description': 'description',
  'quick-guide-label': 'quickGuideBtn',
  'pwa-install-label': 'pwaInstallBtn',
  'offline-banner-text': 'offlineBannerText',
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
  'tip-walking': 'tipWalking',
  'label-cp': 'cp',
  'sub-cp': 'subCp',
  'label-rome2rio': 'rome2rio',
  'sub-rome2rio': 'subRome2rio',
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
  'label-waze-traffic': 'wazeTraffic',
  'sub-waze-traffic': 'subWazeTraffic',
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
  'label-tub-map': 'tubMap',
  'sub-tub-map': 'subTubMap',
  'label-spot-tourist-office': 'spotTouristOffice',
  'sub-spot-tourist-office': 'subSpotTouristOffice',
  'label-spot-train-station': 'spotTrainStation',
  'sub-spot-train-station': 'subSpotTrainStation',
  'label-spot-bus-terminal': 'spotBusTerminal',
  'sub-spot-bus-terminal': 'subSpotBusTerminal',
  'label-spot-historic-center': 'spotHistoricCenter',
  'sub-spot-historic-center': 'subSpotHistoricCenter',
  'label-bom-jesus-elevator': 'bomJesusElevator',
  'sub-bom-jesus-elevator': 'subBomJesusElevator',
  'label-bom-jesus-transit': 'bomJesusTransit',
  'sub-bom-jesus-transit': 'subBomJesusTransit',
  'label-sameiro-transit': 'sameiroTransit',
  'sub-sameiro-transit': 'subSameiroTransit',
  'label-walking-map': 'walkingMap',
  'sub-walking-map': 'subWalkingMap',
  'label-cycling-network': 'cyclingNetwork',
  'sub-cycling-network': 'subCyclingNetwork',
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
  'label-park4night': 'park4night',
  'sub-park4night': 'subPark4night',
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
  'tub-tab-stops-label': 'tubTabStops',
  'tub-tab-planner-label': 'tubTabPlanner',
  'tub-tab-lines-label': 'tubTabLines',
  'tub-plan-from-label': 'tubPlanFromLabel',
  'tub-plan-to-label': 'tubPlanToLabel',
  'tub-plan-submit-label': 'tubPlanSubmitBtn',
  'tub-plan-quick-label': 'tubPlanQuickLabel',
  'tub-nearby-label': 'tubNearbyBtn',
  'tub-stop-gps-label': 'tubStopGpsLabel',
  'tub-source-note': 'tubSourceNote',
  'tub-open-map-label': 'tubOpenMapBtn',
  'guide-modal-title': 'guideModalTitle',
  'close-guide-modal': 'guideModalClose',
  'ios-modal-title': 'iosModalTitle',
  'close-ios-modal': 'iosModalClose',
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
  'tub-live-heading': 'tubLiveHeading',
  'urban-heading': 'urbanHeading',
  'key-spots-heading': 'keySpotsHeading',
  'sanctuaries-heading': 'sanctuariesHeading',
  'soft-mobility-heading': 'softMobilityHeading',
  'taxis-heading': 'taxisHeading',
  'parking-heading': 'parkingHeading',
  'ev-heading': 'evHeading',
  'fuel-heading': 'fuelHeading',
  'guide-modal-body': 'guideBodyHtml',
  'ios-modal-body': 'iosModalBodyHtml',
  'privacy-modal-body': 'privacyBodyHtml'
};

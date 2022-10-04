import { states } from './assets/States/index.json'

export const stateData = (() => {
  let allStates = [] as { label: string; value: string }[]
  for (let i = 0; i < states.length; i++) {
    let item = { label: states[i].name, value: states[i].name }
    allStates.push(item)
  }
  return allStates
})()

export const dataHotel = [
  {
    name: 'Aranwa Cusco Hotel',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/aranwa-cusco3-820x537.jpg',
    ratings: 5,
    reviews: 200,
    location: {
      lat: -13.52264,
      lon: -71.96734,
      address: ''
    },
    beds: 3,
    value: 1000,
    taxesAndChargesInclude: true,
    freeCancellation: true,
    noPrepaymentNeeded: true,
    city: 'Cusco',
    country: 'Peru',
    from: '9/18/2022',
    to: '9/20/2022',
    description:
      'Inaugurado em 1844 e administrado pela mesma família desde então, o Baur au Lac já teve hóspedes ilustres como Joan Miró e Plácido Domingo. Localizado em um jardim próximo à rua Bahnhofstrasse (equivalente à Quinta Avenida em Zurique), o hotel tem vista para o Lago de Zurique e os Alpes Suíços — mas essa não é a única visão agradável. No interior, os quartos combinam estilos Art Déco, Luís XVI e Regência com bom gosto, decorados individualmente em tons neutros. Se quiser ostentar, o restaurante Pavillon com estrela Michelin vale a pena.'
  },
  {
    name: 'Sofitel Legend Santa Clara ',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/sofitel-legend-santa-clara-cartagena-capa2019-820x430.jpg',
    ratings: 5,
    reviews: 190,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 1000,
    taxesAndChargesInclude: false,
    freeCancellation: true,
    noPrepaymentNeeded: true,
    city: 'Cartagena',
    country: 'Colômbia',
    from: '8/18/2022',
    to: '8/21/2022',
    description:
      'A América do Sul levou a medalha de prata no ranking com o Sofitel Legend Santa Clara em Cartagena, um antigo convento do século XVII, que mistura elementos do passado (tetos de madeira expostos, belas passarelas em arco) com modernidade de uma forma muito harmoniosa. Localizado a uma curta distância do Palácio da Inquisição e a cerca de sete minutos a pé da praia, os quartos do hotel são contemporâneos ou em estilo colonial. Os mais novos oferecem vista para a piscina ou o Caribe, enquanto as suítes coloniais têm móveis antigos e vista para o centro histórico ou jardins internos. Confira o Restaurante 1621, que já foi a sala de jantar das freiras clarissas, e agora serve pratos da culinária francesa.'
  },
  {
    name: 'Baur au Lac',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/melhores-hoteis-do-mundo-baur-au-lac-820x545.jpg',
    ratings: 4.5,
    reviews: 170,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 990,
    taxesAndChargesInclude: true,
    freeCancellation: true,
    noPrepaymentNeeded: true,
    city: 'Zurique',
    country: 'Suiça',
    from: '7/19/2022',
    to: '7/29/2022',
    description:
      'A apenas duas quadras da Plaza de Armas em Cusco, o Aranwa Cusco Boutique Hotel é uma mansão em estilo colonial do século XVI, cuidadosamente reformada com sistemas inteligentes de oxigênio (para lidar com a altitude de 3.400 metros da cidade), piso aquecido e banheiras de hidromassagem em suas 43 suítes. O hotel abriga mais de 300 peças de arte, incluindo pinturas da escola de Cusco, entalhes e esculturas, então reserve um tempo para dar uma volta antes de se deliciar com pratos peruanos como camarão em quinoa orgânica e lombo de alpaca. Ah, e não se esqueça do pisco sour, bebida típica do Peru.'
  },
  {
    name: 'The Peninsula House',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/the-peninsula-house-melhores-hoteis-do-mundo-860x860.jpg',
    ratings: 5,
    reviews: 10,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 4,
    value: 300,
    taxesAndChargesInclude: true,
    freeCancellation: true,
    noPrepaymentNeeded: true,
    city: 'Santo Domingo',
    country: 'Rep. Dominicana',
    from: '8/08/2022',
    to: '8/10/2022',
    description:
      'The Peninsula House é uma propriedade familiar, situada numa colina da Península de Samaná, na República Dominicana, com vista para o Atlântico à distância. O design colonial vitoriano evoca uma casa do século 18 (cheia de arte eclética, incluindo uma coleção de ovelhas de madeira). Os belos quartos em tons de terra têm pisos de madeira brasileira, antiguidades como baús de bambu chineses e armários indianos e banheiras de mogno. Desfrute de bebidas no terraço ou dirija-se ao Beach Restaurant para um almoço com frutos do mar.'
  },
  {
    name: 'Mandarin Oriental Doha',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/mandarin-oriental-doha-melhores-hoteis-do-mundo-820x580.jpg',
    ratings: 3,
    reviews: 90,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 1,
    value: 500,
    taxesAndChargesInclude: false,
    freeCancellation: false,
    noPrepaymentNeeded: false,
    city: 'Doha',
    country: 'Catar',
    from: '5/14/2022',
    to: '5/20/2022',
    description:
      'O Catar tem excelente opções de hotéis para os torcedores da Copa do Mundo de 2022. No recém-criado distrito de Msheireb, o Mandarin Oriental Doha destaca a herança do Catar com um design sofisticado. As janelas são sombreadas com grades de janela tradicionais, as maçanetas são feitas para parecerem com chifres de órix e padrões de dunas de areia surgem em tapetes e luminárias. A piscina da cobertura e suas cabanas à beira da piscina são um dos melhores locais da cidade para assistir ao pôr do sol.'
  },
  {
    name: 'Sofitel Bogotá Regia',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/sofitel-bogota-820x614.jpg',
    ratings: 3,
    reviews: 70,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 600,
    taxesAndChargesInclude: true,
    freeCancellation: false,
    noPrepaymentNeeded: true,
    city: 'Bogotá',
    country: 'Colômbia',
    from: '6/15/2022',
    to: '6/20/2022',
    description:
      'Nomeado em homenagem à vitória-régia, uma planta flutuante típica da Amazônia, o Sofitel Bogotá Victoria Regia impregna o sabor colombiano com elegantes toques franceses. A propriedade foi projetada pelo renomado arquiteto Miguel Soto, que dirigiu toda o conceito de “Colômbia e França, meio a meio”: pense em móveis de veludo, obras de arte locais em rotação, flores frescas substituídas diariamente e artigos de higiene Hermès. Seus 102 quartos — incluindo cinco suítes — são elegantes e confortáveis, enquanto o restaurante Basilic oferece alta cozinha francesa e uma carta de vinhos considerável.'
  },
  {
    name: 'Olema House Point Reyes',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/melhores-hoteis-do-mundo-olema-house-820x547.jpg',
    ratings: 1,
    reviews: 5,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 300,
    taxesAndChargesInclude: false,
    freeCancellation: false,
    noPrepaymentNeeded: true,
    city: 'Califórnia',
    country: 'EUA',
    from: '9/04/2022',
    to: '9/06/2022',
    description:
      'O Olema House Point Reyes oferece uma estadia tranquila no cênico litoral da Califórnia. Seus 24 quartos, que incluem dois chalés, possuem piso aquecido, edredons e travesseiros de plumas com decoração americana. Caso queira comer no hotel, o menu local e sazonal do Due West vem da fartura de fazendas e baía próximas, com ingredientes como ostras, barriga de porco em conserva caseira e abóbora . O café da manhã gratuito inclui bolos frescos, frutas e embutidos.'
  },
  {
    name: 'Raffles Istanbul',
    image:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/melhores-hoteis-do-mundo-raffles-istanbul-820x547.jpg',
    ratings: 4,
    reviews: 50,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 700,
    taxesAndChargesInclude: false,
    freeCancellation: true,
    noPrepaymentNeeded: false,
    city: 'Istambul',
    country: 'Turquia',
    from: '5/09/2022',
    to: '5/12/2022',
    description:
      'Embora seja um hotel elegante e moderno com seus impecáveis 185 quartos, o endereço do Raffles Istambul ainda canaliza o encanto e mistério bizantino da cidade. Considere as vistas deslumbrantes de quase todos os quartos e os tecidos turcos exuberantes, artesanato (como metal e vidro perfurado semelhantes aos encontrados na Mesquita Azul) e fotos emolduradas de locais famosos. Localizado no bairro central de Besiktas, no lado europeu, o hotel coloca os hóspedes no topo de uma variedade de lojas, restaurantes e um centro de artes cênicas. O Bósforo também não está muito longe (é possível vê-lo de alguns quartos), mas as atrações turísticas e locais históricos estão um pouco mais longe.'
  },
  {
    name: 'W Bogotá',
    image: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/w-bogota-2-820x547.jpg',
    ratings: 2,
    reviews: 10,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 100,
    taxesAndChargesInclude: true,
    freeCancellation: true,
    noPrepaymentNeeded: false,
    city: 'Bogotá',
    country: 'Colômbia',
    from: '9/12/2022',
    to: '9/16/2022',
    description:
      'A Colômbia tem crescido na preferências dos turistas nos últimos anos — e com três representantes na lista, confie no W Bogotá como aquele que acompanha as tendências mais recentes. Inaugurado no final de 2014, o hotel está localizado no coração do bairro nobre de Usaquen, na capital colombiana, colocando os hóspedes ao lado de embaixadas, restaurantes e boutiques. Espere por uma decoração colorida e moderna em todos os 168 quartos, especialmente na suíte Extreme Wow, que inclui uma cama king-size com dossel floral, um sofá circular vanguardista (e roxo!), com vista de 180 graus da cidade. Não perca o brunch ou o jantar no Martin Kitchen antes de relaxar com uma bebida e música ao vivo no W Lounge.'
  },
  {
    name: 'The Peninsula',
    image: 'https://cdn.pixabay.com/photo/2014/08/10/11/56/greece-414676__340.jpg',
    ratings: 3.5,
    reviews: 25,
    location: {
      lat: 0,
      lon: 0,
      address: ''
    },
    beds: 2,
    value: 660,
    taxesAndChargesInclude: true,
    freeCancellation: true,
    noPrepaymentNeeded: true,
    city: 'Bangkok',
    country: 'Tailândia',
    from: '9/21/2022',
    to: '9/28/2022',
    description:
      'Parece que você está em Londres quando se hospeda no The Peninsula, em Bangkok, graças aos veículos de corrida britânicos estacionados em frente. Mas o tuk-tuk personalizado do hotel logo lembra que você está na Tailândia. Tons ricos e quentes de caramelo percorrem o lobby e os salões; o espaço oferece vistas magníficas sobre o rio Chao Praya. A piscina do The Peninsula está entre as melhores da cidade; não há maneira melhor de vencer o calor numa capital famosa pelo clima quente do que dando um mergulho.'
  }
]

export const commentsReviews = [
  {
    userImage: 'There is no image.',
    user: '',
    datePublish: '',
    comment: ''
  },
  {
    userImage: 'There is no image.',
    user: '',
    datePublish: '',
    comment: ''
  },
  {
    userImage: 'There is no image.',
    user: '',
    datePublish: '',
    comment: ''
  }
]

export const gallery = [
  'https://cf.bstatic.com/xdata/images/hotel/square200/381306642.webp?k=449bd6750c9e9c663fcd6ce7d1c2f5c36e1ae248d6424bb06dcd9fbe6a79394d&o=&s=1',
  'https://cf.bstatic.com/xdata/images/hotel/square200/320889160.webp?k=f5ea2773ce0b80e1b8624017c10aa972d9919af31a2543f0bf7d41ff9c0a2693&o=&s=1',
  'https://cf.bstatic.com/xdata/images/hotel/square200/297032294.webp?k=7ae435c3a31e2341deb9d85efbd29235f20a2b293e1cadb5b8df36fd54deacc3&o=&s=1',
  'https://cf.bstatic.com/xdata/images/hotel/square200/344063400.webp?k=251daf0866cb6f7c0ad2acde6a17eaadde239309770339c814bb277312d038d0&o=&s=1',
  'https://cf.bstatic.com/xdata/images/hotel/square200/299126070.webp?k=565d9421f9a50fbc454c05e5be7368137c278ccd220adc9599629edcca1c51a1&o=&s=1',
  'https://cf.bstatic.com/xdata/images/hotel/square200/284753992.webp?k=9b091d7813c2428bb2bbf389fc777f5e8febca241100183d4c3e786dd31c80a5&o=&s=1'
]

// export const popularHotels = [
//   {
//     img: 'https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2017/03/09/06/30/pool-2128578__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2015/07/14/07/18/greece-844269__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2017/03/09/06/30/pool-2128578__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2015/07/14/07/18/greece-844269__340.jpg',
//     title: 'Town / City',
//     text: 'Country'
//   }
// ]

// export const destinationIdeas = [
//   {
//     img: 'https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256__340.jpg',
//     text: 'Place   00 Date - 00 Date'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2017/03/09/06/30/pool-2128578__340.jpg',
//     text: 'Place   00 Date - 00 Date'
//   },
//   {
//     img: 'https://cdn.pixabay.com/photo/2015/07/14/07/18/greece-844269__340.jpg',
//     text: 'Place   00 Date - 00 Date'
//   }
// ]

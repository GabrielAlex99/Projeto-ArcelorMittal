import { Relato, SolucaoPadrao, Proposta } from '../types';

export const initialRelatos: Relato[] = [
  {
    id: '1',
    bairro: 'Jesuítas (Santa Cruz - RJ)',
    problema: 'Particulado siderúrgico sedimentável (Fumaça Prateada)',
    descricao: 'Presença constante de poeira de ferro de usina siderúrgica local, manchando varandas, corroendo fiações elétricas e provocando crises respiratórias infantis. Concentrações medidas ultrapassam recorrentemente a média diária de 50 µg/m³ estabelecida pelo CONAMA 491/2018.',
    gravidade: 'Alta',
    categoria: 'Ar',
    frequência: 'Diária',
    autor: 'Associação de Moradores de Jesuítas',
    data: '2026-05-28',
    coordenadas: { x: 28, y: 44 },
    vulnerabilidade: 'Alta',
    numRelatos: 142
  },
  {
    id: '2',
    bairro: 'Vila Parisi (Cubatão - SP)',
    problema: 'Ruído industrial noturno acima de limits da NBR 10151',
    descricao: 'Emissão contínua de exaustores de fundição e moagem operando após o horário comercial. Medições independentes indicam níveis de 68 dBA ao ar livre no período noturno, ultrapassando o zoneamento de limite residencial e inviabilizando o repouso saudável.',
    gravidade: 'Média',
    categoria: 'Ruído',
    frequência: 'Intermitente (noturno)',
    autor: 'Carlos Eduardo Nascimento (Eng. Acústica)',
    data: '2026-05-30',
    coordenadas: { x: 44, y: 36 },
    vulnerabilidade: 'Média',
    numRelatos: 85
  },
  {
    id: '3',
    bairro: 'Santa Cruz dos Navegantes (Guarujá - SP)',
    problema: 'Assoreamento e poluidores no Canal do Porto',
    descricao: 'Vazamentos pontuais de óleos combustíveis na zona de manobra de navios e arraste de fuligem das chaminés de cargueiros de grande porte. A comunidade pesqueira artesanal reporta diminuição de espécies nativas no estuário interno.',
    gravidade: 'Alta',
    categoria: 'Água',
    frequência: 'Sempre que há alta maré e tráfego pesado',
    autor: 'Cooperativa COOPESPA',
    data: '2026-06-01',
    coordenadas: { x: 67, y: 72 },
    vulnerabilidade: 'Alta',
    numRelatos: 94
  },
  {
    id: '4',
    bairro: 'Bairro Veneza (Ipatinga - MG)',
    problema: 'Ilhas de calor e fallout de fuligem de coque',
    descricao: 'Redução drástica da arborização perimetral próxima aos limites da aciaria. Temperaturas aferidas por radares térmicos locais chegam a registrar 5°C acima da média rural. Precipitação de partículas de carbono negro que afetam diretamente as calçadas residenciais.',
    gravidade: 'Média',
    categoria: 'Verde urbano',
    frequência: 'Constante',
    autor: 'Prof.ª Luciana Mendes Silva (UFM-VCA)',
    data: '2026-05-25',
    coordenadas: { x: 21, y: 76 },
    vulnerabilidade: 'Média',
    numRelatos: 63
  },
  {
    id: '5',
    bairro: 'Zona Residencial (Candiota - RS)',
    problema: 'Dispersão de poeira de cinzas de carvão mineral',
    descricao: 'Pluma visível de emissão de particulados na área de depósito de cinzas sob ventos fortes. Saturação das canaletas locais de microdrenagem, contaminando águas pluviais rasas com resíduos alcalinos sedimentados.',
    gravidade: 'Alta',
    categoria: 'Mobilidade', // Utilized for logistical layout inside existing core framework categories
    frequência: 'Dias com ventos superiores a 25 km/h',
    autor: 'Fórum Sul de Justiça Climática',
    data: '2026-06-02',
    coordenadas: { x: 52, y: 18 },
    vulnerabilidade: 'Baixa',
    numRelatos: 41
  }
];

export const initialPropostas: Proposta[] = [
  {
    id: 'p1',
    titulo: 'Barreira Biológica de Ipês e Sibipirunas no Canal de Jesuítas',
    autor: 'Coletivo Agroecológico EcoCarioca',
    problemaRelacionado: 'Sedimentação de partículas de ferro nas residências de Santa Cruz (RJ).',
    descricao: 'Implantação de cinturão verde em faixas de amortecimento de 50 metros de largura ao redor do polo industrial. Utilização de árvores de copa densa (Ipê-Rosa e Sibipiruna) consorciadas com espécies arbustivas nativas para retenção natural por adsorção de poeira e regulação térmica do vento.',
    categoria: 'Barreiras verdes',
    custo: 'Médio',
    prazo: '6 meses',
    impacto: 'Redução estimada em até 45% do material particulado arrastado pelos ventos sul-sudeste, além do sequestro direto de CO2.',
    viabilidade: 'Alta'
  },
  {
    id: 'p2',
    titulo: 'Convênio de Economia Circular de Agregados Reciclados (Cubatão)',
    autor: 'Faculdade de Engenharia Industrial Mogi',
    problemaRelacionado: 'Descarte e acumulação de agregados siderúrgicos no leito de vias industriais secundárias.',
    descricao: 'Desenvolvimento de blocos intertravados para calcamento de vias próximas e praças públicas locais a partir de coprodutos de alto-forno inertizados. Projeto promove integração comunitária com capacitação profissional de jovens vulnerabilizados.',
    categoria: 'Economia circular',
    custo: 'Baixo',
    prazo: '3 meses',
    impacto: 'Mitigação de poeira de asfalto secundário, redução do uso de agregados virgens e fomento à cooperativa de reciclagem de materiais.',
    viabilidade: 'Alta'
  }
];

export const solucoesPadrao: SolucaoPadrao[] = [
  {
    id: 's1',
    titulo: 'Barreiras Biológicas Densas de Cordonamento',
    problemaRelacionado: 'Dispersão de poeira de minério e folhelho metálico atmosférico.',
    descricao: 'Criação de barreiras biológicas de múltiplos estratos (erva-baleeira, manacá-da-serra e ipês) dispostas ortogonalmente aos corredores de propagação de ventos.',
    impactoEsperado: 'Redução média de 40% nas taxas de sedimentação de ferro em perímetros residenciais urbanos.',
    complexidade: 'Baixa',
    categoria: 'Barreiras verdes'
  },
  {
    id: 's2',
    titulo: 'Zoneamento Georreferenciado e Rodízio Logístico',
    problemaRelacionado: 'Tráfego pesado de frotas industriais, poluentes de diesel e ruído urbano noturno.',
    descricao: 'Implantação de rotas logísticas pré-definidas com limitação rígida de passagem noturna integrada com sistemas RFID de detecção de infração comunitária.',
    impactoEsperado: 'Atenuação acústica instantânea de até 18 dBA no período noturno em bairros lindeiros.',
    complexidade: 'Média',
    categoria: 'Mobilidade'
  },
  {
    id: 's3',
    titulo: 'Jardins de Chuva para Bacias de Retenção Pluvial',
    problemaRelacionado: 'Enchentes em comunidades adjacentes decorrentes de impermeabilização industrial.',
    descricao: 'Zonas côncavas permeáveis vegetadas com espécies da Mata Atlântica para desaceleração, decantação e fito-remediação natural de metais pesados antes do deságue pluvial no estuário.',
    impactoEsperado: 'Redução de até 60% nas taxas de alagamentos catastróficos e remoção de poluição difusa de asfalto.',
    complexidade: 'Baixa',
    categoria: 'Verde urbano'
  },
  {
    id: 's4',
    titulo: 'Rede Popular de Sensores de Particulados PM2.5 / PM10',
    problemaRelacionado: 'Assimetria de dados de qualidade do ar entre a empresa e a população.',
    descricao: 'Distruibuição de sensores públicos conectados via IoT em escolas municipais e varandas comunitárias, alimentando dashboard de dados abiertos e alertas meteorológicos.',
    impactoEsperado: 'Transparência em governança ESG, fornecimento de evidências fáticas para defesas em saúde e mitigação de picos de emissão.',
    complexidade: 'Média',
    categoria: 'Ar'
  },
  {
    id: 's5',
    titulo: 'Compostagem Comunitária e Quintais Agroecológicos',
    problemaRelacionado: 'Descarte irregular de resíduos domésticos e áreas desmatadas geradoras de poeira.',
    descricao: 'Rede de compostagem de resíduos orgânicos das indústrias e refeitórios acoplada ao fomento de mudas para reflorestamento e proteção contra voçorocas urbanas.',
    impactoEsperado: 'Diminuição da carga orgânica enviada a aterros e fixação do solo para eliminação de poeira em áreas vazias.',
    complexidade: 'Baixa',
    categoria: 'Ar'
  },
  {
    id: 's6',
    titulo: 'Cooperativismo Produtivo para Resíduos Sólidos Industriais',
    problemaRelacionado: 'Logística de lixo reciclável e exclusão socioeconômica de populações locais.',
    descricao: 'Contratação preferencial e profissional com salários justos de cooperativas independentes para triagem de subprodutos secos não-perigosos gerados nos escritórios industriais.',
    impactoEsperado: 'Geração direta de renda para dezenas de famílias locais e destinação circular segura de resíduos.',
    complexidade: 'Alta',
    categoria: 'Resíduos'
  }
];

export function About() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-8">Sobre Nós</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-xl text-zinc-300 leading-relaxed">
              Bem-vindo à <strong className="text-lime-400">HubBra</strong>, onde a paixão pelo futebol encontra a excelência em produtos! 
              Somos uma loja 100% brasileira, criada por apaixonados pelo esporte mais amado do país.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase tracking-wide text-lime-400 mb-4">Nossa História</h2>
            <p className="text-zinc-400 leading-relaxed">
              Fundada em 2030, a HubBra nasceu do sonho de três amigos que cresceram jogando bola nas ruas. 
              Cansados de buscar produtos de qualidade para expressar nossa paixão pelo futebol, 
              decidimos criar um espaço onde todo torcedor brasileiro pudesse encontrar os melhores produtos 
              dos seus times do coração, tanto nacionais quanto internacionais.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              O que começou como uma pequena loja online se transformou.
              Hoje, atendemos milhares de clientes em todo o território nacional, 
              sempre com o mesmo compromisso: entregar autenticidade, qualidade e a emoção que só o futebol 
              pode proporcionar.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase tracking-wide text-lime-400 mb-4">Nossa Missão</h2>
            <p className="text-zinc-400 leading-relaxed">
              Conectar torcedores apaixonados aos produtos oficiais dos seus clubes favoritos, oferecendo 
              uma experiência de compra excepcional, produtos 100% autênticos e um atendimento que reflete 
              o calor e a paixão do povo brasileiro. Queremos que cada cliente vista as cores do seu time 
              com orgulho e autenticidade.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase tracking-wide text-lime-400 mb-4">O Que Nos Diferencia</h2>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white mb-2">Autenticidade Garantida</h3>
                <p className="text-zinc-400">
                  Trabalhamos apenas com fornecedores oficiais e licenciados. Cada produto vendido em nossa 
                  loja é 100% original, com certificado de autenticidade. Você pode confiar que está levando 
                  para casa o verdadeiro manto do seu time.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white mb-2">Paixão Brasileira</h3>
                <p className="text-zinc-400">
                  Somos torcedores como você! Entendemos a emoção de vestir a camisa do time, de torcer até 
                  o último minuto, de celebrar cada vitória. Essa paixão se reflete em cada detalhe do nosso 
                  atendimento e na curadoria dos nossos produtos.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white mb-2">Entrega para Todo Brasil</h3>
                <p className="text-zinc-400">
                  Do Oiapoque ao Chuí, levamos a emoção do futebol até você. Com centros de distribuição 
                  estrategicamente localizados e parcerias com as melhores transportadoras, garantimos 
                  entregas rápidas e seguras em todo o território nacional.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white mb-2">Variedade Incomparável</h3>
                <p className="text-zinc-400">
                  De camisas de times brasileiros como Flamengo, Palmeiras, Corinthians e Grêmio, até os 
                  gigantes europeus como Barcelona, Real Madrid, Manchester United e PSG. Temos o maior 
                  catálogo de produtos oficiais de futebol do Brasil.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase tracking-wide text-lime-400 mb-4">Nossos Valores</h2>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start">
                <span className="text-lime-400 font-bold mr-2">✓</span>
                <span><strong className="text-white">Transparência:</strong> Preços justos, sem taxas escondidas</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-400 font-bold mr-2">✓</span>
                <span><strong className="text-white">Qualidade:</strong> Apenas produtos originais e certificados</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-400 font-bold mr-2">✓</span>
                <span><strong className="text-white">Respeito:</strong> Atendimento humanizado e personalizado</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-400 font-bold mr-2">✓</span>
                <span><strong className="text-white">Paixão:</strong> Amor genuíno pelo futebol em tudo que fazemos</span>
              </li>
              <li className="flex items-start">
                <span className="text-lime-400 font-bold mr-2">✓</span>
                <span><strong className="text-white">Compromisso:</strong> Com a satisfação total dos nossos clientes</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase tracking-wide text-lime-400 mb-4">Junte-se à Nossa Torcida</h2>
            <p className="text-zinc-400 leading-relaxed">
              Mais do que uma loja, a HubBra é uma comunidade de apaixonados por futebol. Seja você torcedor 
              fanático ou amante casual do esporte, aqui você encontra seu lugar. Vamos juntos celebrar cada 
              gol, cada título, cada momento mágico que só o futebol pode nos dar.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Vista-se com orgulho. Vista-se com autenticidade. Vista a camisa do seu time com a HubBra.
            </p>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-4">Entre em Contato</h2>
            <p className="text-zinc-400 mb-3">
              Tem alguma dúvida ou sugestão? Nossa equipe está sempre pronta para te atender!
            </p>
            <div className="space-y-2 text-zinc-400">
              <p>📧 E-mail: contato@hubbra.com.br</p>
              <p>📱 WhatsApp: (11) 98765-4321</p>
              <p>🕐 Horário de atendimento: Segunda a Sexta, 9h às 18h | Sábado, 9h às 14h</p>
            </div>
          </section>

          <p className="text-center text-lg font-black text-lime-400 mt-8 uppercase tracking-wider">
            HubBra - A paixão do brasileiro em cada produto! ⚽💚💛
          </p>
        </div>
      </div>
    </div>
  );
}

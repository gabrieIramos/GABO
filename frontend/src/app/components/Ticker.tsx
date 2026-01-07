export function Ticker() {
  const items = [
    'FRETE GRÁTIS',
    'LANÇAMENTOS 24/25',
    'EDIÇÕES LIMITADAS',
    'CAMISAS OFICIAIS',
    'ENTREGA RÁPIDA',
    'QUALIDADE PREMIUM',
  ];

  return (
    <div className="bg-lime-400 overflow-hidden py-3">
      <div className="relative flex whitespace-nowrap">
        {/* Animação de scroll infinito */}
        <style>{`
          @keyframes scroll-ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .ticker-animate {
            animation: scroll-ticker 25s linear infinite;
          }
        `}</style>
        
        <div className="ticker-animate flex gap-8 md:gap-12">
          {/* Duplicate content for seamless loop */}
          {[...items, ...items, ...items].map((item, idx) => (
            <span
              key={idx}
              className="text-black font-black uppercase tracking-widest text-sm md:text-base flex items-center gap-3"
            >
              <span className="text-black text-xl">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

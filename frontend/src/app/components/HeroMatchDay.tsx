import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HeroTitle } from './HeroTitle';

export function HeroMatchDay() {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Background com gradiente agressivo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black">
        {/* Noise/Mesh texture em background */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlUGVydHVyYk5vaXNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSIyIiAvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgLz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      {/* Conteúdo Hero */}
      <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center px-4 md:px-12 lg:px-24 z-10">
        <div className="w-full max-w-6xl">
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <div className="border border-lime-400 bg-lime-400/5 text-lime-400 px-4 py-2 text-xs md:text-sm uppercase tracking-widest font-bold inline-block">
                ⚡ MATCH DAY COLLECTION
              </div>
            </motion.div>

            {/* Título Principal - Inclinado e Agressivo */}
            <div className="-skew-x-6 origin-left">
              <HeroTitle className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic uppercase text-white tracking-tighter leading-none">
                DOMINAMOS O
              </HeroTitle>
              <HeroTitle className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic uppercase text-lime-400 drop-shadow-[0_0_30px_rgba(168,255,0,0.6)] tracking-tighter leading-none">
                CAMPO
              </HeroTitle>
            </div>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed"
            >
              Camisas oficiais, edições limitadas e coleções exclusivas. Sinta a paixão e a tática em cada peça.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Button */}
              <Link
                to="/products"
                className="group relative overflow-hidden bg-lime-400 text-black font-black uppercase tracking-wider px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(168,255,0,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Comprar Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/products"
                className="border-2 border-zinc-600 text-white font-bold uppercase tracking-wider px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:border-lime-400 hover:text-lime-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,255,0,0.3)]"
              >
                Explorar Coleção
              </Link>
            </motion.div>

            {/* Detalhes de Destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="hidden sm:flex flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-lime-400"></div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Frete</p>
                  <p className="text-lg font-bold text-white">Grátis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-lime-400"></div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Entrega</p>
                  <p className="text-lg font-bold text-white">24h-48h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-lime-400"></div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Garantia</p>
                  <p className="text-lg font-bold text-white">100%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Player Image - Slide In with Fade Mask */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full pointer-events-none -skew-x-3 md:right-0 md:bottom-0 md:top-0 md:left-auto md:w-[50vw] md:h-auto"
      >
        {/* Backlight - Aura verde atrás do jogador */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-lime-500/10 md:bg-lime-500/20 rounded-full blur-[120px] -z-10"></div>
        
        {/* Camada de Ruído para textura */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlUHVyYmFsZU5vaXNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSIyIiAvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgLz48L3N2Zz4=')] bg-repeat z-20 pointer-events-none"></div>
        
        <img
          src="https://i.redd.it/gf4er3ziy0od1.png"
          alt="Player"
          className="h-full w-full object-cover object-top opacity-30 mix-blend-screen contrast-125 brightness-110 saturate-20 md:opacity-100 md:mix-blend-normal md:object-center"
          style={{
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to left, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to left, black 40%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in'
          }}
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 border border-lime-400/10 opacity-20" />
      <div className="absolute bottom-20 left-5 w-32 h-32 border border-lime-400/10 opacity-20" />
    </div>
  );
}

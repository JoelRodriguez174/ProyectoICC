import React from 'react';

const Testing = () => {
  const sparkles = Array.from({ length: 30 });

  return (
    <div className="relative flex flex-col items-center justify-center p-4 min-h-[600px] w-full bg-[#050505] rounded-[40px] shadow-2xl overflow-hidden border border-white/10">
      
      {/* Background - Very subtle deep violet for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,10,50,0.15)_0%,_transparent_70%)]"></div>

      {/* Starfield / Sparkles - Smaller and sharper */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* Typography - Minimalist & Refined */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-thin text-white tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase">
            Lara
          </h1>
          <div className="h-[1px] w-12 mx-auto mt-6 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        {/* The Flower - Redesigned for Crystal Elegance */}
        <div className="relative w-72 h-72 flex items-center justify-center" style={{ perspective: '2000px' }}>
          
          {/* Main 3D Flower Group */}
          <div className="relative w-full h-full flex items-center justify-center animate-float-slow" 
               style={{ transformStyle: 'preserve-3d', transform: 'rotateX(50deg)' }}>
            
            {/* Outer Petals - Wider and More Lifted */}
            <div className="absolute inset-0 animate-[spin_40s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
              {[...Array(12)].map((_, i) => (
                <div
                  key={`outer-${i}`}
                  className="absolute top-1/2 left-1/2 w-12 h-36 bg-gradient-to-t from-pink-500/5 via-white/10 to-white/30 border-l border-white/10"
                  style={{
                    borderRadius: '100% 0% 100% 0%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotateZ(${i * 30}deg) rotateX(-30deg)`,
                    backdropFilter: 'blur(1px)',
                  }}
                ></div>
              ))}
            </div>

            {/* Middle Petals - Structure and soft glow */}
            <div className="absolute inset-0 animate-[spin_25s_linear_infinite_reverse]" style={{ transformStyle: 'preserve-3d' }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={`mid-${i}`}
                  className="absolute top-1/2 left-1/2 w-8 h-28 bg-gradient-to-t from-pink-300/40 via-white/60 to-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  style={{
                    borderRadius: '100% 0% 100% 0%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotateZ(${i * 45}deg) rotateX(-45deg) translateZ(5px)`,
                  }}
                ></div>
              ))}
            </div>

            {/* Inner Petals - Soft Silk White */}
            <div className="absolute inset-0 animate-pulse-soft" style={{ transformStyle: 'preserve-3d' }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={`inner-${i}`}
                  className="absolute top-1/2 left-1/2 w-6 h-16 bg-gradient-to-t from-white via-pink-50/50 to-white"
                  style={{
                    borderRadius: '100% 0% 100% 0%',
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotateZ(${i * 60}deg) rotateX(-70deg) translateZ(15px)`,
                  }}
                ></div>
              ))}
            </div>

            {/* Core - Clean Gold Jewel */}
            <div className="z-50 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(253,224,71,0.3)] border border-white/10"
                 style={{ transform: 'translateZ(30px)' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white/80 rounded-full blur-[0.5px]"></div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-20">
           <p className="text-white/20 text-[9px] tracking-[0.8em] uppercase font-light animate-pulse">Eterna</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float-slow {
          0%, 100% { transform: rotateX(50deg) translateY(0px); }
          50% { transform: rotateX(50deg) translateY(-10px); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 8s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1) rotateZ(0deg); }
          50% { transform: scale(1.05) rotateZ(5deg); }
        }
      `}} />
    </div>
  );
};

export default Testing;

import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

const profileImg = '/profile.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.p {...fadeUp(0.1)} className="text-[#00b4ff] text-sm font-semibold tracking-widest uppercase mb-3">
            Welcome to my portfolio
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Hi, I'm{' '}
            <span className="neon-text">Yashwanth</span>
            <br />
            <span className="text-slate-200">Chowdary Mannem</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="text-lg sm:text-xl text-[#00b4ff] font-medium mb-4">
            Full Stack Developer &amp; Data Science Student
          </motion.p>

          <motion.p {...fadeUp(0.45)} className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
            Passionate about building scalable web applications using React, Spring Boot, and modern technologies.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="glow-btn px-7 py-3 rounded-full text-white font-semibold text-sm"
            >
              View Projects
            </button>
            <button
              onClick={async () => {
                const res = await fetch('/resume.pdf')
                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'Yashwanth_Chowdary_Mannem_Resume.pdf'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="outline-btn px-7 py-3 rounded-full font-semibold text-sm"
            >
              Download Resume
            </button>
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
            {/* Animated glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00b4ff, #0066ff, transparent, #00b4ff)',
                padding: '3px',
              }}
            />
            <div className="absolute inset-[3px] rounded-full bg-[#050a14]" />
            <img
              src={profileImg}
              alt="Yashwanth Chowdary Mannem"
              className="absolute inset-[6px] rounded-full object-cover w-[calc(100%-12px)] h-[calc(100%-12px)]"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback avatar */}
            <div
              className="absolute inset-[6px] rounded-full hidden items-center justify-center text-5xl font-bold neon-text bg-[#0a1628]"
              style={{ display: 'none' }}
            >
              YC
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FiArrowDown className="text-[#00b4ff]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward, FiBook, FiCode } from 'react-icons/fi'

const education = [
  {
    icon: <FiBook />,
    degree: 'B.Tech – CSE (Data Science)',
    institution: 'Mohan Babu University, Tirupati',
    period: '2023 – Present',
    score: 'CGPA: 8.9 / 10',
  },
  {
    icon: <FiAward />,
    degree: 'Intermediate (Class XII)',
    institution: 'Narayana Junior College',
    period: '2021 – 2023',
    score: 'Percentage: 93.5%',
  },
  {
    icon: <FiAward />,
    degree: 'Secondary School (Class X)',
    institution: 'Sri Chaitanya School',
    period: '2020 – 2021',
    score: 'Percentage: 100%',
  },
]

const certifications = [
  'Data Visualization Certification – Forage',
  'XHorizon Hackathon (24 hrs) – Website Development',
  'STEP English Certification – Band 8.5',
  'Java Certification – Infosys Springboard',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">About <span className="neon-text">Me</span></h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <FiCode className="text-[#00b4ff] text-xl" />
              <h3 className="text-lg font-semibold text-white">Who I Am</h3>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              I'm a Computer Science student specializing in Data Science at Mohan Babu University, Tirupati,
              with a strong passion for full-stack development.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              I have hands-on experience building real-world applications using React, Spring Boot, and PHP.
              I enjoy solving complex problems and turning ideas into clean, scalable software.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I'm actively seeking opportunities to apply my skills in a professional environment and grow
              as a developer.
            </p>

            <div className="mt-6 pt-6 border-t border-blue-900/30 grid grid-cols-2 gap-4">
              {[
                ['Email', 'mannemyashwanthchowdary@gmail.com'],
                ['Phone', '+91-6302521722'],
                ['Languages', 'Telugu, English'],
                ['Location', 'Tirupati, India'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-[#00b4ff] font-semibold uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-slate-300 text-sm break-all">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education + Certs */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-5">Education</h3>
              <div className="flex flex-col gap-5">
                {education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 text-[#00b4ff] text-lg flex-shrink-0">{edu.icon}</div>
                    <div>
                      <p className="text-white font-medium text-sm">{edu.degree}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{edu.institution}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-slate-500">{edu.period}</span>
                        <span className="text-xs text-[#00b4ff] font-semibold">{edu.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
              <ul className="flex flex-col gap-2">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-[#00b4ff] mt-1 flex-shrink-0">▸</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

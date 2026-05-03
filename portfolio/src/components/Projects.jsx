import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'College Event Management System',
    description:
      'A web-based system to manage multiple college events and student participation. Features admin approval workflow for publishing events, participation analytics, and real-time notifications for students on event updates.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/yashuu1422',
    highlights: [
      'Admin approval workflow for event publishing',
      'Participation analytics dashboard',
      'Real-time student notifications',
    ],
    color: '#00b4ff',
  },
  {
    title: 'CarbonCalc – Carbon Footprint Tracker',
    description:
      'A full-stack carbon footprint tracking application with gamification features. Built with React and Spring Boot, featuring JWT-based authentication, badges, goals, and a leaderboard system.',
    tech: ['React', 'Spring Boot', 'JWT', 'REST API', 'MySQL'],
    github: 'https://github.com/yashuu1422',
    highlights: [
      'JWT-based secure authentication',
      'Gamification: badges, goals, leaderboard',
      'Responsive UI with data visualizations',
    ],
    color: '#00e5a0',
  },
  {
    title: 'BugWhack – Debug the Code!',
    description:
      'A gamified browser game where you click bugs before they escape and crash your code. Features 4 bug types, combo multipliers, difficulty levels, and a high-score system.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/yashuu1422',
    live: '/bugwhack/index.html',
    highlights: [
      '4 bug types: Normal, Speedy, Bomb & Golden Star',
      'Combo multipliers (up to 3x) and rank system',
      'Easy / Medium / Hard difficulty with local high score',
    ],
    color: '#ffd700',
  },
  {
    title: 'Music Player Management System',
    description:
      'A database system for managing songs, albums, artists, and users. Features normalized schema design, complex SQL queries with joins and aggregations, and user activity reports.',
    tech: ['SQL', 'MySQL', 'Database Design'],
    github: 'https://github.com/yashuu1422',
    highlights: [
      'Normalized schema to reduce redundancy',
      'Complex SQL queries (joins, aggregations)',
      'User activity and trend reports',
    ],
    color: '#a855f7',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#00b4ff] transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3 flex-shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#00b4ff] transition-colors text-xl"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#00b4ff] transition-colors text-xl"
              aria-label="Live demo"
            >
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

      <ul className="flex flex-col gap-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
            <span style={{ color: project.color }} className="mt-0.5 flex-shrink-0">▸</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              background: `${project.color}10`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">Featured <span className="neon-text">Projects</span></h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/yashuu1422"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm"
          >
            <FiGithub />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaJava, FaPython, FaPhp, FaHtml5, FaCss3Alt, FaReact,
  FaBootstrap, FaNodeJs, FaGitAlt, FaDatabase,
} from 'react-icons/fa'
import {
  SiJavascript, SiMysql, SiPostgresql, SiSpringboot,
  SiPostman, SiJupyter,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: <FaJava /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'PHP', icon: <FaPhp /> },
      { name: 'SQL', icon: <FaDatabase /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'Bootstrap', icon: <FaBootstrap /> },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Spring Boot', icon: <SiSpringboot /> },
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'PHP', icon: <FaPhp /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'VS Code', icon: <VscCode /> },
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Jupyter', icon: <SiJupyter /> },
    ],
  },
]

function SkillBadge({ name, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="glass rounded-xl px-4 py-3 flex items-center gap-3 cursor-default group"
    >
      <span className="text-[#00b4ff] text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-slate-300 text-sm font-medium">{name}</span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6 bg-[#070d1a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">Technical <span className="neon-text">Skills</span></h2>
          <div className="section-line" />
        </motion.div>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <h3 className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <SkillBadge key={skill.name} {...skill} delay={gi * 0.1 + si * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-6"
        >
          <h3 className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-4">Concepts</h3>
          <div className="flex flex-wrap gap-2">
            {['REST APIs', 'JWT Authentication', 'Full Stack Development', 'Web Development', 'Data Science', 'Database Design', 'Responsive UI'].map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 border border-blue-900/50 bg-blue-950/30">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

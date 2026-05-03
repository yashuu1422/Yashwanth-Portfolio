import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'

const contacts = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'mannemyashwanthchowdary@gmail.com',
    href: 'mailto:mannemyashwanthchowdary@gmail.com',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'MannemYashwanthChowdary',
    href: 'https://linkedin.com/in/MannemYashwanthChowdary',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'yashuu1422',
    href: 'https://github.com/yashuu1422',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const mailto = `mailto:mannemyashwanthchowdary@gmail.com?subject=${encodeURIComponent(form.subject.value)}&body=${encodeURIComponent(`Name: ${form.name.value}\n\n${form.message.value}`)}`
    window.location.href = mailto
  }

  return (
    <section id="contact" className="py-24 px-6 bg-[#070d1a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">Get In <span className="neon-text">Touch</span></h2>
          <div className="section-line" />
          <p className="text-center text-slate-400 max-w-xl mx-auto -mt-6 mb-12 text-sm">
            I'm open to internships, collaborations, and full-time opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="glass rounded-xl p-5 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-950/50 border border-blue-900/50 flex items-center justify-center text-[#00b4ff] text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-[#00b4ff] font-semibold uppercase tracking-wide">{c.label}</p>
                  <p className="text-slate-300 text-sm mt-0.5 break-all">{c.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-5 mt-2"
            >
              <p className="text-slate-400 text-sm leading-relaxed">
                Currently pursuing B.Tech in CSE (Data Science) and actively looking for opportunities
                to contribute to impactful projects. Let's build something great together.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-2xl p-8 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-[#00b4ff] font-semibold uppercase tracking-wide block mb-2">Name</label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full bg-blue-950/20 border border-blue-900/40 rounded-lg px-4 py-3 text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-[#00b4ff] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#00b4ff] font-semibold uppercase tracking-wide block mb-2">Subject</label>
                <input
                  name="subject"
                  required
                  placeholder="Subject"
                  className="w-full bg-blue-950/20 border border-blue-900/40 rounded-lg px-4 py-3 text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-[#00b4ff] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#00b4ff] font-semibold uppercase tracking-wide block mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Your message..."
                className="w-full bg-blue-950/20 border border-blue-900/40 rounded-lg px-4 py-3 text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-[#00b4ff] transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-btn w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <FiSend />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

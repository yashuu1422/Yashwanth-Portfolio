import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-blue-900/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © 2024 <span className="text-[#00b4ff]">Yashwanth Chowdary Mannem</span>. All rights reserved.
        </p>
        <div className="flex gap-5">
          {[
            { icon: <FiGithub />, href: 'https://github.com/yashuu1422', label: 'GitHub' },
            { icon: <FiLinkedin />, href: 'https://linkedin.com/in/MannemYashwanthChowdary', label: 'LinkedIn' },
            { icon: <FiMail />, href: 'mailto:mannemyashwanthchowdary@gmail.com', label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-[#00b4ff] transition-colors text-lg"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

import { content } from './data/content'
import { usePreferences } from './hooks/usePreferences'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Expertise } from './components/Expertise'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

export default function App() {
  const preferences = usePreferences()
  const c = content[preferences.locale]
  return <>
    <a className="skip-link" href="#main-content">{c.skip}</a>
    <Header c={c} {...preferences} />
    <main id="main-content"><Hero c={c} /><About c={c} /><Expertise c={c} /><Projects c={c} locale={preferences.locale} /><Experience c={c} /><Contact c={c} /></main>
  </>
}

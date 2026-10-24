import { Link } from 'react-router-dom'
import { ArrowLeft, Bug, CheckCircle2, ExternalLink, ListChecks, ShieldCheck } from 'lucide-react'
import { defaultCourse } from '../content/course'
import { courseThemeStyle } from '../lib/courseTheme'
import styles from './Issues.module.css'

const issuesUrl = 'https://github.com/PiRifle/granica/issues'
const newIssueUrl = `${issuesUrl}/new`

const steps = [
  {
    title: 'Sprawdź istniejące zgłoszenia',
    body: 'Może ktoś już widział ten problem. Przejrzyj otwarte zgłoszenia, zanim dodasz nowe.',
  },
  {
    title: 'Napisz, czego dotyczy',
    body: 'Podaj kurs, moduł i lekcję. Jeśli problem dotyczy animacji lub laboratorium, dopisz nazwę ćwiczenia.',
  },
  {
    title: 'Opisz, co się stało',
    body: 'Napisz, co zrobiłeś, co zobaczyłeś i czego oczekiwałeś. Zrzut ekranu bardzo pomaga.',
  },
  {
    title: 'Nie wklejaj danych wrażliwych',
    body: 'Nie dodawaj haseł, danych osobowych ani prywatnych informacji. Wystarczy opis problemu.',
  },
]

export function Issues() {
  return (
    <div className={styles.page} style={courseThemeStyle(defaultCourse.theme)}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.back}>
          <ArrowLeft size={16} />
          Wróć do kursów
        </Link>
        <span className={styles.badge}>
          <Bug size={16} /> GitHub Issues
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>ZGŁASZANIE PROBLEMÓW</span>
          <h1>Coś nie działa? Daj znać.</h1>
          <p>
            Granica jest projektem edukacyjnym. Jeśli lekcja się nie ładuje, wzór się nie zgadza albo laboratorium
            zachowuje się dziwnie, zgłoś to na GitHubie. Konkretne zgłoszenie wystarczy — nie musisz znać rozwiązania.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={newIssueUrl} target="_blank" rel="noreferrer">
              Otwórz nowe zgłoszenie
              <ExternalLink size={16} />
            </a>
            <a className={styles.secondary} href={issuesUrl} target="_blank" rel="noreferrer">
              Przeglądaj istniejące
              <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <section className={styles.grid} aria-label="Jak zgłosić problem">
          {steps.map((step, index) => (
            <article key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <CheckCircle2 className={styles.stepIcon} size={18} />
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </section>

        <section className={styles.template}>
          <div className={styles.templateHead}>
            <span className={styles.kicker}>PRZYKŁADOWY SZABLON</span>
            <h2>Skopiuj i uzupełnij</h2>
            <p>Nie musisz trzymać się szablonu, ale te informacje przyspieszają naprawę.</p>
          </div>
          <pre>{`Kurs: wytrzymałość / statyka
Moduł i lekcja: ...
Co się stało: ...
Czego oczekiwałem: ...
Przeglądarka i urządzenie: ...`}</pre>
          <div className={styles.templateFoot}>
            <ListChecks size={16} />
            <span>Dobre zgłoszenie to opis zachowania, nie tylko „nie działa”.</span>
          </div>
        </section>

        <aside className={styles.note}>
          <ShieldCheck />
          <div>
            <strong>Zgłoszenia są publiczne.</strong>
            <p>
              GitHub Issues jest widoczne dla wszystkich. Jeśli problem dotyczy bezpieczeństwa lub prywatnych danych,
              nie opisuj go publicznie — najpierw skontaktuj się z autorem projektu.
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}

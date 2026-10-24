import { useState } from 'react'
import { ArrowLeft, BookOpen, ExternalLink, GraduationCap, Library as LibraryIcon } from 'lucide-react'
import { literature, openSources, type LiteratureKind } from '../content/literature'
import { modules } from '../content/course'
import styles from './Library.module.css'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')

type Filter = 'all' | LiteratureKind

export function Library({ onBack, onModule }: { onBack: () => void; onModule: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all')
  const list = literature.filter((entry) => filter === 'all' || entry.kind === filter)
  const basicCount = literature.filter((entry) => entry.kind === 'podstawowa').length
  const extraCount = literature.filter((entry) => entry.kind === 'uzupelniajaca').length

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={onBack}>
          <ArrowLeft size={16} />
          Wróć do kursu
        </button>
        <span className={styles.badge}>
          <LibraryIcon size={16} /> {literature.length + openSources.length} pozycji
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>BIBLIOTEKA KURSU</span>
          <h1>Książki i źródła, na których opiera się kurs.</h1>
          <p>
            Najpierw pełna literatura z karty przedmiotu: sześć pozycji podstawowych i dwie uzupełniające. Obok nich
            otwarte podręczniki, z których korzystaliśmy merytorycznie przy rozbudowie lekcji. Linki prowadzą wyłącznie
            do legalnych stron wydawców i otwartych bibliotek.
          </p>
          <div className={styles.stats}>
            <span>
              <strong>{basicCount}</strong> podstawowych
            </span>
            <span>
              <strong>{extraCount}</strong> uzupełniające
            </span>
            <span>
              <strong>{openSources.length}</strong> otwarte podręczniki
            </span>
          </div>
        </section>

        <section className={styles.guide}>
          <article>
            <span>01</span>
            <strong>Najpierw lekcja</strong>
            <p>Przejdź lekcję i zrób quiz. Dopiero potem sięgaj do książki — będziesz wiedzieć, czego szukać.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Jeden rozdział naraz</strong>
            <p>Nie czytaj całej książki. Wybierz rozdział odpowiadający modułowi i rozwiąż 2–3 zadania.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Wracaj po wzory</strong>
            <p>Traktuj bibliotekę jak rozszerzenie ściągi: sprawdzaj założenia, jednostki i przypadki graniczne.</p>
          </article>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>LITERATURA Z SYLABUSA</span>
              <h2>Pozycje z karty przedmiotu</h2>
            </div>
            <div className={styles.filters} role="group" aria-label="Filtr literatury">
              <button className={cx(filter === 'all' && styles.active)} onClick={() => setFilter('all')}>
                Wszystkie
              </button>
              <button className={cx(filter === 'podstawowa' && styles.active)} onClick={() => setFilter('podstawowa')}>
                Podstawowe
              </button>
              <button
                className={cx(filter === 'uzupelniajaca' && styles.active)}
                onClick={() => setFilter('uzupelniajaca')}
              >
                Uzupełniające
              </button>
            </div>
          </div>

          <div className={styles.bookGrid}>
            {list.map((entry) => (
              <article key={entry.id} className={styles.bookCard}>
                <div className={styles.bookHead}>
                  <span className={styles.ref}>{entry.ref}</span>
                  <div>
                    <span className={styles.kind}>{entry.kind === 'podstawowa' ? 'PODSTAWOWA' : 'UZUPEŁNIAJĄCA'}</span>
                    <h3>{entry.title}</h3>
                    <p className={styles.authors}>{entry.authors}</p>
                    <p className={styles.meta}>
                      {entry.publisher}
                      {entry.year !== '—' ? `, ${entry.year}` : ''}
                      {entry.pages ? `, ${entry.pages} s.` : ''}
                      {entry.edition ? ` · ${entry.edition}` : ''}
                    </p>
                  </div>
                </div>
                <p className={styles.level}>
                  <GraduationCap size={14} /> {entry.level}
                </p>
                <p>{entry.focus}</p>
                <p className={styles.how}>
                  <strong>Jak korzystać:</strong> {entry.howToUse}
                </p>
                <div className={styles.modules}>
                  {entry.modules.map((id) => {
                    const module = modules.find((item) => item.id === id)
                    if (!module) return null
                    return (
                      <button key={id} onClick={() => onModule(id)}>
                        {module.number}. {module.shortTitle}
                      </button>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>OTWARTE ŹRÓDŁA</span>
              <h2>Pełne teksty, z których powstał kurs</h2>
            </div>
            <BookOpen className={styles.sectionIcon} />
          </div>
          <p className={styles.sectionNote}>
            Te podręczniki są dostępne legalnie online. Korzystaliśmy z nich, żeby rozwinąć wyprowadzenia, przykłady i
            opisy laboratoriów. Każda lekcja wskazuje, gdzie szukać rozwinięcia tematu.
          </p>
          <div className={styles.openGrid}>
            {openSources.map((source) => (
              <article key={source.id} className={styles.openCard}>
                <div className={styles.openTop}>
                  <span>{source.source}</span>
                  <span>{source.license}</span>
                </div>
                <h3>{source.title}</h3>
                <p className={styles.authors}>{source.authors}</p>
                <p>{source.covers}</p>
                <p className={styles.note}>{source.note}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  Otwórz podręcznik <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.disclaimer}>
          <strong>Dlaczego nie ma tu plików PDF książek z sylabusa?</strong>
          <p>
            Pozycje P1–P6 i U1–U2 są objęte prawem autorskim, więc nie kopiujemy ich do aplikacji. Podajemy pełne dane
            bibliograficzne i kierunek czytania; pełne teksty wypożyczysz w bibliotece uczelnianej. Otwarte podręczniki
            powyżej są legalnie dostępne online i to one posłużyły do rozbudowy treści.
          </p>
        </aside>
      </main>
    </div>
  )
}

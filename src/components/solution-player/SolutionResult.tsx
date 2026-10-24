import { local } from './local'

export function SolutionResult({ result }: { result: string }) {
  return (
    <div className={local('solution-result')}>
      <strong>Wynik:</strong>
      <span>{result}</span>
    </div>
  )
}

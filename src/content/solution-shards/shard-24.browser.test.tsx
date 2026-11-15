import { defineSolutionLayoutTests } from '../solution-layout.shared'
import { workedSolutions } from '../course'

defineSolutionLayoutTests(workedSolutions.filter((_, index) => index % 32 === 23))

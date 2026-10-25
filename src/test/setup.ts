class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true })
Object.defineProperty(globalThis, 'ResizeObserver', { value: ResizeObserverMock, configurable: true })
Object.defineProperty(window, 'scrollTo', { value: () => {}, configurable: true })

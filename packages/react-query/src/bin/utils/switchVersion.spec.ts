import { copy } from './copy'
import { switchVersion } from './switchVersion'

vi.mock('./copy', () => ({
  copy: vi.fn(),
}))

describe('switchVersion', () => {
  const consoleLogSpy = vi.spyOn(console, 'log').mockClear()
  const consoleErrorSpy = vi.spyOn(console, 'error').mockClear()

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should log success message when copy function returns true', () => {
    vi.mocked(copy).mockReturnValue(true)

    switchVersion(5)

    expect(consoleLogSpy).toHaveBeenCalledWith('[@suspensive/react-query]', 'switched to version v5')
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('should log warning message when copy function returns false', () => {
    vi.mocked(copy).mockReturnValue(false)

    switchVersion(1)

    expect(consoleErrorSpy).toHaveBeenCalledWith('[@suspensive/react-query]', 'not found version files.')
    expect(consoleLogSpy).not.toHaveBeenCalled()
  })
})

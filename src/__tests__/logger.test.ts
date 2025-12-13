import { logger, LogLevel } from '../utils/logger.js';

describe('Logger', () => {
  let consoleSpy: {
    debug: jest.SpyInstance;
    info: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleSpy = {
      debug: jest.spyOn(console, 'debug').mockImplementation(),
      info: jest.spyOn(console, 'info').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log debug messages', () => {
    logger.debug('Test debug message');
    expect(consoleSpy.debug).toHaveBeenCalledWith('[DEBUG] Test debug message');
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(consoleSpy.info).toHaveBeenCalledWith('[INFO] Test info message');
  });

  it('should log warn messages', () => {
    logger.warn('Test warn message');
    expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN] Test warn message');
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR] Test error message');
  });

  it('should log messages with additional arguments', () => {
    logger.info('Test message', { key: 'value' });
    expect(consoleSpy.info).toHaveBeenCalledWith('[INFO] Test message', { key: 'value' });
  });
});

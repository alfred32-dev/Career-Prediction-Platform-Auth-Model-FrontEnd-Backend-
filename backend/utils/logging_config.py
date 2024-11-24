import logging

def setup_logging():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('auth_api')
    return logger

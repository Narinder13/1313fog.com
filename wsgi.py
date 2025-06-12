# WSGI entry point for production servers

from app import app as application

if __name__ == '__main__':
    application.run()

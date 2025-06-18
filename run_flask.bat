@echo off
echo Starting FOG website with Flask...
set FLASK_APP=app.py
set FLASK_DEBUG=1
python -m flask run --host=0.0.0.0 --port=5000
pause

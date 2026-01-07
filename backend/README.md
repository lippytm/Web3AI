# Web3AI Backend

FastAPI backend for Web3AI application.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Development

Run development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Testing

Run tests:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app --cov-report=html
```

## Linting & Formatting

Run ruff:
```bash
ruff check .
ruff format .
```

Run black:
```bash
black .
```

Check formatting:
```bash
black --check .
```

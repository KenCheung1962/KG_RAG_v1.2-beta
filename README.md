# KG RAG System v1.2-beta

Unified Knowledge Graph RAG System with PostgreSQL + pgvector backend and Vite + TypeScript frontend.

## Folder Structure

```
v1.2-beta/
├── backend/              # FastAPI Backend Server (Port 8002)
│   ├── pgvector_api.py   # Main API with RAG chat endpoints
│   ├── app_4tab.py       # Streamlit UI (legacy)
│   └── ...
├── frontend/             # Vite + TypeScript Frontend (Port 8081)
│   ├── src/              # Source code
│   ├── dist/             # Built files
│   └── ...
├── unified_indexing/     # PostgreSQL + pgvector Backend (Alternative)
│   ├── main.py           # FastAPI main application
│   ├── database.py       # Database operations
│   └── ...
└── README.md             # This file
```

## Quick Start

### Option 1: Use pgvector_api Backend (Recommended)

```bash
# 1. Start the Backend (Port 8002)
cd backend
python pgvector_api.py

# 2. Start the Frontend (Port 8081) - In another terminal
cd frontend
npm install  # First time only
npm run dev

# 3. Open browser to http://localhost:8081
```

### Option 2: Use Unified Indexing Backend

```bash
# 1. Start the Backend (Port 8001)
cd unified_indexing
python -m main

# 2. Start the Frontend (Port 8081) - In another terminal
cd frontend
npm run dev
```

## Key Files

### Backend (pgvector_api.py)
- **Chat API**: `POST /api/v1/chat`
- **Chat with Files**: `POST /api/v1/chat/with-doc`
- **Health Check**: `GET /health`

### Metadata Extractor (metadata_extractor.py)
- **Extract bibliographic metadata** from PDF, HTML, TXT files
- **APA 7th edition formatting** for references
- **Usage**: `from metadata_extractor import MetadataExtractor, format_apa_reference`

### Frontend
- **Query Tab**: `frontend/src/components/tabs/QueryTab.ts`
- **Query + File Tab**: `frontend/src/components/tabs/QueryFileTab.ts`
- **API Client**: `frontend/src/api/client.ts`

## Features

### Query Modes
- ⚡ **Quick**: 10 chunks, ~500-800 words, 3 min timeout
- 📊 **Balanced**: 20 chunks, ~1000 words, 4 min timeout
- 📚 **Comprehensive**: 30 chunks, ~1500-2000 words, 5 min timeout
- 🎓 **Ultra Deep**: 40 chunks, ~2000-2500 words, 15 min timeout

### References Section
- All query responses include a References section
- Lists source documents used to generate the answer
- Supports print functionality

### Backend Enhancements ✅
- Returns actual source filenames instead of just counts
- **APA 7th Edition Metadata Extractor** (`backend/metadata_extractor.py`)
  - Extracts author, year, title, DOI from PDF/HTML/TXT
  - Formats references in APA style
  - Falls back to filename if metadata unavailable
- Bibliographic metadata extraction support (documented in `docs/backend-bibliographic-enhancement.md`)

## Environment Variables

### Backend (.env)
```
DEEPSEEK_API_KEY=your_key_here
MINIMAX_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@localhost:5432/kg_rag
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8002
VITE_API_KEY=static-internal-key
```

## API Endpoints

### Main Query
```http
POST /api/v1/chat
Content-Type: application/json

{
  "message": "What are fabrication processes for HBM?",
  "mode": "hybrid",
  "top_k": 20,
  "detailed": false,
  "ultra_comprehensive": false
}
```

### Response
```json
{
  "response": "Detailed answer...",
  "answer": "Detailed answer...",
  "sources": ["doc1.pdf", "doc2.txt"],
  "confidence": 0.85
}
```

## Building for Production

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/`.

## Troubleshooting

### Backend not responding
- Check if port 8002 is free: `lsof -i :8002`
- Verify PostgreSQL is running
- Check API keys are set

### Frontend build errors
- Delete node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (requires 18+)

## Version History

- **v1.2-beta**: Combined v1.0 backend + v1.1 frontend
- **v1.1-beta**: Vite + TypeScript frontend
- **v1.0-beta**: Original pgvector backend

## Documentation

- Backend enhancement proposal: `frontend/docs/backend-bibliographic-enhancement.md`
- Frontend architecture: `frontend/README.md`

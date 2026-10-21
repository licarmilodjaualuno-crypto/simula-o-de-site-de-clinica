from pathlib import Path
import uuid

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI(title="Viraliza AI Studio Local Engine", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://licarmilodjaualuno-crypto.github.io",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

jobs = {}


@app.get("/health")
def health():
    return {
        "status": "ok",
        "name": "Viraliza Local Engine",
        "model": "not-configured",
        "generator_ready": False,
    }


@app.post("/generate")
async def generate(
    prompt: str = Form(...),
    mode: str = Form("video-to-video"),
    duration: int = Form(15),
    ratio: str = Form("9:16"),
    quality: str = Form("balanced"),
    continuity: bool = Form(True),
    reference: UploadFile | None = File(None),
):
    if mode != "text-to-video" and reference is None:
        raise HTTPException(status_code=400, detail="Este modo precisa de uma referência.")

    reference_path = None
    if reference is not None:
        suffix = Path(reference.filename or "reference.bin").suffix
        reference_path = UPLOAD_DIR / f"{uuid.uuid4().hex}{suffix}"
        reference_path.write_bytes(await reference.read())

    job_id = uuid.uuid4().hex
    jobs[job_id] = {
        "status": "waiting-for-model",
        "progress": 0,
        "prompt": prompt,
        "mode": mode,
        "duration": duration,
        "ratio": ratio,
        "quality": quality,
        "continuity": continuity,
        "reference_path": str(reference_path) if reference_path else None,
        "error": "Nenhum modelo de geração foi configurado ainda.",
    }

    # Nesta primeira versão o servidor apenas recebe o pedido corretamente.
    # Na próxima etapa conectaremos aqui o modelo local compatível com a GPU do PC.
    raise HTTPException(
        status_code=503,
        detail="Conexão com o site pronta, mas o modelo de vídeo local ainda não foi instalado.",
    )


@app.get("/jobs/{job_id}")
def get_job(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Trabalho não encontrado.")
    return jobs[job_id]


@app.get("/outputs/{filename}")
def output_file(filename: str):
    path = OUTPUT_DIR / Path(filename).name
    if not path.exists():
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")
    return FileResponse(path)

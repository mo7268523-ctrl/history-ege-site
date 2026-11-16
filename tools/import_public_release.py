"""Первичный перенос уже опубликованной карточки с проверкой SHA-256."""
import concurrent.futures, hashlib, json, pathlib, time, urllib.parse, urllib.request
manifest = json.loads(pathlib.Path("publication.json").read_text())
target = pathlib.Path("site")
def transfer(item):
    relative = pathlib.PurePosixPath(item["path"])
    if relative.is_absolute() or ".." in relative.parts:
        raise ValueError("Недопустимый путь")
    dest = target.joinpath(*relative.parts)
    if dest.exists() and hashlib.sha256(dest.read_bytes()).hexdigest() == item["sha256"]:
        return
    url = manifest["source_url"] + urllib.parse.quote(item["path"], safe="/")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=90) as response:
                data = response.read()
            if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
                raise ValueError("Контрольная сумма не совпала: " + item["path"])
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for number, _ in enumerate(pool.map(transfer, manifest["files"]), 1):
        if number % 50 == 0:
            print("Проверено файлов:", number, flush=True)
(target / ".nojekyll").touch()
print("Перенос завершён:", manifest["version"], len(manifest["files"]), "файлов; SHA-256 совпали.", flush=True)

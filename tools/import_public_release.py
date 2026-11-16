"""Перенос сохранённого публичного выпуска с проверкой всех SHA-256."""
import hashlib, json, pathlib, zipfile
manifest = json.loads(pathlib.Path("publication.json").read_text())
target = pathlib.Path("site")
allowed = {item["path"] for item in manifest["files"]}
volumes = sorted(pathlib.Path(".").glob("site-small-*.zip"))
if not volumes:
    raise RuntimeError("Не загружены части сохранённого публичного выпуска")
for volume in volumes:
    with zipfile.ZipFile(volume) as archive:
        for name in archive.namelist():
            relative = pathlib.PurePosixPath(name)
            if relative.is_absolute() or ".." in relative.parts or name not in allowed:
                raise ValueError("Не разрешён для публикации: " + name)
            dest = target.joinpath(*relative.parts)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(archive.read(name))
for item in manifest["files"]:
    data = (target / item["path"]).read_bytes()
    if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
        raise ValueError("Контрольная сумма не совпала: " + item["path"])
(target / ".nojekyll").touch()
print("Проверено:", manifest["version"], len(manifest["files"]), "файлов; все SHA-256 совпали.")

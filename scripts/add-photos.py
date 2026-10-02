#!/usr/bin/env python3
"""Add catch photos to the gallery.

    pip install pillow pillow-heif
    python3 scripts/add-photos.py ~/Downloads/new-photos/*.HEIC

For each photo, in the order given (put the best first):
  * reads HEIC, PNG or JPEG and applies the camera's rotation
  * converts iPhone Display P3 colour to sRGB, so it does not look washed out
    in a browser
  * resizes to 1600px on the long edge, JPEG quality 82, progressive
  * strips ALL metadata, including GPS. Photos from the boat carry the exact
    coordinates of the captain's fishing spots, so this matters
  * skips anything that is a near-duplicate of a photo already on the site
  * saves it as the next public/images/gallery/fishing-NN.jpg
  * adds it to the top of src/data/gallery.ts, so the newest catches lead

Never overwrite an existing fishing-NN.jpg: /images/* is served with a
one-year immutable cache, so a replaced file would not reach returning
visitors. New photo, new number.

Species tags are left blank on purpose. Look at the photos and add one
("redfish", "shark", "flounder", "sheepshead", "cobia") only where it is
certain; it becomes the alt text.
"""

import io
import itertools
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageCms, ImageOps
    import pillow_heif
except ImportError:
    sys.exit("Needs Pillow with HEIC support:  pip install pillow pillow-heif")

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parent.parent
GALLERY = ROOT / "public" / "images" / "gallery"
DATA = ROOT / "src" / "data" / "gallery.ts"
SRGB = ImageCms.createProfile("sRGB")
DUPLICATE_DISTANCE = 6  # of 144 bits; real duplicates measured 0-1, distinct photos 38+


def to_srgb(im: Image.Image) -> Image.Image:
    icc = im.info.get("icc_profile")
    im = ImageOps.exif_transpose(im)
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        return ImageCms.profileToProfile(im, src, SRGB, outputMode="RGB", renderingIntent=ImageCms.Intent.PERCEPTUAL)
    return im.convert("RGB")


def dhash(im: Image.Image, n: int = 12) -> int:
    g = im.convert("L").resize((n + 1, n), Image.LANCZOS)
    px = g.load()
    bits = 0
    for y, x in itertools.product(range(n), range(n)):
        bits = (bits << 1) | (px[x, y] > px[x + 1, y])
    return bits


def main(paths: list[str]) -> None:
    if not paths:
        sys.exit(__doc__)

    existing = sorted(GALLERY.glob("fishing-*.jpg"))
    numbers = [int(re.search(r"fishing-(\d+)", p.name).group(1)) for p in existing]
    next_n = max(numbers, default=0) + 1
    hashes = {p.name: dhash(Image.open(p)) for p in existing}

    rows = []
    for raw in paths:
        path = Path(raw).expanduser()
        im = to_srgb(Image.open(path))
        h = dhash(im)
        dupe = next((name for name, other in hashes.items() if bin(h ^ other).count("1") <= DUPLICATE_DISTANCE), None)
        if dupe:
            print(f"skip  {path.name}: duplicate of {dupe}")
            continue
        im.thumbnail((1600, 1600), Image.LANCZOS)
        out = GALLERY / f"fishing-{next_n:02d}.jpg"
        assert not out.exists(), f"{out} already exists"
        # No exif= argument, so no metadata of any kind is written.
        im.save(out, "JPEG", quality=82, optimize=True, progressive=True, subsampling="4:2:0")
        hashes[out.name] = h
        rows.append(f"  [{next_n}, {im.width}, {im.height}],")
        print(f"added {path.name} -> {out.name} {im.width}x{im.height} {out.stat().st_size // 1024}KB")
        next_n += 1

    if not rows:
        return
    src = DATA.read_text()
    marker = "const rows: [number, number, number, Species?][] = [\n"
    if marker not in src:
        sys.exit(f"Could not find the rows array in {DATA}; add these by hand:\n" + "\n".join(rows))
    DATA.write_text(src.replace(marker, marker + "\n".join(rows) + "\n", 1))
    print(f"\n{len(rows)} photos added to the top of {DATA.relative_to(ROOT)}. Add species tags where certain.")


if __name__ == "__main__":
    main(sys.argv[1:])

"""Bygg en GLB av Easyway UNIV7600 HP-batteriet med Blender (bpy).

Kör med:  python3 scripts/build-easyway-univ7600.py

Output:   public/models/batteries/easyway-univ7600.glb

Modellen är en parametriserad stack:
  - 1 toppmodul (kontrollenhet, något kortare i djupled fram, mjuka avrundningar)
  - N batterimoduler (default 5 = ~7.6 kWh)
  - 1 baselement (med utskärning för fot/handtag)

Hela skåpet är rent matt vitt utan logotyper eller text — exakt som
användaren bett om för cinematic showcase. Botten på y=0 så modellen
står på marken i three.js-scenen utan offset.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy

# --------------------------------------------------------------------------- #
# Dimensioner (meter). Härledda från Easyway UNIV7600 HP datablad-proportioner.
# --------------------------------------------------------------------------- #

WIDTH = 0.58            # X
DEPTH = 0.42            # Z
TOP_H = 0.13            # toppmodulens höjd
MODULE_H = 0.13         # höjd per batterimodul i stacken
N_MODULES = 5           # ger ca 7.6 kWh
BASE_H = 0.20           # baselementets höjd (inkl. fot)
FOOT_CUTOUT_W = 0.30    # bredden på den u-formade fot-utskärningen
FOOT_CUTOUT_H = 0.07    # höjden på utskärningen
GAP = 0.0               # 0 = ihopsatt; öka för exploded view-baseline
BEVEL_OFFSET = 0.012    # rundade hörn
BEVEL_SEGMENTS = 4

# Matt vit yta — varm off-white så att det matchar bone (#F4F1EA) i UI:t
BODY_COLOR = (0.953, 0.949, 0.937, 1.0)
BODY_ROUGHNESS = 0.55

OUT_PATH = Path(__file__).resolve().parents[1] / "public" / "models" / "batteries" / "easyway-univ7600.glb"

# --------------------------------------------------------------------------- #
# Hjälpare
# --------------------------------------------------------------------------- #


def reset_scene() -> None:
    """Töm scenen helt — bpy startar med en kub, kamera och lampa."""
    bpy.ops.wm.read_factory_settings(use_empty=True)


def make_white_material() -> bpy.types.Material:
    mat = bpy.data.materials.new(name="EasywayWhite")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = BODY_COLOR
    bsdf.inputs["Roughness"].default_value = BODY_ROUGHNESS
    # Lite sheen för det där "mjuka plastskal"-utseendet
    if "Sheen Weight" in bsdf.inputs:
        bsdf.inputs["Sheen Weight"].default_value = 0.15
    return mat


def add_rounded_box(
    name: str,
    size: tuple[float, float, float],
    location: tuple[float, float, float],
    material: bpy.types.Material,
) -> bpy.types.Object:
    """Lägger till en kub med given storlek, applicerar bevel, sätter material."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = size

    # Applicera scale så bevel-offset blir rätt i världsenheter
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    bevel = obj.modifiers.new(name="bevel", type="BEVEL")
    bevel.width = BEVEL_OFFSET
    bevel.segments = BEVEL_SEGMENTS
    bevel.limit_method = "ANGLE"
    bevel.angle_limit = math.radians(30)

    obj.data.materials.append(material)
    return obj


def cut_foot_from_base(base_obj: bpy.types.Object, material: bpy.types.Material) -> None:
    """Skär ut en u-formad fot underst på baselementet med boolean."""
    cutter = bpy.data.objects.new("foot_cutter_tmp", bpy.data.meshes.new("foot_cutter_mesh"))
    bpy.context.scene.collection.objects.link(cutter)
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(0, 0, BASE_H * 0.5 - FOOT_CUTOUT_H * 0.5 + 0.001),
    )
    cube = bpy.context.object
    cube.name = "foot_cutter"
    cube.scale = (FOOT_CUTOUT_W, DEPTH * 1.2, FOOT_CUTOUT_H)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    bpy.context.view_layer.objects.active = base_obj
    boolean = base_obj.modifiers.new(name="foot_cut", type="BOOLEAN")
    boolean.operation = "DIFFERENCE"
    boolean.object = cube
    bpy.ops.object.modifier_apply(modifier="foot_cut")

    # Städa bort cuttern — även den temporära "foot_cutter_tmp"-objektet
    for o in (cube, cutter):
        if o.name in bpy.data.objects:
            bpy.data.objects.remove(o, do_unlink=True)

    base_obj.data.materials.clear()
    base_obj.data.materials.append(material)


def parent_to_root(name: str, children: list[bpy.types.Object]) -> bpy.types.Object:
    """Samla alla moduler under en tom Empty så GLB-filen får en ren root."""
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
    root = bpy.context.object
    root.name = name
    for child in children:
        child.parent = root
    return root


# --------------------------------------------------------------------------- #
# Bygg scenen
# --------------------------------------------------------------------------- #


def build() -> None:
    reset_scene()
    mat = make_white_material()

    modules: list[bpy.types.Object] = []
    y = 0.0

    # Base
    base = add_rounded_box(
        "module_base",
        (WIDTH, BASE_H, DEPTH),
        (0.0, y + BASE_H * 0.5, 0.0),
        mat,
    )
    cut_foot_from_base(base, mat)
    modules.append(base)
    y += BASE_H + GAP

    # Stack-moduler underifrån och upp
    for i in range(N_MODULES):
        m = add_rounded_box(
            f"module_{i + 1}",
            (WIDTH, MODULE_H, DEPTH),
            (0.0, y + MODULE_H * 0.5, 0.0),
            mat,
        )
        modules.append(m)
        y += MODULE_H + GAP

    # Toppmodul (lite "smalare" intryck via 1% mindre djup)
    top = add_rounded_box(
        "module_top",
        (WIDTH, TOP_H, DEPTH * 0.99),
        (0.0, y + TOP_H * 0.5, 0.0),
        mat,
    )
    modules.append(top)

    parent_to_root("EasywayUNIV7600", modules)


def export_glb() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Markera alla mesh-objekt + roten som selected → använd selection-export.
    bpy.ops.object.select_all(action="SELECT")

    bpy.ops.export_scene.gltf(
        filepath=str(OUT_PATH),
        export_format="GLB",
        use_selection=True,
        export_apply=True,         # frys modifiers (bevel) i exporten
        export_yup=True,           # three.js + drei förväntar y-up
        export_materials="EXPORT",
        export_image_format="AUTO",
    )


def main() -> None:
    build()
    export_glb()
    size_kb = OUT_PATH.stat().st_size / 1024
    print(f"\nGLB skriven: {OUT_PATH}")
    print(f"Storlek:    {size_kb:.1f} kB")
    print(f"Moduler:    {N_MODULES} stack + 1 topp + 1 base")
    print(f"Höjd:       {BASE_H + N_MODULES * MODULE_H + TOP_H:.3f} m")


if __name__ == "__main__":
    sys.exit(main())

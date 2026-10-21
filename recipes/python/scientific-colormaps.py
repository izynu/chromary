"""
scientific-colormaps.py, publication-grade plots with Crameri's scientific colour maps.

Dep:  pip install matplotlib cmcrameri numpy
Run:  python scientific-colormaps.py          (writes colormaps.png)

Why: perceptually uniform, CVD-safe, and print-safe. Cite Crameri, Shephard &
Heron (2020, Nature Communications) if your figures ship, reviewers love it.
"""
import numpy as np
import matplotlib.pyplot as plt
from cmcrameri import cm  # pip: cmcrameri

# Fake scientific data: smooth field + a sign change (to show the diverging map)
x, y = np.mgrid[-3:3:120j, -3:3:120j]
z = np.exp(-(x**2 + y**2)) * np.cos(2 * x)

PANELS = [
    (cm.batlow, "Sequential → batlow", None),          # order matters, no midpoint
    (cm.vik, "Diverging → vik", (-1.2, 1.2)),          # symmetric around neutral zero
    (cm.romaO, "Cyclic → romaO", None),                # wraps around (angles, phases)
]

fig, axes = plt.subplots(1, 3, figsize=(12, 3.6), constrained_layout=True)
for ax, (cmap, title, vlim) in zip(axes, PANELS):
    im = ax.imshow(z, cmap=cmap, origin="lower", vmin=vlim and vlim[0], vmax=vlim and vlim[1])
    ax.set_title(title, fontsize=11)
    ax.set_axis_off()
    fig.colorbar(im, ax=ax, shrink=0.85)

fig.savefig("colormaps.png", dpi=200)
print("wrote colormaps.png, squint test: does the pattern survive the blur? It should.")

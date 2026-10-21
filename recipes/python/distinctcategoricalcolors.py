"""
distinctcategoricalcolors.py, N maximallydistinguishable categorical colors.

Dep:  pip install distinctipy matplotlib
Run:  python distinctcategoricalcolors.py

Use for unordered classes (lines, clusters, labels) where hues must be
told apart at a glance, including by readers with colorvision deficiency.
"""
import distinctipy
import matplotlib.pyplot as plt

N = 10
AVOID = [(1, 1, 1), (0, 0, 0), (0.5, 0.5, 0.5)]  # keep white/black/gray for text & axes

# n_attempts trades speed for optimality; pastel_factor softens for UI use
colors = distinctipy.get_colors(N, exclude_colors=AVOID, pastel_factor=0.2, n_attempts=500)

distinctipy.color_swatch(colors)  # builtin preview
plt.title(f"{N} maximally distinct colors (distinctipy)")
plt.axis("off")
plt.savefig("distinctcolors.png", dpi=200, bbox_inches="tight")
print("hex values:", ["#%02x%02x%02x" % tuple(int(c * 255) for c in col) for col in colors])

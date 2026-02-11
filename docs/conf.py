# -- Project information -----------------------------------------------------

project = 'dist-btrfs'
author = 'Aleksa Bozinovic'
version = '1.0.0'
release = '1.0.0'
language = 'en'

extensions = [
  'sphinx_rtd_theme',
  'myst_parser'
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

html_theme = 'sphinx_rtd_theme'

html_theme_options = {
  'collapse_navigation': False,
  'sticky_navigation': True,
  'navigation_depth': 4,
  'titles_only': False,
  'prev_next_buttons_location': 'bottom',
  'style_external_links': True,
  'vcs_pageview_mode': '',
  'style_nav_header_background': '#2c3e50',
}

html_title = 'dist-btrfs'
html_short_title = 'dist-btrfs'
html_show_sphinx = False
html_show_copyright = True

# Static files
html_static_path = ['_static']
html_css_files = ['custom.css']

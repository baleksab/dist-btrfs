# -- General configuration ---------------------------------------------------

extensions = [
    'sphinx_rtd_theme',
    'sphinxcontrib.redoc',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------

html_theme = 'sphinx_rtd_theme'

html_theme_options = {
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'titles_only': False
}

redoc = [
    {
        'name': 'DistBtrfs API',
        'page': 'api-reference',
        'spec': 'source/api-spec.json', 
        'embed': True,
    }
]

redoc_uri = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js'
# Co-Chat Publications website

This is the public landing site for Co-Chat. It is intentionally static: open `index.html` directly, or publish this `website` folder with GitHub Pages or Cloudflare Pages at no cost.

The email form currently stores entries only in the visitor's own browser (`localStorage`). It does not pretend to be a real mailing list until we connect a privacy-conscious service.

The product app is in `../client`. The included GitHub Actions workflow builds it with the configured Firebase repository secrets, places the output at `website/app`, and publishes both surfaces together on GitHub Pages.

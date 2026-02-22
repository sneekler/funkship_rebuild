# Funkship.com NLS Site - Next Steps

This repository has been cleaned and converted into a responsive HTML5 template. To continue development, follow the five areas outlined below.

## 1. Replace placeholder content

- Open each placeholder page (`pharaoh.html`, `productions.html`, `prophets.html`, `contact.html`, `funkalizer.html`, `barack/index.html`).
- Replace the `<main>` block with your real text, images, audio players, etc.
- Keep the header/nav structure unchanged so the responsive layout and links work.
- Commit changes to version control so you can revert if needed.

## 2. Enhance styling

- Edit `css/responsive.css` to adjust fonts, colours, spacing, and layout rules.
- Consider adding a mobile menu toggle (JavaScript or CSS-only) if the nav becomes long.
- If you prefer a framework, you can replace the stylesheet with Bootstrap, Tailwind, etc.
- Add a `css/print.css` or other utility files as required.

## 3. Host & secure

- Remove any leftover PHP or CMS directories unless they are actively used.
- Change all FTP/SSH passwords and lock down file permissions (no world-writable files).
- Install an SSL certificate (Let’s Encrypt is free) and update links to `https://`.
- Ensure your webserver (Apache, IIS, nginx) is up-to-date and disable directory listings.
- Scan the site periodically for malicious changes (use `grep` or a simple script).

## 4. Extend or rebuild

- For a static workflow: introduce a generator such as [Eleventy](https://www.11ty.dev/), [Hugo](https://gohugo.io/), or [Jekyll](https://jekyllrb.com/). You can convert the current pages into templates and generate HTML automatically.
- For a CMS: if you really need dynamic features, migrate content into WordPress, Drupal, or a modern Joomla install. Remove the old `nls/nls` folder if not using Joomla.
- Another option is to use a lightweight flat-file CMS (e.g. [Grav](https://getgrav.org/)).
- Set up a local build/test environment using Node.js/pnpm/npm if you adopt a generator.

## 5. Test

- Open the pages in desktop and mobile browsers (Chrome DevTools device toolbar, Firefox Responsive Design Mode).
- Validate HTML and CSS at https://validator.w3.org/ and https://jigsaw.w3.org/css-validator/.
- Test links and the ``Funkalizer`` popup to ensure the paths are correct.
- Use a linter or formatter (Prettier, ESLint) if you start adding JavaScript.
- Optionally run accessibility audits (`Lighthouse`, `aXe`) to improve usability.

---

Feel free to ask for help implementing any of these steps; I can generate sample code, build scripts, or deployment instructions as needed.
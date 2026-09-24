# Bangladesh Pakistani Indian Food - Website

A 4-page static website (HTML, CSS, vanilla JavaScript). No frameworks, no build step.

## 1. Open the website
Double-click `index.html`. Pages: `index.html`, `about.html`, `menu.html`, `contact.html`.
(The map on the Contact page and the fonts need an internet connection.)

## Where things live
- **Business info, menu, reviews, image paths:** top of `script.js`
- **Colors and layout:** `style.css` (colors are at the top under `:root`)
- **Images:** everything is in `assets/images/`

## 2. Replace the logo
Put your logo at `assets/images/logo.png` (same name). Until then, the restaurant name shows as text.

## 3. Replace the hero image
Replace `assets/images/hero.jpg` (keep the filename). It is also used behind the Menu and Contact page titles.

## 4. Replace the About image
Replace `assets/images/about.jpg`. It is also used behind the About page title.

## 5. Replace menu images
Each dish uses its dish name in lowercase with dashes: `Hilsa fish` -> `assets/images/hilsa-fish.jpg`. Replace the file with the same name and the site updates. Dishes with no image yet show "Photo coming soon".

## 6. Add new images
Save the image in `assets/images/`. Name it after the dish (see above), or add a line to `menuImages` in `script.js`, e.g. `"Beef": "assets/images/my-beef.jpg"`.

## 7. Change menu prices
In `script.js`, find `menuData`. Each dish is `["Name", price]`. Change the number.

## 8. Change the phone number
In `script.js`, edit `phone` and `phoneLink` in `restaurantInfo` (link format: `tel:+966...`).

## 9. Change the address
Edit `address` in `restaurantInfo`.

## 10. Change the Google Maps link
Edit `mapsUrl` (Get Directions buttons). The embedded map uses `mapsEmbed`, built from the plus code MMGV+4W.

## 11. Add / edit menu items
Add `["New dish", 10]` to the right category list in `menuData`. Rename or delete items the same way. To add a category, add a new key, e.g. `"Salads": [["Green salad", 5]]`. It appears on the menu page and in the filter buttons automatically.
To change reviews, edit `reviews`.

## 12. Deploy to GitHub Pages
1. Create a GitHub repository and upload all files (with `index.html` at the top level).
2. Go to Settings -> Pages.
3. Under Source choose "Deploy from a branch", branch `main`, folder `/ (root)`, then Save.
4. After a minute your site is live at `https://YOUR-NAME.github.io/REPO-NAME/`.

## 13. Deploy to Netlify
1. Go to app.netlify.com and log in.
2. Choose "Add new site" -> "Deploy manually".
3. Drag the unzipped project folder onto the page.
4. Netlify gives you a live link. You can change the site name in Site settings.

## Notes
- The contact form is a front-end demo. It validates input but sends nothing. To receive messages you need a form service or backend.
- Only supplied business information is used. Add an email or social links yourself if you want them.
- Only use photos you own or have permission to use.

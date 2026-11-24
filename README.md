# Cellma Patient Portal – Architecture Showcase

A static, responsive architecture walkthrough built with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages.

## Run locally

Open `index.html` in a browser. No build step or package installation is required.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `cellma-architecture`.
2. Extract this project ZIP.
3. Upload **the contents** of the `cellma-architecture` folder to the repository root. Ensure `index.html` is at the root.
4. Commit the files to the `main` branch.
5. In GitHub, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main` and folder `/ (root)`, then click **Save**.
8. Wait for GitHub Pages to publish the site. The URL will appear in Settings → Pages.

## Important accuracy notes

This site uses the architecture details supplied by the project owner. It intentionally marks unconfirmed implementation details as items to verify. Before using it in an interview, confirm:

- Exact microservice names and responsibilities.
- Exact JWT configuration and token lifecycle.
- Login rate-limit threshold, window and unblock behavior.
- Exact filter registration/order in Spring Security.
- Sanitization rules and request-body handling.
- Razorpay order, signature-verification and webhook flow.
- Kafka topic, partition, consumer group, retry and dead-letter behavior.
- Deployment, monitoring and CI/CD technologies.

Do not publish confidential source code, credentials, real patient data, internal hostnames, production IPs, database schema dumps or company-restricted information.

## Edit the content

- Main page: `index.html`
- Styling: `css/style.css`
- Interactive component details and tabs: `js/app.js`

This is a documentation/demo website, not a live healthcare application. It does not connect to Cellma, MySQL, Kafka or Razorpay.


## Presentation sign-in

This static demo includes a client-side presentation gate:
- Username: `sahil`
- Password: `India@11`

The password is masked by default. Use the eye control to reveal or hide it. A successful sign-in unlocks the architecture page for the current browser session.

**Security warning:** this is not real authentication. GitHub Pages serves static files, so credentials embedded in JavaScript can be inspected and the gate can be bypassed. Do not use this mechanism to protect confidential data. For real access control, use a backend authentication service or a hosting platform with server-side access protection.

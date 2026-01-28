# CS 260 Notes

## Git & Github
### Git
**Command Line**
- `git init` initializes git functionality for the current directory
- `git status` lists the git info for the files in the directory
- `git add` when followed by files stages those files to be committed
      - `git add .` adds everything in the current directory
- `git commit -m` commits the staged files to the branch with a commit message following in " "
      - `git commit -am` adds everything and commits them
- `git diff HEAD HEAD~` compares the current commit to earlier commits

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [MD Cheatsheet](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## AWS

I learned a lot about AWS and how the internet works, communicating through different clients and servers. I was able to set up a web server through AWS EC2 service. I learned how IP addresses are used to identify computers and how the internet serves to dynamically connect those computers. I learned how domain names were tied to IP addresses to make it easier for humans to interact with the internet. I learned how to create an elastic IP address so that my IP address will remain constant even when I restart my server. I also learned about web certificates are issued and are part of the HTTPS protocol

I initially had trouble connecting to my server, but then I realized that I was trying to connect over HTTPS when it hadn't been set up yet

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I learned a little bit about HTML but honestly a lot more about basic CSS as I was creating the deliverable. Most of what I explored came from understanding how flex and grid containers worked. I ended up going with flexbox for most of the pages. With the flexbox I also added the ability for certain elements, like the messages and the timeline to scroll, without the rest of the page scrolling as well. I learned about how flexboxes will try to fill their space unless you tell them not too and how grid can be useful for setting up a webpages overall structure. 

The actual HTML wasn't very difficult as I had used HTML a fair bit before. Just made sure that I used all the semantic elements correctly to give the page good structure. 

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
